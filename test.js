const Database = require('./ClassDataBase/DataBase.js')
const Vacancies = require('./ClassDataBase/Models/Vacancies')

// const {types} = require('pg')

// console.log()

const vacancy = new Vacancies({
    id: 1,
    employer_vk_id: 1123123,
    time: 'с 6 до 5',
    place: 'море',
    cost: 1233,
    name: 'Кек',
    phone: '2',
    jobtype: '4',
    category: '5',
    
})

// console.log(vacancy.saveQuery())



const db = new Database()

const f = async () => {
    await db.vacanciesQuery('SELECT * FROM vacancies')
}
f()
// db.save(vacancy)