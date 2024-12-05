
module.exports = function (roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role_id)) {
            return res.status(403).send({ error: 'Access denied: You do not have the required role' });
        }
        next();
    }
};