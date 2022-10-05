const Model = require('./Model.js')

class Executors extends Model {
    constructor(params) {
        super()
        this.tableName = 'vkjob_executors'
        this.pk = 'id'
        this.fields = {
            id: {type: Number, canBeNull:true,pk:true},
            executor_vk_id: {type: Number},
            name: {type: String,length:100 },
            phone: {type: String,length:10 },
            age: {type: Number},
            jobtype: {type: String,length:20 },
            category: {type: String },
            time: {type: String,length:100 },
            place: {type: String,length:100 },
            other: {type: String},
            closed: {type: Boolean, canBeNull:true}
        }
        this.data = params

        this.validate()
    }
}

module.exports = Executors