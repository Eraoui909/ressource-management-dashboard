import axios from 'axios'
import { Proxy } from './config'

export const getAll = async () =>{

  let {data:Pannes} = await axios.get(Proxy+"/maintenance")

  return Pannes
}

export const UpdateCommentaires = async (request) =>{

  let {data:Resource} = await axios.post(Proxy+"/maintenance/envoeyerconstat",request)
  return Resource
}
