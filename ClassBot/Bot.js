const EventEmitter = require('events')

class Bot extends EventEmitter{
    constructor(params) {
        super()
        // Параметры
        this.access_token = params.access_token
        this.group_id = params.group_id
        this.lp_version = params.lp_version

        this.sessions = {}

        // Методы
        this.apiRequest = require('./methods/apiRequest.js')
        this.startPolling = require('./methods/startPolling.js')
        this.polling = require('./methods/polling.js')
        this.sendMessage = require('./methods/sendMessage.js')
        this.execute = require('./methods/execute.js')
        this.getUser = require('./methods/getUser.js')
        this.mailing = require('./methods/mailing.js')
        this.editMessage = require('./methods/editMessage.js')
        this.sendToModeration = require('./methods/sendToModeration')
        this.markAsRead = require('./methods/markAsRead')


        //Админка
        this.admin = require('./admin/admin')
        this.query = require('./admin/commands/query')
        this.mail = require('./admin/commands/mail')
        this.stop = require('./admin/commands/stop')
    }

}

module.exports = Bot
module.exports.default = Bot
