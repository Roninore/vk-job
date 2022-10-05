function getDescription(vacancy) {
    const jobtypes = {
        'temporaryJob': 'Подработка',
        'constantJob': 'Постоянная работа'
    }
    const time = {
        'temporaryJob': 'Дата и время выполнения:',
        'constantJob': 'График, кол-во часов:'
    }
    return `Тип: ${jobtypes[vacancy.jobtype]}
Описание: ${vacancy.category}
${time[vacancy.jobtype]} ${vacancy.time}
Нас. пункт: ${vacancy.place}
Оплата: ${vacancy.cost}
Имя: ${vacancy.name}
Телефон: ${vacancy.phone}`
}

async function sendToModeration(vacancy) {
    const ids = global.db.moderators.map(el => {return el.data.id})
    const message = 
`Новая заявка на вакансию
№${vacancy.data.id}
@id${vacancy.data.employer_vk_id}(Пользователь)
===================
${getDescription(vacancy.data)}
===================
`
    const keyboard = {
        inline: true,
        buttons: [
            [{  
                action:{
                    type:'text',
                    label:'Принять',
                    payload: {btn: 'accept-vacancy', startSession: true, id: vacancy.data.id}
                },
                color:'positive'
            },
            {  
                action:{
                    type:'text',
                    label:'Отклонить',
                    payload: {btn: 'reject-vacancy', startSession: true, id: vacancy.data.id}
                },
                color:'negative'
            }],
            [
                {  
                    action:{
                        type:'text',
                        label:'Написать',
                        payload: {btn: 'message-to-employer', startSession: true, id: vacancy.data.id}
                    },
                    color:'primary'
                }, 
            ]
        ]
    }
    this.mailing(ids, message,{keyboard})
}

module.exports = sendToModeration