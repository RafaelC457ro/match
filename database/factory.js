const Factory = use('Factory')

Factory.blueprint('App/Models/Candidate', async (faker) => {
  return {
    name: faker.name()
  }
})
