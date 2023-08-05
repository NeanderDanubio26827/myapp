var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) { 
    try { 
        const response = await fetch('http://localhost:4000/selectV/'); 
        if (response.status === 200) { 
            const json = await response.json()
            
            res.render('selectV', { dados: json , isAuthenticated: req.cookies.token ? true : false }) 
        } else { 
            throw "Deu erro!!" 
        } 
    } catch (ex) { 
        res.status(500).send({ err: 'deu erro!!' }) 
    } 
})

module.exports = router;