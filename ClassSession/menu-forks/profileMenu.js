const Messages = require('../const-data/Messages')
const Keyboards = require('../const-data/Keyboards')


async function profileMenu() {
    try {
    this.handler(
        [{text: Messages.profile.start, keyboard: Keyboards.profile.start}],
        {
            'myForm': myForm,
            'myVacancies': myVacancies,
            'mainMenu': this.mainMenu
        },
        this.read_btn,
        (data) => {this.result = data},
        this.mainMenu)
    return
    } catch(e) {
        this.error()
        console.log(e)
    }
}

function wait(ms) {
    return new Promise((res,rej)=>{
        setTimeout(()=>{res()},ms)
    })
}

async function myForm() {
    let userForm
    try {
        userForm = await global.db.getUserForm(this.peer_id)
        userForm.data
    } catch(e) {
        const messages = [{text:'Вы еще не заполнили анкету! Открываю форму заполнения анкеты работника.',keyboard:Keyboards.empty}]
        this.findJobMenu({messages})
        return
    }
        try {    
        this.handler(
            [{text: Messages.profile.myForm + this.getMyDescriptionText(userForm.data), keyboard: Keyboards.profile.myForm}],
            {
                'back': profileMenu,
                'findJobMenu': this.findJobMenu,
                'mainMenu': this.mainMenu
            },
            this.read_btn,
            (data) => {this.result = data},
            this.mainMenu)
        return
        } catch(e) {
            this.error()
            console.log(e)
        }
}

async function deleteVacancy(params = {}) {
    try {
        if (!params.hasOwnProperty('ctx')) throw new Error('Не передан контекст')
        this.vacancyToDeleteId = params.ctx.message.payload.id
        
        this.handler(
            [{text: `Вы действительно хотите удалить вакансию #${this.vacancyToDeleteId}?`, keyboard: Keyboards.yes_or_no}],
            {
                'yes': acceptDeletionVacancy,
                'no': myVacancies,
            },
            this.read_btn,
            (data) => {this.result = data},
            this.mainMenu)
        return
    }
    catch(e) {
        this.vacancyToDeleteId = undefined
        console.log(e)
        this.error()
    }
}
async function acceptDeletionVacancy(params) {
    try {
        if (!params.hasOwnProperty('ctx')) throw new Error('Не передан контекст')

        await global.db.deleteVacancy(this.vacancyToDeleteId)
        this.vacancyToDeleteId = undefined
        
        this.messages = [{text: 'Удалено',keyboard:Keyboards.back_plus_toMenu}]
        this.done()
        myVacancies.call(this,params)
        return
    }
    catch(e) {
        this.vacancyToDeleteId = undefined
        console.log(e)
        this.error()
    }
}



async function myVacancies(params = {}) {
    try {
        if (params.hasOwnProperty('ctx') && (params.ctx.message.payload.btn == 'no' || params.ctx.message.payload.btn == 'yes')) {
            await global.bot.markAsRead(params.ctx)  
            this.handler( // Если вызов после удаления или отмены удаления
                [],
                {
                    'back': profileMenu,
                    'deleteVacancy': deleteVacancy,
                    'mainMenu': this.mainMenu
                },
                this.read_btn,
                (data) => {this.result = data},
                this.mainMenu)
            return
        }

        const userVacancies = await global.db.getUserVacancies(this.peer_id)
        const messages = userVacancies.map(el => {
            return {
                text: `Вакансия #${el.data.id}\n${el.data.passed ? 'Проверка модератором пройдена' : 'Проверка модератором не пройдена'}\n` +
                                                                                                    this.getVacancyText(el.data),
                keyboard: Keyboards.profile.myVacancies(el.data.id)
            }
        })
        this.handler(
            [{text: `Размещено вакансий: ${userVacancies.length}`,keyboard:Keyboards.back_plus_toMenu},...messages],
            {
                'back': profileMenu,
                'deleteVacancy': deleteVacancy,
                'mainMenu': this.mainMenu
            },
            this.read_btn,
            (data) => {this.result = data},
            this.mainMenu)
        return
        } catch(e) {
            this.error()
            console.log(e)
        }
}


module.exports = profileMenu