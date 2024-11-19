require('dotenv').config();
const express = require('express');
const sequelize = require('./db')
const cookieParser = require("cookie-parser");
const mapUser = require('./helpers/mapUser')
const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
const authenticated = require('./middleware/authenticated');
const hasRole = require('./middleware/hasRole');
const ROLES = require('./constants/role');


const PORT = process.env.PORT

const app = express()

app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req, res) => {
    try {
        const { login, password } = req.body;
        const { user, token } = await register(login, password);
        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mapUser(user) });

    } catch (error) {
        res.status(400).send({ error: error.message || "Unknown error" });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { login: userLogin, password } = req.body;
        const { user, token } = await login(userLogin, password);
        res.cookie('token', token, { httpOnly: true });
        res.send({ error: null, user: mapUser(user) });
    } catch (error) {
        res.status(401).send({ error: error.message || "Unknown error" });
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.send({ message: 'Logged out successfully' });
});

app.get('/posts', async (req, res) => {
    const { posts, lastPage } = await getPosts(
        req.query.search,
        req.query.limit,
        req.query.page,
    )

    res.send({ data: { lastPage, posts: posts.map(mapPost) } })
})


app.use(authenticated);

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers()

    res.send({ data: users.map(mapUser) })
})
app.get('/users/roles', async (req, res) => {
    const roles = getRoles()

    res.send({ data: roles })
})
app.patch('/users/:id', async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        role: rq.body.roleId
    })
    res.send({ data: mapUser(newUser) })
})
app.delete('/users/:id', async (req, res) => {
    await deleteUser(req.params.id)

    res.send({ error: null })
})

const start = async () => {
    try {
        await sequelize.authenticate()
            .then(() => {
                console.log('Connection to ProductgreSQL has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        await sequelize.sync()

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();