'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')

class CandidateController {
  async index({ response, request }) {
    return await Candidate.all()
  }
}

module.exports = CandidateController
