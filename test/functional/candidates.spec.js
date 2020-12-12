const { test, trait } = use('Test/Suite')('Candidates')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')

trait('Test/ApiClient')

test('it should list all Candidates', async ({ client }) => {
  const candidate = {
    id: 1,
    name: 'João das Neves',
    city: 'Florianópolis - SC'
  }

  await Candidate.create(candidate)

  const response = await client.get('/candidates').end()

  response.assertStatus(200)
  response.assertJSONSubset([candidate])
})
