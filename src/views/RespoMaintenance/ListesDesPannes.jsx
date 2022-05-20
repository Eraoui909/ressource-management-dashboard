import {
  CAlert,
  CForm,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CToast,
  CToastBody,
  CToastClose,
  CFormSelect,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { CButton } from '@coreui/react'
import { CFormLabel } from '@coreui/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAll, UpdateCommentaires } from './../../services/RespoMaintenanceService'

const MySwal = withReactContent(Swal)

const ListesDesPannes = () => {
  const [ressources, setRessources] = useState([])
  const [visibleLgPanneModal, setVisibleLgPanneModal] = useState(false)

  const [dateAppartition, setDateAppartition] = useState('')
  const [id, setId] = useState('')
  const [explicationPanne, setExplicationPanne] = useState('')
  const [frequencePanne, setFrequencePanne] = useState('')
  const [ordrePanne, setOrdrePanne] = useState('')
  const [Etats, setEtats] = useState('')
  const [Commentaire, setCommentaire] = useState('')

  useEffect(() => {
    var test = getAll()
    test.then((resp)=> {
      setRessources(resp)
    })
  }, [])

  const HandleEnvoyer = () =>{
      UpdateCommentaires({
          id:id,
          commentaire:Commentaire
      })
  }


  // const signalerPanne = () => {
  //   let username = JSON.parse(localStorage.getItem('user')).username

  //   declarerUnePanne({
  //     "id":id,
  //     "dateAppartition":dateAppartition,
  //     "explicationPanne":explicationPanne,
  //     "frequencePanne":frequencePanne,
  //     "ordrePanne":ordrePanne,
  //     "declaredBy": username,
  //   })
  // }

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '15px' }}>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
              <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">période de garantie</CTableHeaderCell>
              <CTableHeaderCell scope="col">Envoyer</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {ressources.map((t, index) => {
              return (
                  t.panne != null &&
                  <CTableRow key={index}>
                  <CTableDataCell>{t.marque}</CTableDataCell>
                  <CTableDataCell>{t.provider}</CTableDataCell>
                  <CTableDataCell>{t.date}</CTableDataCell>
                  <CTableDataCell>{t.warrantyPeriod}</CTableDataCell>

                  <CTableDataCell>
                    {t.panne != null && (
                      <CButton
                        className="btn btn-success"
                        onClick={() => {
                          setVisibleLgPanneModal(!visibleLgPanneModal)
                          setId(t.id)
                          setDateAppartition(t.panne.dateAppartition)
                          setExplicationPanne(t.panne.explicationPanne)
                          setFrequencePanne(t.panne.frequencePanne)
                          setOrdrePanne(t.panne.ordrePanne)
                          setEtats(t.panne.etats)
                        }}
                      >
                        Envoyer Constat
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}

            {/* Envoyer COnstat Modal */}
            <CModal
              size="lg"
              visible={visibleLgPanneModal}
              onClose={() => setVisibleLgPanneModal(false)}
            >
              <CModalHeader>
                <CModalTitle>Suiver la Panne</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">date d’apparition</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-5 m-1">{dateAppartition}</CFormLabel>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1"> explication de la panne</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{explicationPanne}</CFormLabel>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">fréquence</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{frequencePanne}</CFormLabel>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">ordre de panne</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>

                    <CFormLabel className="col-5 m-1">{ordrePanne}</CFormLabel>
                  </CInputGroup>
                  {
                    console.log(Etats)                 }

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-5 m-1">Etats</CFormLabel>
                    <CFormLabel className="col-1 m-1">:</CFormLabel>
                    <CFormLabel className="col-5 m-1 text-warning">{Etats}</CFormLabel>
                  </CInputGroup>

                  <CFormLabel>Commentaire</CFormLabel>
                  <CInputGroup className="mb-3">
                    <CFormTextarea
                      value={Commentaire}
                      onChange={(e) => setCommentaire(e.target.value)}
                    ></CFormTextarea>
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CFormLabel className="col-9 m-1"></CFormLabel>
                    <CButton className="btn btn-lg" onClick={HandleEnvoyer}>
                      Envoyer
                    </CButton>
                  </CInputGroup>
                </CForm>
              </CModalBody>
            </CModal>
          </CTableBody>
        </CTable>
      </div>
    </>
  )
}

export default ListesDesPannes
