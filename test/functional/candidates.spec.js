const { test, trait } = use('Test/Suite')('Candidates API')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Candidate = use('App/Models/Candidate')
const Technology = use('App/Models/Technology')
const candidates = [
  {
    id: 1,
    name: 'João das Neves',
    city: 'Florianópolis - SC',
    start_experience: 1,
    end_experience: 2,
    technologies: [
      {
        name: 'Javacript',
        is_main_tech: true
      }
    ]
  },
  {
    id: 2,
    name: 'Pedro Paiva',
    city: 'Tubarão - SC',
    start_experience: 15,
    technologies: [
      {
        name: 'Python',
        is_main_tech: true
      }
    ]
  },
  {
    id: 3,
    name: 'Vitor Carvalho',
    city: 'Florianópolis - SC',
    start_experience: 2,
    end_experience: 4,
    technologies: [
      {
        name: 'Elixir',
        is_main_tech: true
      }
    ]
  },
  {
    id: 4,
    name: 'Jefferson Almeida',
    city: 'São Paulo - SP',
    start_experience: 1,
    end_experience: 2,
    technologies: [
      {
        name: 'C#',
        is_main_tech: true
      }
    ]
  }
]

trait('Test/ApiClient')
trait('DatabaseTransactions')

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
  newTechs.fill(technologies[0])

  await newCaditate.technologies().save(newTechs)

  const response = await client.get('api/v1/candidates').end()

  response.assertStatus(200)
  response.assertJSON({ candidates: [{ ...candidate, technologies }] })
})

test('it should filter candidates by experience years', async ({ client }) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates')
    .query({ betweenStart: 1, betweenEnd: 2 })
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 4,
        name: 'Jefferson Almeida',
        city: 'São Paulo - SP',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'C#',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should filter candidates by experience years more then zero', async ({
  client
}) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates')
    .query({ betweenStart: 0, betweenEnd: 2 })
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 4,
        name: 'Jefferson Almeida',
        city: 'São Paulo - SP',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'C#',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should return a invalid between parameters', async ({ client }) => {
  const response = await client
    .get('api/v1/candidates')
    .query({ betweenStart: -1, betweenEnd: 0 })
    .end()

  response.assertStatus(422)
  response.assertJSON({
    errors: [
      {
        message: 'You must provide a number above 0.',
        field: 'betweenStart',
        validation: 'above'
      }
    ]
  })
})

test('it should filter candidates by experience greater then some year', async ({
  client
}) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates')
    .query({ greaterThen: 14 })
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 2,
        name: 'Pedro Paiva',
        city: 'Tubarão - SC',
        start_experience: 15,
        end_experience: null,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should filter candidates by experience years more then zero using greaterThen', async ({
  client
}) => {
  const candidatestest = [
    {
      id: 1,
      name: 'João das Neves',
      city: 'Florianópolis - SC',
      start_experience: 1,
      end_experience: 2,
      technologies: [
        {
          name: 'Javacript',
          is_main_tech: true
        }
      ]
    },
    {
      id: 2,
      name: 'Pedro Paiva',
      city: 'Tubarão - SC',
      start_experience: 15,
      end_experience: null,
      technologies: [
        {
          name: 'Python',
          is_main_tech: true
        }
      ]
    }
  ]
  for (const candidate of candidatestest) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates')
    .query({ greaterThen: 0 })
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 2,
        name: 'Pedro Paiva',
        city: 'Tubarão - SC',
        start_experience: 15,
        end_experience: null,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should filter candidates by one technologies', async ({ client }) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates?technologies[]=Javacript')
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should filter candidates by more then one technology', async ({
  client
}) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates')
    .query({ technologies: ['Javacript', 'Python'] })
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 2,
        name: 'Pedro Paiva',
        city: 'Tubarão - SC',
        start_experience: 15,
        end_experience: null,
        technologies: [
          {
            name: 'Python',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should return a invalid technologies parameters', async ({
  client
}) => {
  const response = await client
    .get('api/v1/candidates')
    .query({ technologies: 'teste' })
    .end()

  response.assertStatus(422)
  response.assertJSON({
    errors: [
      {
        message: 'You must provide a list of technologies.',
        field: 'technologies',
        validation: 'array'
      }
    ]
  })
})

test('it should filter candidates by city', async ({ client }) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client
    .get('api/v1/candidates?city[]=Florianópolis - SC')
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 3,
        name: 'Vitor Carvalho',
        city: 'Florianópolis - SC',
        start_experience: 2,
        end_experience: 4,
        technologies: [
          {
            name: 'Elixir',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})

test('it should filter candidates by city', async ({ client }) => {
  for (const candidate of candidates) {
    const {
      id,
      name,
      city,
      start_experience,
      end_experience,
      technologies
    } = candidate
    const newCaditate = await Candidate.create({
      id,
      name,
      city,
      start_experience,
      end_experience
    })

    for (const technology of technologies) {
      const newTechs = new Technology()
      newTechs.fill(technology)
      await newCaditate.technologies().save(newTechs)
    }
  }

  const response = await client

    .get('api/v1/candidates?city[]=Florianópolis - SC&city[]=São Paulo - SP')
    .end()

  response.assertStatus(200)
  response.assertJSON({
    candidates: [
      {
        id: 1,
        name: 'João das Neves',
        city: 'Florianópolis - SC',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'Javacript',
            is_main_tech: true
          }
        ]
      },
      {
        id: 3,
        name: 'Vitor Carvalho',
        city: 'Florianópolis - SC',
        start_experience: 2,
        end_experience: 4,
        technologies: [
          {
            name: 'Elixir',
            is_main_tech: true
          }
        ]
      },
      {
        id: 4,
        name: 'Jefferson Almeida',
        city: 'São Paulo - SP',
        start_experience: 1,
        end_experience: 2,
        technologies: [
          {
            name: 'C#',
            is_main_tech: true
          }
        ]
      }
    ]
  })
})
