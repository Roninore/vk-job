const { throws } = require('assert')
const EventEmitter = require('events')

class Session extends EventEmitter{
    
    constructor(params) {
        super()
        //Параметры
        this.user = params.user
        this.peer_id = params.peer_id
        this.closed = false
        this.last_message_id = undefined

        // Функции меню
        this.mainMenu = require('./menu-forks/mainMenu.js')
        this.findJobMenu = require('./menu-forks/findJobMenu.js')
        this.findEmployeesMenu = require('./menu-forks/findEmployeesMenu.js')
        this.advertismentMenu = require('./menu-forks/advertismentMenu.js')
        this.supportMenu = require('./menu-forks/supportMenu.js')
        this.profileMenu = require('./menu-forks/profileMenu.js')
        this.vacancyFeedMenu = require('./menu-forks/vacancyFeedMenu.js')
        this.messageToEmployerMenu = require('./menu-forks/messageToEmployerMenu.js')
        this.rejectVacancyMenu = require('./menu-forks/rejectVacancyMenu.js')
        this.acceptVacancyMenu = require('./menu-forks/acceptVacancyMenu.js')
        this.answerModeratorMenu = require('./menu-forks/answerModeratorMenu.js')
        this.responseMenu = require('./menu-forks/responseMenu.js')


        //Функции для обработки событий
        const event_handling = require('./utils/event_handling.js')
        this.waitNextMessage = event_handling.waitNextMessage
        this.nextAction = event_handling.nextAction
        this.done = event_handling.done
        //Функции для обработки ошибок
        const error_handling = require('./utils/error_handling.js')
        this.error = error_handling.error
        this.badChoice = error_handling.badChoice
        //Ридеры
        const readers = require('./utils/readers.js')
        this.read_text = readers.read_text
        this.read_btn = readers.read_btn
        //Еще utils
        this.handler = require('./utils/handler.js')
        this.clear = require('./utils/clear.js')
        this.getMyDescriptionText = require('./utils/getMyDescriptionText.js')
        this.getVacancyText = require('./utils/getVacancyText.js')
        this.getVacancyToExecutor = require('./utils/getVacancyToExecutor.js')

        this.clear()

        if (params.ctx) {
            try {
                const actions = {
                    'accept-vacancy': this.acceptVacancyMenu,
                    'reject-vacancy': this.rejectVacancyMenu,
                    'message-to-employer': this.messageToEmployerMenu,
                    'answer-moderator': this.answerModeratorMenu,
                    'response': this.responseMenu
                }
                actions[params.ctx.message.payload.btn].call(this,{ctx:params.ctx})
            }
            catch(e) {
                console.log('Error on start session',e)
            }
        } else 
            this.mainMenu({startFlag:true})
    }

}

module.exports = Session
module.exports.default = Session

