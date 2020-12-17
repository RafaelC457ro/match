import axios from 'axios'

export const getCandidates = async (filter) => {
  console.log(filter)
  const { cities, experience, technologies } = filter
  const city = cities ? `city[]=${cities.join('&city[]=')}` : ''
  const techs = technologies ? `&technologies[]=${cities.join(',')}` : ''

  let exp = ''
  if (experience) {
    exp = experience.endExperience
      ? `&betweenStart=${experience.startExperience}&betweenEnd=${experience.endExperience}`
      : `&greaterThen=${experience.startExperience}`
  }

  const response = await axios.get(`/api/v1/candidates?${city}${techs}${exp}`)
  return response.data
}
