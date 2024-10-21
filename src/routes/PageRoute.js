const express = require('express');
const pageCont = require('../controllers/pageCont');
const route = express.Router();

route.get('/', pageCont.index);
route.get('/view_build', pageCont.view_build);
route.get('/view-buy', pageCont.view_buy);

module.exports = route;    
