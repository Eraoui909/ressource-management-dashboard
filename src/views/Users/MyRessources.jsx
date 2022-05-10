import { CAlert, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CToast, CToastBody, CToastClose, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import { CFormLabel } from '@coreui/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getResourcesForCurrentTeacher, declarerUnePanne } from './../../services/MyRessourcesService';

const MySwal = withReactContent(Swal)


const MyRessources = () => {

  const [ressources,setRessources] = useState([])
  const [visibleLgPanneModal, setVisibleLgPanneModal] = useState(false)

  const [dateAppartition, setDateAppartition] = useState("")
  const [id, setId] = useState("")
  const [explicationPanne, setExplicationPanne] = useState("")
  const [frequencePanne, setFrequencePanne] = useState("")
  const [ordrePanne, setOrdrePanne] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)






  useEffect( ()=>{

    getResourcesForCurrentTeacher().then(
        (resp) =>{
          console.log(resp)
          setRessources(resp);
        }
      )
  },[])




  const signalerPanne = () =>{

    let username = JSON.parse(localStorage.getItem("user")).username;

    declarerUnePanne({
        id,
        dateAppartition,
        explicationPanne,
        frequencePanne,
        ordrePanne,
        declaredBy:username
    })
  }


  return (<>

<div style={{backgroundColor:"#fff",padding:"15px"}}>

<CTable bordered>
<CTableHead>
  <CTableRow>
    <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
    <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
    <CTableHeaderCell scope="col">période de garantie</CTableHeaderCell>
    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
  </CTableRow>
</CTableHead>
<CTableBody>

  {
    ressources.map((t,index) =>{
      return (
        <CTableRow key={index}>
          <CTableDataCell>{t.marque}</CTableDataCell>
          <CTableDataCell>{t.provider}</CTableDataCell>
          <CTableDataCell>{t.date}</CTableDataCell>
          <CTableDataCell>{t.warrantyPeriod}</CTableDataCell>

          <CTableDataCell>
            {
              console.log(t.panne)
            }

            { (t.panne == null) && 
              <CButton className='btn btn-warning' onClick={() => 
                {setVisibleLgPanneModal(!visibleLgPanneModal)
                setId(t.id)}
                } >signaler une panne</CButton>
            }

            {(t.panne != null) && 
              <CButton className='btn btn-succes' onClick={() => 
                {setVisibleLgPanneModal(!visibleLgPanneModal)
                setId(t.id)}
                } >suiver la panne</CButton>
            }

          </CTableDataCell>
      </CTableRow>
      )
    })
  }


  {/* signaler la panne -- MODAL */}

  <CModal size="lg" visible={visibleLgPanneModal} onClose={() => setVisibleLgPanneModal(false)}>
      <CModalHeader>
        <CModalTitle>Declarer Une Panne</CModalTitle>
      </CModalHeader>
      <CModalBody>

      <CForm>

        <CFormLabel >date d’apparition</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type='date' onChange={ (e)=> setDateAppartition(e.target.value)} />
        </CInputGroup>

        <CFormLabel > explication de la panne</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormTextarea onChange={ (e)=> setExplicationPanne(e.target.value)} ></CFormTextarea>
        </CInputGroup>

        <CFormLabel >fréquence</CFormLabel>
        <CInputGroup className="mb-3">

            <CFormSelect onChange={ (e)=> setFrequencePanne(e.target.value)} >
              <option value="" ></option>
              <option value="rare" >rare</option>
              <option value="fréquente ">fréquente</option>
              <option value="permanente">permanente</option>
            </CFormSelect>
        </CInputGroup>

        <CFormLabel >ordre de panne</CFormLabel>
        <CInputGroup className="mb-3">

            <CFormSelect onChange={ (e)=> setOrdrePanne(e.target.value)} >
              <option value="" ></option>
              <option value="logiciel">logiciel</option>
              <option value="materiel ">materiel</option>
            </CFormSelect>
        </CInputGroup>

        <CButton className='btn btn-warning' onClick={signalerPanne} >signaler</CButton>

      </CForm>

      </CModalBody>
    </CModal>

</CTableBody>
</CTable>
</div>

  </>)
}

export default MyRessources;
