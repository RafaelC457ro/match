'use strict'
const Candidate = use('App/Models/Candidate')
class CandidateService {
  static parseExperience(experience) {
    const regexGreater = /(?<start>[0-9]+)\+\syears/
    const startEndRegex = /(?<start>[0-9]+)\-(?<end>[0-9]+)\syears/

    if (regexGreater.test(experience)) {
      const result = experience.match(regexGreater)
      return {
        start_experience: Number(result.groups.start),
        end_experience: null
      }
    }

    if (startEndRegex.test(experience)) {
      const result = experience.match(startEndRegex)

      return {
        start_experience: Number(result.groups.start),
        end_experience: Number(result.groups.end)
      }
    }

    return null
  }

  static async list(filter) {
    const query = Candidate.query()

    if (filter.city) {
      query.whereIn('city', filter.city)
    }

    if (filter.betweenStart && filter.betweenEnd) {
      query
        .where('start_experience', '>=', filter.betweenStart)
        .where('end_experience', '<=', filter.betweenEnd)
    }

    if (filter.greaterThen) {
      query.where('start_experience', '>', filter.greaterThen)
    }

    if (filter.technologies) {
      query.whereExists(function () {
        this.from('technologies')
          .whereRaw('candidates.id = technologies.candidate_id')
          .whereIn('technologies.name', filter.technologies)
      })
    }

    const candidates = await query.with('technologies').fetch()

    return { candidates }
  }
}

module.exports = CandidateService
