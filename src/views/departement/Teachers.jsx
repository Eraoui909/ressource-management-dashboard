import { CForm, CFormInput, CModal, CModalBody, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CToast, CToastBody, CToastClose } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { addNewTeacher, getTeachers,deleteTeacherService, getTeacher, updateTeacher } from 'src/services/TeachersService';
import { CButton } from '@coreui/react';
import { CFormLabel } from '@coreui/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Teachers = () => {

  const [teachers,setTeachers]                = useState([])
  const [visibleLg, setVisibleLg]             = useState(false)
  const [visibleUpdate, setVisibleUpdate]     = useState(false)
  const [_id,setId]                            = useState("")
  const [idERROR,setIdERROR]                  = useState("")
  const [name,setName]                        = useState("")
  const [nameERROR,setNameERROR]              = useState("")
  const [email,setEmail]                      = useState("")
  const [emailERROR,setEmailERROR]            = useState("")
  const [phone,setPhone]                      = useState("")
  const [phoneERROR,setPhoneERROR]            = useState("")
  const [address,setAddress]                  = useState("")
  const [addressERROR,setAddressERROR]        = useState("")


  useEffect( ()=>{

    getTeachers().then(
        (resp) =>{
          setTeachers(resp);
        }
      )
  },[])

  const handleAddTeacher = () =>{

    (name.trim() === "")?setNameERROR("name field is required"):setNameERROR("");
    (email.trim() === "")?setEmailERROR("email field is required"):setEmailERROR("");
    (phone.trim() === "")?setPhoneERROR("phone field is required"):setPhoneERROR("");
    (address.trim() === "")?setAddressERROR("address field is required"):setAddressERROR("");

    if(name.trim() !== "" && email.trim()!==""&&phone.trim() !== ""&&address.trim() !== ""){

      addNewTeacher({name,email,phone,address})
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Teacher added with success',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        window.location.reload()
      },500);
    }
  }

  const handleUpdate = (id)=>{

    (name.trim() === "")?setNameERROR("name field is required"):setNameERROR("");
    (email.trim() === "")?setEmailERROR("email field is required"):setEmailERROR("");
    (phone.trim() === "")?setPhoneERROR("phone field is required"):setPhoneERROR("");
    (address.trim() === "")?setAddressERROR("address field is required"):setAddressERROR("");

    if(_id.trim() !== "" && name.trim() !== "" && email.trim()!==""&&phone.trim() !== ""&&address.trim() !== ""){

      updateTeacher({"id":_id,name,email,phone,address})
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Teacher updated with success',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        window.location.reload()
      },500);
    }
  }

  const showUpdateModal = (id)=>{
    setVisibleUpdate(!visibleUpdate)
    let teacher = getTeacher(id);
    teacher.then(
      (resp)=>{
        setId(resp.id)
        setName(resp.name)
        setEmail(resp.email)
        setPhone(resp.phone)
        setAddress(resp.address)
      }
    )
  }

  const deleteTeacher = (id)=> {

    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeacherService(id);
        MySwal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }


  return (<>


    <div style={{backgroundColor:"#fff",padding:"15px"}}>

    <CButton color="info" onClick={() => setVisibleLg(!visibleLg)} style={{margin:"10px"}}>Add Teacher</CButton>

      <CTable bordered>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Nom</CTableHeaderCell>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
          <CTableHeaderCell scope="col">Address</CTableHeaderCell>
          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>

        {
          teachers.map((t,index) =>{
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{t.id}</CTableHeaderCell>
                <CTableDataCell>{t.name}</CTableDataCell>
                <CTableDataCell>{t.email}</CTableDataCell>
                <CTableDataCell>{t.phone}</CTableDataCell>
                <CTableDataCell>{t.address}</CTableDataCell>
                <CTableDataCell>
                    <CButton color="success" value={t.id} onClick={(e)=> showUpdateModal(e.target.value)}>Modify</CButton>
                    <CButton color="danger" value={t.id} onClick={(e)=> deleteTeacher(e.target.value)}>Delete</CButton>
                </CTableDataCell>
            </CTableRow>
            )
          })
        }

      </CTableBody>
    </CTable>
    </div>

     {/* Update Teacher Modal */}
    <CModal size="lg" visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
      <CModalHeader>
        <CModalTitle>Modify Teacher</CModalTitle>
      </CModalHeader>
      <CModalBody>

      { nameERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{nameERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { emailERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{emailERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { phoneERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{phoneERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { addressERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{addressERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }

      <CForm>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={name}
            onChange={(e)=>{ setName(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
          <CFormInput type="email" id="exampleFormControlInput1"
            value={email}
            onChange={(e)=>{ setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={phone}
            onChange={(e)=>{ setPhone(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Address</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={address}
            onChange={(e)=>{ setAddress(e.target.value)}}
          />
        </div>
      </CForm>

      <CButton color="success"  onClick={handleUpdate} style={{margin:"10px"}}>Update</CButton>
      <CButton color="danger" onClick={() => setVisibleUpdate(!visibleUpdate)} style={{margin:"10px"}}>Cancel</CButton>


      </CModalBody>
    </CModal>

    <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
      <CModalHeader>
        <CModalTitle>Add new Teacher</CModalTitle>
      </CModalHeader>
      <CModalBody>

      { nameERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{nameERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { emailERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{emailERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { phoneERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{phoneERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { addressERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{addressERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }

      <CForm>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={name}
            onChange={(e)=>{ setName(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
          <CFormInput type="email" id="exampleFormControlInput1"
            value={email}
            onChange={(e)=>{ setEmail(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={phone}
            onChange={(e)=>{ setPhone(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Address</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={address}
            onChange={(e)=>{ setAddress(e.target.value)}}
          />
        </div>
      </CForm>

      <CButton color="success" onClick={handleAddTeacher} style={{margin:"10px"}}>Add</CButton>
      <CButton color="danger" onClick={() => setVisibleLg(!visibleLg)} style={{margin:"10px"}}>Cancel</CButton>


      </CModalBody>
    </CModal>
  </>)
}

export default Teachers;
