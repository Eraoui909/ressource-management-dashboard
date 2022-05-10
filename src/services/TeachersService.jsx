import axios from 'axios'
import { TEACHER_API_URL } from './config'

export const getTeachers = async () => {
  let { data: teachers } = await axios.get(TEACHER_API_URL + '/teachers/')

  return teachers
}

export const addNewTeacher = async (teacher) => {
  await axios
    .post(TEACHER_API_URL + '/teachers/add', teacher)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const updateTeacher = async (teacher) => {
  await axios
    .post(TEACHER_API_URL + '/teachers/update', teacher)
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

export const deleteTeacherService = async (id) => {
  await axios.delete(TEACHER_API_URL + '/teachers/' + id)
  setTimeout(() => {
    window.location.reload()
  }, 500)
}

export const getTeacher = async (id) => {
  let { data: teacher } = await axios.get(TEACHER_API_URL + '/teachers/' + id)

  return teacher
}
