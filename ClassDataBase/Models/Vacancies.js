const Model = require('./Model.js')

class Vacancies extends Model {
    constructor(params) {
        super()
        this.tableName = 'vkjob_vacancies'
        this.pk = 'id'
        this.fields = {
            id: {type: Number, canBeNull:true, pk:true},
            employer_vk_id: {type: Number},
            name: {type: String,length:100 },
            phone: {type: String,length:10 },
            jobtype: {type: String,length:20 },
            category: {type: String },
            time: {type: String,length:100 },
            place: {type: String, length: 100},
            cost: {type: Number},
            closed: {type: Boolean, canBeNull:true},
            passed: {type: Boolean, canBeNull:true}
        }
        this.data = params

        this.validate()
    }
}

module.exports = Vacancies