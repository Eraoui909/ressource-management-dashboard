import axios from 'axios'
import { string } from 'prop-types'
import { OLD_TEACHER_API_URL, RESOURCES_API_URL, TEACHER_API_URL } from './config'

export const getResourcesForCurrentTeacher = async () => {
  let username = JSON.parse(localStorage.getItem('user'))
  let { data: resources } = await axios.get(
    RESOURCES_API_URL + '/resources/username/' + username.username,
  )

  return resources
}

export const declarerUnePanne = async (panne) => {
  console.log(panne)

  await axios
    .post(RESOURCES_API_URL + '/resources/signalerPanne', panne)
    .then((response) => {
      console.log(response)
      return response
    })
    .catch((error) => {
      return error
    })
}
