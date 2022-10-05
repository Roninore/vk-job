const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')
const {validatePhone,validateCost} = require('../validations.js')
const Vacancies = require('../../ClassDataBase/Models/Vacancies')

async function findEmployeesMenu() {
    this.handler(
        [{text: Messages.findEmployees.jobtype_1, keyboard: Keyboards.findEmployees.jobtype_1}],
        {
            'temporaryJob': 'temporaryJob',
            'constantJob': 'constantJob',
            'mainMenu': this.mainMenu
        },
        this.read_btn,
        (data) => {this.jobtype = data},
        category_fe)
    return
}

async function category_fe() {
    this.handler(
        [{text: Messages.findEmployees.category_2, keyboard: Keyboards.findEmployees.category_2}],
        {
            'mainMenu': this.mainMenu,
            'back': findEmployeesMenu
        },
        this.read_text,
        (data) => {this.category = data},
        time_fe)
    return
}

async function time_fe() {
    this.handler(
        [{text: Messages.findEmployees.time_3, keyboard: Keyboards.findEmployees.time_3}],
        {
            'mainMenu': this.mainMenu,
            'back': category_fe
        },
        this.read_text,
        (data) => {this.time = data},
        place_fe)
    return
}

async function place_fe() {
    this.handler(
        [{text: Messages.findEmployees.place_4, keyboard: Keyboards.findEmployees.place_4}],
        {
            'mainMenu': this.mainMenu,
            'back': time_fe
        },
        this.read_text,
        (data) => {this.place = data},
        cost_fe)
    return
}

async function cost_fe() {
    this.handler(
        [{text: Messages.findEmployees.cost_5, keyboard: Keyboards.findEmployees.cost_5}],
        {
            'mainMenu': this.mainMenu,
            'back': place_fe
        },
        this.read_text,
        (data) => {this.cost = data},
        name_fe,
        {func: validateCost,errorMessages:[{text:'Не удалось распознать стоимость (введите только число большее или равно 0)',keyboard: Keyboards.empty}]})
    return
}

async function name_fe() {
    this.handler(
        [{text: Messages.findEmployees.name_6, keyboard: Keyboards.findEmployees.name_6}],
        {
            'mainMenu': this.mainMenu,
            'back': cost_fe
        },
        this.read_text,
        (data) => {this.name = data},
        contacts_fe)
    return
}

async function contacts_fe() {
    this.handler(
        [{text: Messages.findEmployees.contacts_7, keyboard: Keyboards.findEmployees.contacts_7}],
        {
            'mainMenu': this.mainMenu,
            'back': name_fe
        },
        this.read_text,
        (data) => {this.contacts = data},
        result_fe,
        {func: validatePhone,errorMessages:[{text:'Не удалось распознать номер телефона, попробуйте снова.',keyboard: Keyboards.empty}]})
    return
}

async function result_fe() {
    this.handler(
        [{text: Messages.findEmployees.result_8 + this.getVacancyText(undefined,'\n\nВсё верно?'), keyboard: Keyboards.findEmployees.result_8}],
        {
            'mainMenu': this.mainMenu,
            'back': contacts_fe,
            'allRight': attention_fe
        },
        this.read_btn,
        (data) => {this.result = data},
        this.mainMenu)
    return
}

async function attention_fe() {
    this.handler(
        [{text: Messages.findEmployees.attention_9[this.jobtype], keyboard: Keyboards.findEmployees.attention_9}],
        {
            'access': end_fe,
            'deny': this.mainMenu,
        },
        this.read_btn,
        (data) => {this.result = data},
        this.mainMenu)
    return
}

async function writeToDB() {
    const vacancy = new Vacancies({
        employer_vk_id: this.peer_id,
        name: this.name,
        phone: this.contacts.phone,
        jobtype: this.jobtype,
        category: this.category,
        time: this.time,
        place: this.place,
        cost: this.cost,
    })
    // console.log('Сохраняю',vacancy)
    const answer = await global.db.save(vacancy)
    console.log('Сохранено',answer)
    global.bot.sendToModeration(vacancy)
}

async function end_fe() {
    try {
        await writeToDB.call(this)
        this.handler(
            [{text: Messages.findEmployees.end_10, keyboard: Keyboards.findEmployees.end_10}],
            {
                'mainMenu': this.mainMenu,
            },
            this.read_btn,
            (data) => {this.result = data},
            this.mainMenu)
    //sendToModeration
    } catch(e) {
        this.error(this.mainMenu)
        console.log('Erorr on end_fe',e)
    }
    return
}



module.exports = findEmployeesMenu