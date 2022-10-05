function getVacancyText(data = undefined,str = '') {

    if (!data) {
        data = {
            jobtype: this.jobtype,
            category: this.category,
            time: this.time,
            place: this.place,
            name: this.name,
            age: this.age,
            phone: this.contacts.phone,
            other: this.other,  
            cost: this.cost
        }
    }
    const time = {
        'temporaryJob': 'Дата и время выполнения:',
        'constantJob': 'График, кол-во часов:'
    }
    const jobtypes = {
        'temporaryJob': 'Подработка',
        'constantJob': 'Постоянная работа'
    }
    return `Тип работы: ${jobtypes[data.jobtype]}
Описание работы: ${data.category}
${time[data.jobtype]} ${data.time}
Нас. пункт: ${data.place}
Оплата: ${data.cost}
Имя: ${data.name}
Телефон: ${data.phone}${str}`
}

module.exports = getVacancyText