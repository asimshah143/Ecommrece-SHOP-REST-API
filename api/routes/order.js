const express = require('express');
const route = express.Router();

route.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'fatch order detal'
    });
});

route.post('/',(req, res, next)=>{
    res.status(201).json({
        message: 'order created'
    });
});

route.delete('/',(req, res, next)=>{
    res.status(200).json({
        message: 'order deleted'
    });
});

route.patch('/',(req, res, next)=>{
    res.status(200).json({
        message: 'order deleted'
    });
});

module.exports = route;