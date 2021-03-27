// User Contollers
const User = require('../models/User')
const { to, ReE, ReS } = require('../services/util.service')
const CONFIG = require('../config/config')
const { isNull } = require('../services/util.service')
const HttpStatus = require('http-status')
const validator = require('validator')
const { isEmail } = validator
const ObjectId = require('mongoose').Types.ObjectId
const notificationService = require('../services/notification.service')
const authService = require('../services/auth.service')

module.exports.CreateAdmin = async(req, res) => {
    let body = req.body;
    let err, admin
    body.admin = true
    if (isNull(body.email)) return ReE(res, { message: 'Email is required!' }, HttpStatus.BAD_REQUEST);
    if (!isEmail(body.email)) { return await ReE(res, 'Valid Email Id required!', HttpStatus.BAD_REQUEST) }
    if (isNull(body.password)) return ReE(res, { message: 'Password is required!' }, HttpStatus.BAD_REQUEST);
    if (body.password.length < 8) return ReE(res, { message: 'Password Should be 8 charactes' }, HttpStatus.BAD_REQUEST);
    if (isNull(body.adminCode)) return ReE(res, { message: 'Admin Code is required!' }, HttpStatus.BAD_REQUEST);
    if (CONFIG.adminCode != body.adminCode) return ReE(res, { message: 'Valid Admin code is required!' }, HttpStatus.BAD_REQUEST);
    [err, admin] = await to(User.create(body));
    console.log(admin)
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    return ReS(res, {
        message: 'Admin Created',
        admin: admin,
    }, 201)

}

module.exports.createUserList = async(req, res) => {
    let list, newList, err;
    let body = req.body;

    const key = 'studentId';
    const unique = [...new Map(body.map(item => [item[key], item])).values()];

    unique.map(async data => {
        if (isNull(data.Name)) {
            return ReE(res, { message: 'please Enter student name' }, HttpStatus.BAD_REQUEST)
        }
        if (isNull(data.studentId)) {
            return ReE(res, { message: 'please Enter student ID' }, HttpStatus.BAD_REQUEST)
        }
        if (isNull(data.email)) {
            return ReE(res, { message: 'please Enter Email' }, HttpStatus.BAD_REQUEST)
        }
        if (isNull(data.department)) {
            return ReE(res, { message: 'please Enter department' }, HttpStatus.BAD_REQUEST)
        }
        [err, list] = await to(User.find({ studentId: data.studentId, enabled: true, email: data.email }));
        if (err) {
            return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        data.user=req.user._id;
        if (list.length === 0) {
            [err, newList] = await to(User.create(data));
            console.log(err);
            if (err) {
                return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
            }
            if (!newList) {
                return ReE(res, { message: "List does not exits" }, HttpStatus.BAD_REQUEST);
            }
        }
    })
    return ReS(res, { message: "User Create Succefully"}, HttpStatus.OK)
}