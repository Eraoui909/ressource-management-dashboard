import axios from 'axios'
import { CHEFDEP_API_URL } from './config'

export const getTeachers = async (departement) => {
  let { data: teachers } = await axios.get(
    CHEFDEP_API_URL + '/chefDepartement/teachers/' + departement,
  )

  return teachers
}

export const updateChefdep = async (chefdepID) => {
  console.log(chefdepID)
  await axios
    .post(CHEFDEP_API_URL + '/chefDepartement/update', chefdepID)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}
