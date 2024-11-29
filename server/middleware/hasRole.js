// module.exports = function (roles) {
//     return (req, res, next) => {
//         if ( !roles.includes(req.user.role)) {
//             res.send({ error: 'Access denied'})

//             return
//         }

//         next();
//     }
// }
module.exports = function (roles) {
    return (req, res, next) => {
        // Проверяем, существует ли req.user и имеет ли он роль
        if (!req.user || !roles.includes(req.user.role_id)) {
            return res.status(403).send({ error: 'Access denied: You do not have the required role' });
        }

        // Если роль пользователя в списке разрешенных, продолжаем обработку запроса
        next();
    }
};