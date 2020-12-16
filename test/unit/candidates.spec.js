'use strict'

const { test } = use('Test/Suite')('Candidates Service')

const CandidateService = use('App/Services/Candidate')

test('it should parse experience [plus]', async ({ assert }) => {
  const experience = '10+ years'

  const expected = { start_experience: 10, end_experience: null }

  const parsed = CandidateService.parseExperience(experience)

  assert.deepEqual(parsed, expected)
})

test('it should parse experience [range]', async ({ assert }) => {
  const experience = '2-4 years'

  const expected = { start_experience: 2, end_experience: 4 }

  const parsed = CandidateService.parseExperience(experience)

  assert.deepEqual(parsed, expected)
})

test('it should parse invalid', async ({ assert }) => {
  const experience = ''

  const expected = null

  const parsed = CandidateService.parseExperience(experience)

  assert.deepEqual(parsed, expected)
})
