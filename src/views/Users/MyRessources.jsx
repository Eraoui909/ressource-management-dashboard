import { CAlert, CForm, CFormInput, CModal, CModalBody, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CToast, CToastBody, CToastClose } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { CButton } from '@coreui/react';
import { CFormLabel } from '@coreui/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const MyRessources = () => {

  const [ressources,setRessources] = useState([])


  // useEffect( ()=>{

  //   // getTeachers("info").then(
  //   //     (resp) =>{
  //   //       setTeachers(resp);
  //   //     }
  //   //   )
  // },[])





  return (<>

<div style={{backgroundColor:"#fff",padding:"15px"}}>

<CTable bordered>
<CTableHead>
  <CTableRow>
    <CTableHeaderCell scope="col">#</CTableHeaderCell>
    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
    <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
    <CTableHeaderCell scope="col">Details</CTableHeaderCell>
    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
    <CTableHeaderCell scope="col">Departement</CTableHeaderCell>
  </CTableRow>
</CTableHead>
<CTableBody>

  {
    ressources.map((t,index) =>{
      return (
        <CTableRow key={index}>
          <CTableHeaderCell scope="row">{t.id}</CTableHeaderCell>
          <CTableDataCell>{t.name}</CTableDataCell>
          <CTableDataCell>{t.email}</CTableDataCell>
          <CTableDataCell>{t.phone}</CTableDataCell>
          <CTableDataCell>

            <CButton className='btn btn-warning' >signaler une panne</CButton>

          </CTableDataCell>
      </CTableRow>
      )
    })
  }

</CTableBody>
</CTable>
</div>

  </>)
}

export default MyRessources;
