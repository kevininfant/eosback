require('dotenv').config() //instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app = process.env.APP || 'development'
CONFIG.port = process.env.PORT || '3100'
CONFIG.db_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/hostelfood_database'
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'network'
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000'
CONFIG.adminCode = process.env.adminCode || 'admin@123'
CONFIG.userType = ['student', 'Students']
CONFIG.employeeId = ['MCA123', 'MSCCS123', 'MSCIT123', 'BCA123', 'BSCCS123', 'BSCIT123']
CONFIG.department = ['MCA', 'MSC CS', 'MSC IT', "BCA", 'BSC CS', 'BSC IT']
    // CONFIG.issueType=['No internet','Slow Internet','System maintenance','Software Installation']
CONFIG.send_email = process.env.SEND_EMAIL || 'true'

CONFIG.mg_key = '11e5370b63c8f56e45e44eeecd383b23-b6190e87-b66aac60'
CONFIG.mg_domain = 'sandbox34f251ac97aa437c8d1ad7e315fc7533.mailgun.org'



module.exports = CONFIG