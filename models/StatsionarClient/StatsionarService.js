const { Schema, model, Types } = require('mongoose')
const Joi = require('joi')

const service = new Schema(
  {
    clinica: { type: Schema.Types.ObjectId, ref: 'Clinica', required: true },
    isArchive: { type: Boolean, default: false },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'StatsionarClient',
      required: true,
    },
    connector: {
      type: Schema.Types.ObjectId,
      ref: 'StatsionarConnector',
      required: true,
    },
    serviceid: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    service: { type: Object },
    pieces: { type: Number },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    table: { type: String },
    templates: { type: String },
    refuse: { type: Boolean, default: false },
    accept: { type: Boolean, default: false },
    reseption: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User' },
    turn: { type: Number },
  },
  {
    timestamps: true,
  },
)

function validateStatsionarService(clientservice) {
  const schema = Joi.object({
    clinica: Joi.string().required(),
    client: Joi.string(),
    connector: Joi.string(),
    serviceid: Joi.string().required(),
    service: Joi.object().required(),
    pieces: Joi.number(),
    department: Joi.string().required(),
    table: Joi.string(),
    templates: Joi.string(),
    refuse: Joi.boolean(),
    accept: Joi.string(),
    reseption: Joi.string().required(),
    doctor: Joi.string(),
    turn: Joi.string(),
  })

  return schema.validate(clientservice)
}

module.exports.validateStatsionarService = validateStatsionarService
module.exports.StatsionarService = model('StatsionarService', service)
