const {Client,types} = require('pg')
const {dbuser,dbhost,dbname,dbpassword,dbport} = require('../config.js')
const Vacancies = require('./Models/Vacancies')
const Responses = require('./Models/Responses')
const Executors = require('./Models/Executors')
const Moderators = require('./Models/Moderators')

types.setTypeParser(types.builtins.INT8, (val) => {
    return Number(val)})

class Database {
    constructor(pararms) {
        this.start()
    }

    async start() {
        const clientParams = {
            user: dbuser,
            host: dbhost,
            database: dbname,
            password: dbpassword,
            port: dbport,
        }
        console.log(clientParams)
        this.client = new Client(clientParams)
        await this.client.connect()
        await this.loadModerators()
    }

    async testQuery() {
        
        console.log(answer)
    }

    async save(object) {
        try {
        const [text,values] = object.saveQuery()
        const answer = await this.client.query(text,values)
        const pk_field = object.pk
        // console.log(answer)
        if (answer.rows[0] && answer.rows[0][pk_field])
            object.data[pk_field] = answer.rows[0][pk_field]
        // console.log(object)
        return answer
        } catch(e) {
            console.log('Error on save',e)
        }
    }
    async getModelQuery(model, text,values = []) {
        const answer = await this.client.query(text,values)
        const array = answer.rows.map(el => {return new model(el)})
        return array
    }
    async vacanciesQuery(text,values=[]) {
        return await this.getModelQuery(Vacancies,text,values)
    }
    async responsesQuery(text,values=[]) {
        return await this.getModelQuery(Responses,text,values)
    }
    async executorsQuery(text,values=[]) {
        return await this.getModelQuery(Executors,text,values)
    }
    async moderatorsQuery(text,values=[]) {
        return await this.getModelQuery(Moderators,text,values)
    }

    async getAllReadyExecutorsIds() {
        const answer = await this.client.query('SELECT executor_vk_id FROM vkjob_executors WHERE closed=$1',[false])
        return answer.rows.map(el => {return el.executor_vk_id})
    }

    async loadModerators() {
        const answer = await this.moderatorsQuery('SELECT id,type FROM vkjob_moderators')
        this.moderators = answer
        return answer
    }

    async getUserForm(executor_vk_id) {
        const answer = await this.executorsQuery('SELECT * FROM vkjob_executors WHERE closed=$1 AND executor_vk_id=$2',[false,executor_vk_id])
        return answer[0]
    }

    async getUserVacancies(employer_vk_id) {
        const answer = await this.vacanciesQuery('SELECT * FROM vkjob_vacancies WHERE closed=$1 AND employer_vk_id=$2',[false,employer_vk_id])
        return answer
    }
    async deleteVacancy(id) {
        const answer = await this.client.query('UPDATE vkjob_vacancies SET closed=$1 WHERE id=$2',[true,id])
        return answer
    }
    async getVacancy(id) {
        const answer = await this.vacanciesQuery('SELECT * FROM vkjob_vacancies WHERE id=$1',[id])
        return answer[0]
    }
    async passVacancy(id) {
        const answer = await this.client.query('UPDATE vkjob_vacancies SET passed=$1 WHERE id=$2',[true,id])
        return answer
    }
    async getVacancies(offset=0,limit = null) {
        const answer = await this.vacanciesQuery('SELECT * FROM vkjob_vacancies WHERE closed=$3 AND passed=$4 ORDER BY id OFFSET $1 LIMIT $2',[offset,limit,false,true])
        return answer
    }
}   

module.exports = Database
