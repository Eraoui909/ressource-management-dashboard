import axios from "axios";
import { RESOURCES_API_URL } from "./config";



export const getAll = async () =>{

    let {data:Computers} = await axios.get(RESOURCES_API_URL+"/computers/")

    return Computers;
}

export const addComputer = async (computer) =>{

  await axios.post(RESOURCES_API_URL + "/computers/add", computer).then(
    (response) =>{
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}

export const updateComputer = async (computer) =>{

  console.log(computer)
  await axios.post(RESOURCES_API_URL + "/computers/update", computer).then(
    (response) =>{
      return response;
    }
  ).catch(
    (error) =>{
      return error;
    }
  )
}


export const deleteComputer = async (id) =>{

  await axios.delete(RESOURCES_API_URL + "/computers/delete/" + id);
  setTimeout(()=>{
    window.location.reload()
  },500);
}

export const getComputer = async (id) =>{
  let {data:computer} = await axios.get(RESOURCES_API_URL + "/computers/" + id)

  return computer;
}
