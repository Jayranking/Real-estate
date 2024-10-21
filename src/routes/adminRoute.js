const express = require('express');
const router = express.Router();
const adminCont = require('../controllers/adminCont');
const {checkAdmin} = require('../middlewares/authMiddleware');
const {imageHandler, imagesHandler} = require('../helpers/img_handler');

router.get('/dashboard',checkAdmin, adminCont.dashboard);

router.get('/buy', checkAdmin, adminCont.view_buy_property);
router.post('/buy-form', checkAdmin, imageHandler, adminCont.post_buy_property);
router.get('/building', checkAdmin, adminCont.list_buy_property);
router.get('/edit-buy', checkAdmin, adminCont.view_edit_buy);
router.post('/edit-buy', checkAdmin, imageHandler, adminCont.edit_buy_property);
router.post('/delete-post', checkAdmin, adminCont.delete_buy_post);

router.get('/build', checkAdmin, adminCont.view_build_property);
router.post('/build-form', checkAdmin, imagesHandler, adminCont.post_build_property);
router.get('/list-property', checkAdmin, adminCont.list_build_property);
router.get('/edit-build', checkAdmin, adminCont.view_edit_build);
router.post('/edit-build', checkAdmin, imagesHandler, adminCont.edit_build_property);
router.post('/delete-post', checkAdmin, adminCont.delete_build_post);

router.get('/sign-in', adminCont.get_login);
router.post('/sign-in', adminCont.login);
router.post('/sign-up', adminCont.register_admin);
router.get('/logout', adminCont.admin_logout);

module.exports = router;