const Factory = use('Factory')

Factory.blueprint('App/Models/Candidate', async (faker, i, data) => {
  return {
    name: faker.name(),
    ...data
  }
})
