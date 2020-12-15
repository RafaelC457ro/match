'use strict'

class Candidate {
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
}

module.exports = Candidate
