'use strict'

class Candidate {
  static get rules() {
    return {
      // validation rules
      betweenStart: 'number|above:0',
      betweenEnd: 'number|above:1'
    }
  }

  static get messages() {
    return {
      'betweenStart.number': 'You must provide a a number.',
      'betweenStart.above': 'You must provide a number above 0.',
      'betweenEnd.number': 'You must provide a a number',
      'betweenEnd.above': 'You must provide a number above 1.'
    }
  }
}

module.exports = Candidate
