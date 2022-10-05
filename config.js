const fs = require('fs')

const secretConfig = JSON.parse(fs.readFileSync('secretConfig.json'))

module.exports = {
    access_token: process.env.NODE_ENV == 'dev' ? secretConfig.accessTokenDev : secretConfig.accessTokenProd,
    lp_version: 5.131,
    group_id: process.env.NODE_ENV == 'dev' ? '215950497' : '213245913',
    
    dbuser: 'postgres',
    dbhost: process.env.NODE_ENV == 'dev' ? '185.240.103.244' : 'localhost',
    dbname: 'vkjob',
    dbpassword: secretConfig.dbPassword,
    dbport: 5432
}
