'use strict'

class Candidate {
  static get rules() {
    return {
      betweenStart: 'number|above:0',
      betweenEnd: 'number|above:1',
      greaterThen: 'number|above:0',
      technologies: 'array|min:1',
      city: 'array|min:1'
    }
  }

  static get messages() {
    return {
      'betweenStart.number': 'You must provide a number.',
      'betweenStart.above': 'You must provide a number above 0.',
      'betweenEnd.number': 'You must provide a number',
      'betweenEnd.above': 'You must provide a number above 1.',
      'greaterThen.number': 'You must provide a number.',
      'greaterThen.above': 'You must provide a number above 1.',
      'technologies.array': 'You must provide a list of technologies.',
      'city.array': 'You must provide a list of cites.'
    }
  }
}

module.exports = Candidate
