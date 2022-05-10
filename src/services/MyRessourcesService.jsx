import axios from "axios";
import { string } from "prop-types";
import { OLD_TEACHER_API_URL, RESOURCES_API_URL, TEACHER_API_URL } from "./config";


export const getResourcesForCurrentTeacher = async () =>{


  let username = JSON.parse(localStorage.getItem("user"))
  let {data:resources} = await axios.get(RESOURCES_API_URL+"/computers/resources/teacher/"+username.username)


  return resources;
}

export const declarerUnePanne = async (panne) =>{


  await axios.post(OLD_TEACHER_API_URL+"/teachers/signalerPanne",panne).then(
    (response) =>{
      console.log(response)
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}
