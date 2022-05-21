import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CBadge,

} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  getOffers
} from '../../services/OfferService'

const MySwal = withReactContent(Swal)

const AllOffers = () => {

  const [requests, setRequests] = useState([])

  useEffect(() => {
    getOffers().then((resp) => {
      console.log(resp)
      setRequests(resp)
    })
  }, [])


  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CRow>
          {requests.map((request, index) => {
            if (request.speed == null) {
              return (
                <CCol key={index} sm={6} className="mb-4">
                  <CCard>
                    <CCardBody>
                      <CCardTitle>{request.title}</CCardTitle>
                      <CCardTitle>
                        <CBadge color="info" className="ms-2">
                          {request.status}
                        </CBadge>
                      </CCardTitle>
                      <hr />
                      <CCardTitle>
                        <p>Description:</p>
                      </CCardTitle>
                      <p>{request.description}</p>
                      <CCardText>
                        {
                          request.resources.map((resource, i) => {
                            return (
                              <div key={i}>
                                <CCardTitle>
                                  <p>Ressource {i + 1}</p>
                                </CCardTitle>
                                <div className='px-4'>
                                  {resource.speed && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resource : </span> Printer</p>)}
                                  {(resource.cpu != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resource : </span> Computer</p>)}
                                  <p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Marque : </span> {resource.marque}</p>
                                  {(resource.cpu != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>CPU : </span> {resource.cpu}</p>)}
                                  {resource.hardDisk && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Hard Disk : </span> {resource.hardDisk}</p>)}
                                  {resource.ram && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>RAM : </span> {resource.ram}</p>)}
                                  {(resource.screen != null) && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Screen : </span> {resource.screen}</p>)}
                                  {resource.speed && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Speed : </span> {resource.speed}</p>)}
                                  {resource.resolution && (<p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Resolution : </span> {resource.resolution}</p>)}
                                  <p><span className='font-weight-bold' style={{ fontWeight: "bold", minWidth: "100px", display: "inline-block" }}>Qte : </span> {resource.qte}</p>
                                </div>
                                <p>{"}"}</p>
                              </div>
                            )
                          })
                        }
                        <hr />
                        <p>{request.date}</p>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              )
            }
          }
          )}
        </CRow>

      </div>
    </>
  )
}

export default AllOffers
