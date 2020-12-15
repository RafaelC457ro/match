'use strict'
const got = require('got')
const CandidateService = use('App/Services/Candidate')
const Technology = use('App/Models/Technology')
/*
|--------------------------------------------------------------------------
| CandidateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CandidateSeeder {
  async run() {
    try {
      const response = await got.get(
        'https://geekhunter-recruiting.s3.amazonaws.com/code_challenge.json'
      )
      const { candidates } = JSON.parse(response.body)
      for (const candidate of candidates) {
        const { id, city, experience, technologies } = candidate

        const newCandidate = await Factory.model('App/Models/Candidate').make({
          id,
          city,
          ...CandidateService.parseExperience(experience)
        })

        await newCandidate.save()

        for (const technology of technologies) {
          const newTechs = new Technology()
          newTechs.fill(technology)
          await newCandidate.technologies().save(newTechs)
        }
      }
    } catch (error) {}
  }
}

module.exports = CandidateSeeder
