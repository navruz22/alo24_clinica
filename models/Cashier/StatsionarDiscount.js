const {Schema, model, Types} = require('mongoose')
const Joi = require('joi')

const statsionarDiscount = new Schema(
    {
        total: {type: Number, required: true},
        discount: {type: Number, required: true},
        procient: {type: Number, max: 100},
        payment: {type: Schema.Types.ObjectId, ref: 'Payment', required: true},
        clinica: {type: Schema.Types.ObjectId, ref: 'Clinica', required: true},
        client: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
        connector: {type: Schema.Types.ObjectId, ref: 'Connector', required: true},
        isArchive: {type: Boolean, default: false},
        comment: {type: String, required: true},
    },
    {
        timestamps: true,
    },
)

function validateDiscount(discount) {
    const schema = Joi.object({
        total: Joi.number().required(),
        discount: Joi.number(),
        procient: Joi.number(),
        payment: Joi.string(),
        clinica: Joi.string().required(),
        connector: Joi.string().required(),
        client: Joi.string().required(),
        comment: Joi.string(),
    })
    return schema.validate(discount)
}

module.exports.validateDiscount = validateDiscount
module.exports.StatsionarDiscount = model('StatsionarDiscount', statsionarDiscount)
