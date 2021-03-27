const DailyUpdates = require('../models/DailyUpdates')
const { to, ReE, ReS } = require('../services/util.service')
const CONFIG = require('../config/config')
const { isNull } = require('../services/util.service')
const HttpStatus = require('http-status')
const validator = require('validator')
const { isEmail } = validator
const ObjectId = require('mongoose').Types.ObjectId
const notificationService = require('../services/notification.service')
const authService = require('../services/auth.service')

module.exports.CreateDailyUpdates = async(req, res) => {
    let body = req.body;
    let err, dailyUpdates
    if (isNull(body.Name)) return ReE(res, { message: 'name is required!' }, HttpStatus.BAD_REQUEST);
    if (isNull(body.department)) return ReE(res, { message: 'Department is required!' }, HttpStatus.BAD_REQUEST);
    if (isNull(body.description)) return ReE(res, { message: 'Description is required!' }, HttpStatus.BAD_REQUEST);
    if (body.description.length <= 3) return ReE(res, { message: 'Minimum 3 characters required!' }, HttpStatus.BAD_REQUEST);
    if (body.description.length > 200) return ReE(res, { message: 'Maximum 200 characters! ' }, HttpStatus.BAD_REQUEST);
    [err, dailyUpdates] = await to(DailyUpdates.create(body));
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    return ReS(res, {
        message: 'DailyUpdates Created',
        dailyUpdates: dailyUpdates,
    }, 201)

}
module.exports.update = async function(req, res) {
    let err, dailyUpdates, data
    user = req.user
    data = req.body;
    [err, dailyUpdates] = await to(DailyUpdates.findById(req.params.id));
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)

    if (!dailyUpdates) {
        return res.status(404).send({
            message: "DailyUpdates not found"
        });
    }

    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);
        dailyUpdates[key] = data[key]
    }

    [err, dailyUpdates] = await to(dailyUpdates.save())
    if (err) {
        return ReE(res, err, 400)
    }
    return ReS(res, {
        message: 'DailyUpdates Updated',
        dailyUpdates: dailyUpdates,
    }, HttpStatus.OK, )
}

module.exports.GetAllDailyUpdates = async(req, res) => {
    let err, dailyUpdates;
    [err, dailyUpdates] = await to(DailyUpdates.find({}));
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    return ReS(res, {
        message: 'DailyUpdates Founded',
        dailyUpdates: dailyUpdates,
    }, 201)

}
module.exports.GetByDepartment = async(req, res) => {
    let err, dailyUpdates;
    [err, dailyUpdates] = await to(DailyUpdates.find({ department: req.user.department }));
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    return ReS(res, {
        message: 'DailyUpdates Founded',
        dailyUpdates: dailyUpdates,
    }, 201)

}
module.exports.DeleteDailyUpdates = async(req, res) => {
    let err, dailyUpdates;
    [err, dailyUpdates] = await to(DailyUpdates.find({ active: true, _id: req.params.id }));
    if (err) return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    if (!dailyUpdates) {
        return ReE(res, { message: 'DailyUpdates not found1' },
            HttpStatus.BAD_REQUEST)
    }

    [err, dailyUpdates] = await to(DailyUpdates.update({ _id: req.params.id }, { active: false }));
    if (err) {
        return ReE(res, err, 400)
    }
    return ReS(res, {
        message: 'DailyUpdates Deleted!',
    }, HttpStatus.OK, )

}