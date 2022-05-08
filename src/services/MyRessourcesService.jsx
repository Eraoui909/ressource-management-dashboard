import axios from "axios";
import { string } from "prop-types";
import { RESOURCES_API_URL } from "./config";


export const getResourcesForCurrentTeacher = async () =>{


  let username = JSON.parse(localStorage.getItem("user"))
  let {data:resources} = await axios.get(RESOURCES_API_URL+"/computers/resources/teacher/"+username.username)


  return resources;
}
