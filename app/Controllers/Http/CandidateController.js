'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')
const { validate } = use('Validator')
const CandidateValidator = use('App/Validators/Candidate')

class CandidateController {
  async index({ request, response }) {
    const data = request.only([
      'betweenStart',
      'betweenEnd',
      'greaterThen',
      'technologies'
    ])
    const validation = await validate(
      data,
      CandidateValidator.rules,
      CandidateValidator.messages
    )
    const query = Candidate.query()

    if (validation.fails()) {
      return response.status(422).send({ errors: validation.messages() })
    }

    if (data.betweenStart && data.betweenEnd) {
      query
        .where('start_experience', '>=', data.betweenStart)
        .where('end_experience', '<=', data.betweenEnd)
    }

    if (data.greaterThen) {
      query.where('start_experience', '>', data.greaterThen)
    }

    if (data.technologies) {
      query.whereExists(function () {
        this.from('technologies')
          .whereRaw('candidates.id = technologies.candidate_id')
          .whereIn('technologies.name', data.technologies)
      })
    }

    const candidates = await query.with('technologies').fetch()

    return { candidates }
  }
}

module.exports = CandidateController
