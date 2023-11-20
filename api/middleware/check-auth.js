const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        console.log('token',token)
        console.log(req.userData)
        const decoded = jwt.verify(token,'foo')
        console.log('decoded',decoded)
        req.userData = decoded
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed auth'
        })
    }
}