import axios from 'axios'
import { RESOURCES_API_URL } from './config'

export const getOffers = async () => {
  let { data: offers } = await axios.get(RESOURCES_API_URL+'/offer/')

  return offers
}

export const getDemands = async () => {
  let { data: demands } = await axios.get(RESOURCES_API_URL+'/offer/demands')

  return demands
}

export const AddOffer = async (offer) => {
  await axios.post(RESOURCES_API_URL+'/offer/addtolist',offer)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}

export const deleteProvider = async (value) => {
  await axios.get(RESOURCES_API_URL+'/offre/Providers/delete/'+value)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error
  })
}
