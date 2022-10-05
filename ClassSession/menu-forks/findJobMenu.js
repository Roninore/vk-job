const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')
const {validatePhone,validateAge} = require('../validations.js')
const Executors = require('../../ClassDataBase/Models/Executors.js')

async function findJobMenu(params = {}) {
    let messages = []
    if (params.messages)
        messages = params.messages
    this.handler(
        [...messages,{text: Messages.findJob.jobtype_1, keyboard: Keyboards.findJob.jobtype_1}],
        {
            'temporaryJob': 'temporaryJob',
            'constantJob': 'constantJob',
            'mainMenu': this.mainMenu
        },
        this.read_btn,
        (data) => {this.jobtype = data},
        category_fj)
    return
}
async function category_fj() {
    this.handler(
        [{text: Messages.findJob.category_2, keyboard: Keyboards.findJob.category_2}],
        {
            'mainMenu': this.mainMenu,
            'back': findJobMenu
        },
        this.read_text,
        (data) => {this.category = data},
        time_fj)
    return
}

async function time_fj() {
    this.handler(
        [{text: Messages.findJob.time_3, keyboard: Keyboards.findJob.time_3}],
        {
            'mainMenu': this.mainMenu,
            'back': category_fj
        },
        this.read_text,
        (data) => {this.time = data},
        place_fj)
    return
}

async function place_fj() {
    this.handler(
        [{text: Messages.findJob.place_4, keyboard: Keyboards.findJob.place_4}],
        {
            'mainMenu': this.mainMenu,
            'back': time_fj
        },
        this.read_text,
        (data) => {this.place = data},
        name_fj)
    return
}


async function name_fj() {
    this.handler(
        [{text: Messages.findJob.name_5, keyboard: Keyboards.findJob.name_5}],
        {
            'mainMenu': this.mainMenu,
            'back': place_fj
        },
        this.read_text,
        (data) => {this.name = data},
        age_fj)
    return
}

async function age_fj() {
    this.handler(
        [{text: Messages.findJob.age_6, keyboard: Keyboards.findJob.age_6}],
        {
            'mainMenu': this.mainMenu,
            'back': name_fj
        },
        this.read_text,
        (data) => {this.age = data},
        contacts_fj,
        {func: validateAge,errorMessages:[{text:'Не удалось распознать возраст, попробуйте снова.',keyboard: Keyboards.empty}]})
    return
}

async function contacts_fj() {
    this.handler(
        [{text: Messages.findJob.contacts_7, keyboard: Keyboards.findJob.contacts_7}],
        {
            'mainMenu': this.mainMenu,
            'back': age_fj
        },
        this.read_text,
        (data) => {this.contacts = data},
        other_fj,
        {func: validatePhone,errorMessages:[{text:'Не удалось распознать номер телефона, попробуйте снова.',keyboard: Keyboards.empty}]})
    return
}

async function other_fj() {
    this.handler(
        [{text: Messages.findJob.other_8, keyboard: Keyboards.findJob.other_8}],
        {
            'mainMenu': this.mainMenu,
            'back': contacts_fj
        },
        this.read_text,
        (data) => {this.other = data},
        result_fj)
    return
}

async function result_fj() {
    this.handler(
        [{text: Messages.findJob.result_9 + this.getMyDescriptionText(undefined,'\n\nВсё верно?'), keyboard: Keyboards.findJob.result_9}],
        {
            'mainMenu': this.mainMenu,
            'back': other_fj,
            'allRight': attention_fj
        },
        this.read_btn,
        (data) => {this.result = data},
        this.mainMenu)
    return
}

async function attention_fj() {
    if (this.jobtype == 'temporaryJob')
        this.handler(
            [{text: Messages.findJob.attention_10, keyboard: Keyboards.findJob.attention_10}],
            {
                'access': end_fj,
                'deny': this.mainMenu,
            },
            this.read_btn,
            (data) => {this.result = data},
            this.mainMenu)
    else
       end_fj.call(this) 
    return
}

async function writeToDB() {
    const oldRecords = await global.db.executorsQuery('SELECT * FROM vkjob_executors WHERE executor_vk_id=$1',[this.peer_id])
    for (el of oldRecords) {
        if (!el.data.closed) {
            el.data.closed = true
            global.db.save(el)
        }
    }
    const executor = new Executors({
        executor_vk_id: this.peer_id,
        name: this.name,
        phone: this.contacts.phone,
        age: this.age,
        jobtype: this.jobtype,
        category: this.category,
        time: this.time,
        place: this.place,
        other: this.other
    })
    const answer = await global.db.save(executor)
    console.log('Сохранено',answer)
}

async function end_fj() {
    try {
    await writeToDB.call(this)
    this.handler(
        [{text: Messages.findJob.end_11, keyboard: Keyboards.findJob.end_11}],
        {
            'vacancyFeed': this.vacancyFeedMenu,
            'mainMenu': this.mainMenu,
        },
        this.read_btn,
        (data) => {this.result = data},
        this.mainMenu)
    return
    } catch(e) {
        this.error(this.mainMenu)
        console.log('Erorr on end_fj',e)
    }
}


module.exports = findJobMenu