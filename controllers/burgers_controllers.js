const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const router = express.Router();
const models = require('../models');



router.get('/', function(req, res) {
    res.redirect('/burgers');
});


router.get('/burgers', function(req, res) {
    models.burgers.findAll().then(function(data){
    res.render('index', { burgers: data });
    });
});

router.post('/burgers/create', function(req, res) {
     models.burgers.create({
        burger_name:req.body.name,
        devoured: 0
     }).then(function(){
        res.redirect('/burgers');
     });
});

router.put('/burgers/update/devour/:id', function(req, res) {
    
   models.burgers.update({
    devoured:1
    },{where:{
        id:req.params.id
    }}
   ).then(function(){
        res.redirect('/burgers');
   }) 
});

router.delete('/burgers/delete/:id', function(req, res) {
    
    models.burgers.destroy(
        {where:{
            id:req.params.id
        }}).then(function(){
            res.redirect('/burgers');
        })
})


router.use(function(req, res) {
    res.redirect('/burgers');
})

module.exports = router;

