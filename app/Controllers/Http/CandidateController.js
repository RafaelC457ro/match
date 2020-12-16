'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const CandidateService = use('App/Services/Candidate')
const { validate } = use('Validator')
const CandidateValidator = use('App/Validators/Candidate')

class CandidateController {
  async index({ request, response }) {
    const data = request.only([
      'betweenStart',
      'betweenEnd',
      'greaterThen',
      'technologies',
      'city'
    ])
    const validation = await validate(
      data,
      CandidateValidator.rules,
      CandidateValidator.messages
    )

    if (validation.fails()) {
      return response.status(422).send({ errors: validation.messages() })
    }

    return await CandidateService.list(data)
  }
}

module.exports = CandidateController
