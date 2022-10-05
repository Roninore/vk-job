const start = {
    one_time:true,
    buttons:[[  
    {  
        action:{
            type:'text',
            label:'Начать'
        },
        color:'primary'
    },]]}

const mainMenu = {
    inline: true,
    buttons:[[  
    {  
        action:{
            type:'text',
            label:'Найти работу',
            payload: {btn: 'findJobMenu'}
        },
        color:'positive'
    },],[
    {  
        action:{
            type:'text',
            label:'Найти сотрудника',
            payload: {btn: 'findEmployeesMenu'}
        },
        color:'positive'
    },],[
    {  
        action:{
            type:'text',
            label:'Мой профиль',
            payload: {btn: 'profileMenu'}
        },
        color:'primary'
    },],[ 
    {  
        action:{
            type:'text',
            label:'Лента вакансий',
            payload: {btn: 'vacancyFeedMenu'}
        },
        color:'primary'
    },
    ],[
    {  
        action:{
            type:'text',
            label:'Публикация рекламы',
            payload: {btn: 'advertismentMenu'}
        },
        color:'secondary'
    },],[
    {  
        action:{
            type:'text',
            label:'Помощь',
            payload: {btn: 'supportMenu'}
        },
        color:'secondary'
    },]
    ]
}

const toMenu = {  
    action:{
        type:'text',
        label:'В меню',
        payload: {btn: 'mainMenu'}
    },
    color:'negative'
}

const back = {
    action:{
        type:'text',
        label:'Назад',
        payload: {btn: 'back'}
    },
    color:'secondary'
}

const next = {
    action:{
        type:'text',
        label:'Далее',
        payload: {btn: 'next'}
    },
    color:'primary'
}

const back_plus_toMenu = {
    inline: true,
    buttons: [[back, toMenu]]
}

const findJob = {
    jobtype_1: {
        inline: true,
        buttons: [
            [{  
                action:{
                    type:'text',
                    label:'Подработку',
                    payload: {btn: 'temporaryJob'}
                },
                color:'primary'
            },
            {  
                action:{
                    type:'text',
                    label:'Постоянную',
                    payload: {btn: 'constantJob'}
                },
                color:'primary'
            }],
            [ toMenu ]
        ]
    },
    category_2: back_plus_toMenu,
    time_3: back_plus_toMenu,
    place_4: back_plus_toMenu,
    name_5: back_plus_toMenu,
    age_6: back_plus_toMenu,
    contacts_7: back_plus_toMenu,
    other_8: back_plus_toMenu,
    result_9: {
            inline: true,
            buttons: [
                [{
                    action:{
                        type:'text',
                        label:'Всё верно',
                        payload: {btn: 'allRight'}
                    },
                    color:'positive'
                }],
                [back, toMenu]
            ]
    },
    attention_10: {
        inline: true,
        buttons: [
            [{
                action:{
                    type:'text',
                    label:'Согласен',
                    payload: {btn: 'access'}
                },
                color:'positive'
            },
            {
                action:{
                    type:'text',
                    label:'Не согласен',
                    payload: {btn: 'deny'}
                },
                color:'negative'
            }]
        ]
    },
    end_11: {
        inline: true,
        buttons: [
            [{
                action:{
                    type:'text',
                    label:'Лента вакансий',
                    payload: {btn: 'vacancyFeed'}
                },
                color:'secondary'
            }],
            [toMenu]
        ]
    },

}

const findEmployees = {
    jobtype_1: {
        inline: true,
        buttons: [
            [{  
                action:{
                    type:'text',
                    label:'Подработка',
                    payload: {btn: 'temporaryJob'}
                },
                color:'primary'
            },
            {  
                action:{
                    type:'text',
                    label:'Постоянная',
                    payload: {btn: 'constantJob'}
                },
                color:'primary'
            }],
            [ toMenu ]
        ]
    },
    category_2: back_plus_toMenu,
    time_3: back_plus_toMenu,
    place_4: back_plus_toMenu,
    cost_5: back_plus_toMenu,
    name_6: back_plus_toMenu,
    contacts_7: back_plus_toMenu,
    result_8: {
        inline: true,
        buttons: [
            [{
                action:{
                    type:'text',
                    label:'Всё верно',
                    payload: {btn: 'allRight'}
                },
                color:'positive'
            }],
            [back, toMenu]
        ]
    },
    attention_9: {
        inline: true,
        buttons: [
            [{
                action:{
                    type:'text',
                    label:'Согласен',
                    payload: {btn: 'access'}
                },
                color:'positive'
            },
            {
                action:{
                    type:'text',
                    label:'Не согласен',
                    payload: {btn: 'deny'}
                },
                color:'negative'
            }]
        ]
    },
    end_10:{
        inline: true,
        buttons: [[toMenu]]
    },
}

const advertisment = {
    inline: true,
    buttons: [[toMenu]]
}

const support = {
    inline: true,
    buttons: [[toMenu]]
}

const vacancyFeedEnd = function(id,startSession = false) { return {
    inline: true,
    buttons: [[
        {
            action:{
                type:'text',
                label:'Откликнуться',
                payload: {btn: 'response',id:id,startSession:startSession}
            },
            color:'positive'
        }],
        [next,toMenu]
        
    ]
}
}
const vacancyFeed = function(id,startSession = false) { return {
    inline: true,
    buttons: [
        [{
            action:{
                type:'text',
                label:'Откликнуться',
                payload: {btn: 'response',id:id,startSession:startSession}
            },
            color:'positive'
        }],
    ]
}
}

const profile = {
    start: {
        inline: true,
        buttons: [
            [{
                    action:{
                        type:'text',
                        label:'Анкета',
                        payload: {btn: 'myForm'}
                    },
                    color:'primary'
            },
            {
                action:{
                    type:'text',
                    label:'Вакансии',
                    payload: {btn: 'myVacancies'}
                },
                color:'primary'
            }],
            [toMenu]
        ]
    },
    myForm: {
        inline: true,
        buttons: [
            [back,toMenu],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Изменить',
                        payload: {btn: 'findJobMenu'}
                    },
                    color: 'primary'
                }
            ]
        ]
    },
    myVacancies: (id) => { return {
        inline: true,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        label: 'Удалить',
                        payload: {btn: 'deleteVacancy',id: id}
                    },
                    color: 'negative'
                }
            ]
        ]
    }
    
    }}
    
const yes_or_no = {
    inline: true,
    buttons: [
        [{
            action:{
                type:'text',
                label:'Да',
                payload: {btn: 'yes'}
            },
            color:'positive'
        },
        {
            action:{
                type:'text',
                label:'Нет',
                payload: {btn: 'no'}
            },
            color:'negative'
        }]
    ]
    }

const cancel = {
    inline: true,
    buttons: [
        [{
            action:{
                type:'text',
                label:'Отмена',
                payload: {btn: 'cancel'}
            },
            color:'negative'
        }
        ]]
    }

const emptyInline = {inline: true, buttons:[]}
const empty = {buttons: []}

module.exports = {
    start,
    mainMenu,
    toMenu,
    back,
    next,
    back_plus_toMenu,
    findJob,
    findEmployees,
    advertisment,
    support,
    profile,
    vacancyFeed,
    emptyInline,
    empty,
    yes_or_no,
    cancel,
    vacancyFeedEnd
}