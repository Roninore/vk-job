const Model = require('./Model.js')

class Responses extends Model {
    constructor(params) {
        super()
        this.tableName = 'vkjob_responses'
        this.pk = 'id'
        this.fields = {
            id: {type: Number, canBeNull:true,pk:true },
            vacancy_id: {type: Number },
            executor_id: {type: Number },
        }
        this.data = params

        this.validate()
    }
}

module.exports = Responses