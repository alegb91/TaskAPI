
const jwt = require('jsonwebtoken');



const auth = ( req, res, next ) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(500).send('No authentication')
    };
    
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify( token, process.env.JWT_SECRET );
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send('No authentication')
    }
};

module.exports = auth;