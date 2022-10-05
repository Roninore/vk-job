function getMyDescriptionText(data = undefined,str = '') {

    if (!data) {
        data = {
            jobtype: this.jobtype,
            category: this.category,
            time: this.time,
            place: this.place,
            name: this.name,
            age: this.age,
            phone: this.contacts.phone,
            other: this.other
        }
    }

    const jobtypes = {
        'temporaryJob': 'Подработка',
        'constantJob': 'Постоянная работа'
    }
    return `Тип работы: ${jobtypes[data.jobtype]}
Желаемый вид работы: ${data.category}
Удобное время: ${data.time}
Нас. пункт: ${data.place}
Имя: ${data.name}
Возраст: ${data.age}
Телефон: ${data.phone}
О себе: ${data.other}${str}`
}

module.exports = getMyDescriptionText