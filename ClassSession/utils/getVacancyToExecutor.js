module.exports = function getVacancyToExecutor(data) {
    const jobtypes = {
        'temporaryJob': 'Подработка',
        'constantJob': 'Постоянная работа'
    }
    const time = {
        'temporaryJob': 'Дата и время выполнения:',
        'constantJob': 'График работы, кол-во часов:'
    }
    return `Тип работы: ${jobtypes[data.jobtype]}
Описание работы: ${data.category}
${time[data.jobtype]} ${data.time}
Нас. пункт: ${data.place}
Оплата: ${data.cost}`
}