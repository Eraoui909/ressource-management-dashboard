import axios from "axios";
import { CHEFDEP_API_URL } from "./config";



export const get = async () =>{

    let {data:teachers} = await axios.get(CHEFDEP_API_URL+"/teachers/")

    return teachers;
}

export const addNewTeacher = async (teacher) =>{

  await axios.post(CHEFDEP_API_URL+"/teachers/add",teacher).then(
    (response) =>{
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}

export const updateTeacher = async (teacher) =>{

  console.log(teacher)
  await axios.post(CHEFDEP_API_URL+"/teachers/update",teacher).then(
    (response) =>{
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}


export const deleteTeacherService = async (id) =>{

  await axios.delete(CHEFDEP_API_URL+"/teachers/"+id);
  setTimeout(()=>{
    window.location.reload()
  },500);
}

export const getTeacher = async (id) =>{
  let {data:teacher} = await axios.get(CHEFDEP_API_URL+"/teachers/"+id)

  return teacher;
}
