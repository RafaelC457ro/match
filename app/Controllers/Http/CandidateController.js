'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')

class CandidateController {
  async index() {
    return await Candidate.query().with('technologies').fetch()
  }
}

module.exports = CandidateController
