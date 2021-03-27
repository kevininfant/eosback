// API
const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController');
// const IssueController = require('../controllers/IssueController');
const AdminController = require('../controllers/adminController');
const DailyUpdatesController = require('../controllers/studentfoodUpdatesController');
const passport = require('passport')
const path = require('path')
const jwtAuth = require('../middleware/passport')
const { adminAuth } = require('../middleware/passport')

const authUser = jwtAuth(passport).authenticate("jwt", { session: false });

const needsAdminAuth = adminAuth(passport).authenticate('admin_auth', {
        session: false,
        failWithError: true,
    })
    //user and admin API's

router.post('/admin', AdminController.CreateAdmin)
router.post('/createUSer', needsAdminAuth, AdminController.createUserList)

router.post('/user', UserController.userRegister)
router.post('/setPassword', authUser, UserController.setPassword)
router.post('/login', UserController.login)
router.get('/getUser', needsAdminAuth, UserController.getUserDetails)
router.get('/getAlluser', needsAdminAuth, UserController.getAll)

router.post('/dailyUpdates/create', authUser, DailyUpdatesController.CreateDailyUpdates)
router.put('/dailyUpdates/update/:id', needsAdminAuth, DailyUpdatesController.update)
router.get('/dailyUpdates/getAll', needsAdminAuth, DailyUpdatesController.GetAllDailyUpdates)
router.post('/dailyUpdates/getByDepartment', needsAdminAuth, DailyUpdatesController.GetByDepartment)
router.put('/dailyUpdates/delete/:id', needsAdminAuth, DailyUpdatesController.DeleteDailyUpdates)

module.exports = router