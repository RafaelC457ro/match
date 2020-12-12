const { test, trait } = use('Test/Suite')('Candidates')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')
const Technology = use('App/Models/Technology')

trait('Test/ApiClient')

test('it should list all Candidates', async ({ client }) => {
  const candidate = {
    id: 1,
    name: 'João das Neves',
    city: 'Florianópolis - SC',
    start_experience: 1,
    end_experience: 2
  }

  const technologies = [
    {
      name: 'Javacript',
      is_main_tech: true
    }
  ]

  const newCaditate = await Candidate.create(candidate)
  const newTechs = new Technology()
  newTechs.name = 'Javacript'
  newTechs.is_main_tech = true

  await newCaditate.technologies().save(newTechs)

  const response = await client.get('/candidates').end()

  response.assertStatus(200)
  response.assertJSONSubset([{ ...candidate, technologies }])
})
