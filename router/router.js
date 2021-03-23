const express = require('express');
const router = express.Router()

 const controller = require('../controllers/feed');



 //********Create API ********//
 router.post('/create',controller.create);



 //******View API ***********//
 router.get('/viewdata',controller.viewdata);



 //*******Updata API **********//
 router.put('/update',controller.update);



 //*********Delete API ********//
 router.delete('/delete/:id',controller.delete);



module.exports= router;