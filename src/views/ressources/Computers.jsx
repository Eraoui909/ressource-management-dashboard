import { CForm, CFormInput, CModal, CModalBody, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CToast, CToastBody, CToastClose } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { addComputer, getAll,deleteComputer, getComputer, updateComputer, getAllOwners } from 'src/services/ComputerService';
import { CButton } from '@coreui/react';
import { CFormLabel, CFormSelect } from '@coreui/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAllDepartements, getOwnersByName, getOwnersByDepartement } from './../../services/ComputerService';

const MySwal = withReactContent(Swal)


const Computers = () => {

  const [computers, setComputers]             = useState([])
  const [owners, setOwners]                   = useState([])
  const [departements, setDepartements]       = useState([])
  const [owner, setOwner]                     = useState("")
  const [departement, setDepartement]         = useState("")
  const [visibleLg, setVisibleLg]             = useState(false)
  const [visibleUpdate, setVisibleUpdate]     = useState(false)
  const [_id, setId]                          = useState("")
  // const [idERROR, setIdERROR]                 = useState("")
  const [provider, setProvider]               = useState("")
  const [providerERROR,setProviderERROR]      = useState("")
  const [CPU, setCPU]                         = useState("")
  const [CPUERROR,setCPUERROR]                = useState("")
  const [RAM, setRAM]                         = useState("")
  const [RAMERROR,setRAMERROR]                  = useState("")
  const [marque,setMarque]                    = useState("")
  const [marqueERROR,setMarqueERROR]          = useState("")
  const [hardDisk,setHardDisk]                = useState("")
  const [hardDiskERROR,setHardDiskERROR]      = useState("")
  const [screen, setScreen]                   = useState("")
  const [screenERROR, setScreenERROR]         = useState("")
  const [warranty, setWarranty]               = useState("")
  const [warrantyERROR,setWarrantyERROR]      = useState("")
  const [date, setDate]                       = useState("")
  const [dateERROR, setDateERROR]             = useState("")
  const [affectedTo, setAffectedTo]           = useState("No One")
  const [isDisabled,setIsDisabled]            = useState(true)


  useEffect( ()=>{

    getAll().then(
      (resp) =>{
        // console.log(resp);
        setComputers(resp);
      }
    )

    getAllDepartements().then(
      (resp) =>{
        // console.log(resp);
        setDepartements(resp);
      }
    )


  },[])

  const handleAddComputer = () =>{

    (provider.trim() === "") ? setProviderERROR("provider field is required") : setProviderERROR("");
    (CPU.trim() === "")      ? setCPUERROR("CPU field is required")           : setCPUERROR("");
    (marque.trim() === "")   ? setMarqueERROR("Marque field is required")     : setMarqueERROR("");
    (hardDisk.trim() === "") ? setHardDiskERROR("HardDisk field is required") : setHardDiskERROR("");
    (screen.trim() === "")   ? setScreenERROR("Screen field is required")     : setScreenERROR("");
    (warranty.trim() === "") ? setWarrantyERROR("Warranty field is required") : setWarrantyERROR("");
    (date.trim() === "")     ? setDateERROR("Date field is required")         : setDateERROR("");
    (RAM.trim() === "")      ? setRAMERROR("RAM field is required")           : setRAMERROR("");



    if(provider.trim() !== "" && CPU.trim()!=="" && RAM.trim()!=="" && marque.trim() !== "" && hardDisk.trim() !== "" && screen.trim() !== "" && warranty.trim() !== "" && date.trim() !== ""){

      if(owner !== "" && departement !== ""){
        addComputer({
          "provider" : provider,
          "cpu"      : CPU,
          "ram"      : RAM,
          "marque"   : marque,
          "hardDisk" : hardDisk,
          "screen"   : screen,
          "warrantyPeriod" : warranty,
          "date"     : date,
          "affectedToOwner" : owner,
          "affectedToDepartment" : departement,
        })
      }else if(departement !== ""){
          addComputer({
            "provider" : provider,
            "cpu"      : CPU,
            "ram"      : RAM,
            "marque"   : marque,
            "hardDisk" : hardDisk,
            "screen"   : screen,
            "warrantyPeriod" : warranty,
            "date"     : date,
            "affectedToDepartment" : departement,
          })
      }else{
        addComputer({
          "provider" : provider,
          "cpu"      : CPU,
          "ram"      : RAM,
          "marque"   : marque,
          "hardDisk" : hardDisk,
          "screen"   : screen,
          "warrantyPeriod" : warranty,
          "date"     : date,
        })
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Computer added with success',
        showConfirmButton: false,
        timer: 1500
      })
      getAll().then(
        (resp) =>{
          // console.log(resp);
          setComputers(resp);
        }
      )
      setVisibleLg(!visibleLg)
    }
  }

  const handleUpdate = (id)=>{

    (provider.trim() === "") ? setProviderERROR("provider field is required") : setProviderERROR("");
    (CPU.trim() === "")      ? setCPUERROR("CPU field is required")           : setCPUERROR("");
    (marque.trim() === "")   ? setMarqueERROR("Marque field is required")     : setMarqueERROR("");
    (hardDisk.trim() === "") ? setHardDiskERROR("HardDisk field is required") : setHardDiskERROR("");
    (screen.trim() === "")   ? setScreenERROR("Screen field is required")     : setScreenERROR("");
    (warranty.trim() === "") ? setWarrantyERROR("Warranty field is required") : setWarrantyERROR("");
    (date.trim() === "")     ? setDateERROR("Date field is required")         : setDateERROR("");
    (RAM.trim() === "")      ? setRAMERROR("RAM field is required")           : setRAMERROR("");


    if(provider.trim() !== "" && CPU.trim()!=="" && marque.trim() !== "" && hardDisk.trim() !== "" && screen.trim() !== "" && warranty.trim() !== "" && date.trim() !== ""){

      updateComputer({
        "id"       : _id,
        "provider" : provider,
        "cpu"      : CPU,
        "marque"   : marque,
        "hardDisk" : hardDisk,
        "screen"   : screen,
        "warrantyPeriod" : warranty,
        "date"     : date,
        "affectedTo" : owner,
      })

      setVisibleUpdate(!visibleUpdate)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Computer updated with success',
        showConfirmButton: false,
        timer: 1500
      })
      getAll().then(
        (resp) =>{
          console.log(resp);
          setComputers(resp);
        }
      )
    }
  }

  const showUpdateModal = (id) => {

    setVisibleUpdate(!visibleUpdate)
    let computer = getComputer(id);

    computer.then(
      (resp)=>{
        setId(resp.id)
        setProvider(resp.provider)
        setCPU(resp.cpu)
        setMarque(resp.marque)
        setHardDisk(resp.hardDisk)
        setScreen(resp.screen)
        setWarranty(resp.warrantyPeriod)
        setDate(resp.date)
        setRAM(resp.RAM)
        owners.forEach((item, index)=>{
          if(resp.affectedTo && resp.affectedTo.name === item.name){
            setAffectedTo(index);
          }
        })
      }
    )
  }

  const deleteComp = (id)=> {

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
        deleteComputer(id);
        MySwal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        getAll().then(
          (resp) =>{
            // console.log(resp);
            setComputers(resp);
          }
        )
      }
    })
  }

  const departementSelected = (dep) =>{
    setDepartement(dep)
    if(dep.trim() != ""){
      setIsDisabled(false)
      getOwnersByDepartement(dep).then(
        (resp) =>{
          // console.log(resp);
          setOwners(resp);
        }
      )
    }else{
      setIsDisabled(true)
      setOwner("");
    }
  }


  return (<>


    <div style={{backgroundColor:"#fff",padding:"15px"}}>
      <CButton color="info" onClick={() => setVisibleLg(!visibleLg)} style={{margin:"10px"}}>Add Computer</CButton>

      <CTable bordered>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Provider</CTableHeaderCell>
          <CTableHeaderCell scope="col">CPU</CTableHeaderCell>
          <CTableHeaderCell scope="col">RAM</CTableHeaderCell>
          <CTableHeaderCell scope="col">Marque</CTableHeaderCell>
          <CTableHeaderCell scope="col">Hard Disk</CTableHeaderCell>
          <CTableHeaderCell scope="col">Screen</CTableHeaderCell>
          <CTableHeaderCell scope="col">Warranty</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          <CTableHeaderCell scope="col">Affected To Department</CTableHeaderCell>
          <CTableHeaderCell scope="col">Affected To Owner</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>

        {
          computers.map((t,index) =>{
            return (
              <CTableRow key={index}>
                <CTableDataCell>{t.provider}</CTableDataCell>
                <CTableDataCell>{t.cpu}</CTableDataCell>
                <CTableDataCell>{t.ram}</CTableDataCell>
                <CTableDataCell>{t.marque}</CTableDataCell>
                <CTableDataCell>{t.hardDisk}</CTableDataCell>
                <CTableDataCell>{t.screen}</CTableDataCell>
                <CTableDataCell>{t.warrantyPeriod}</CTableDataCell>
                <CTableDataCell>{t.date}</CTableDataCell>
                <CTableDataCell>{t.affectedToDepartment ? t.affectedToDepartment : "No One"}</CTableDataCell>
                <CTableDataCell>{t.affectedToOwner ? t.affectedToOwner.name : "No One"}</CTableDataCell>
                <CTableDataCell>
                    <CButton color="success" value={t.id} onClick={(e)=> showUpdateModal(e.target.value)}>Modify</CButton>
                    <CButton color="danger" value={t.id} onClick={(e)=> deleteComp(e.target.value)}>Delete</CButton>
                </CTableDataCell>
            </CTableRow>
            )
          })
        }

      </CTableBody>
    </CTable>
    </div>

     {/* Update Computer Modal */}
    <CModal size="lg" visible={visibleUpdate} onClose={() => setVisibleUpdate(false)}>
      <CModalHeader>
        <CModalTitle>Modify Computer</CModalTitle>
      </CModalHeader>
      <CModalBody>

      { providerERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{providerERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { CPUERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{CPUERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { RAMERROR  &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{RAMERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { marqueERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{marqueERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { hardDiskERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{hardDiskERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { screenERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{screenERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { warrantyERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{warrantyERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { dateERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{dateERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }

      <CForm>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Provider</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={provider}
            onChange={(e)=>{ setProvider(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">CPU</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={CPU}
            onChange={(e)=>{ setCPU(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">RAM</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={RAM}
            onChange={(e)=>{ setCPU(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Marque</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={marque}
            onChange={(e)=>{ setMarque(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Hard disk</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={hardDisk}
            onChange={(e)=>{ setHardDisk(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Screen</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={screen}
            onChange={(e)=>{ setScreen(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Warranty Period</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={warranty}
            onChange={(e)=>{ setWarranty(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Date</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={date}
            onChange={(e)=>{ setDate(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormSelect aria-label="Default select example"
            onChange={e => {setOwner(owners[e.target.value]); setAffectedTo(e.target.value);}}
            value={affectedTo}
          >
            <option value="-1">No One</option>
            {
              owners.map((t,index) =>{
                return (
                  <option value={index} key={index}>{t.name}</option>
                )
              })
            }
          </CFormSelect>
        </div>
      </CForm>

      <CButton color="success"  onClick={handleUpdate} style={{margin:"10px"}}>Update</CButton>
      <CButton color="danger" onClick={() => setVisibleUpdate(!visibleUpdate)} style={{margin:"10px"}}>Cancel</CButton>


      </CModalBody>
    </CModal>

    <CModal size="lg" visible={visibleLg} onClose={() => setVisibleLg(false)}>
      <CModalHeader>
        <CModalTitle>Add new Computer</CModalTitle>
      </CModalHeader>
      <CModalBody>

      { providerERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{providerERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { CPUERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{CPUERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { RAMERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{RAMERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { marqueERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{marqueERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { hardDiskERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{hardDiskERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { screenERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{screenERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { warrantyERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{warrantyERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }
      { dateERROR &&
      <CToast autohide={false} visible={true} color="danger" className="text-white align-items-center">
        <div className="d-flex">
          <CToastBody>{dateERROR}</CToastBody>
         <CToastClose className="me-2 m-auto" white />
        </div>
      </CToast>
      }

      <CForm>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Provider</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={provider}
            onChange={(e)=>{ setProvider(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">CPU</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={CPU}
            onChange={(e)=>{ setCPU(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">RAM</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={RAM}
            onChange={(e)=>{ setRAM(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Marque</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={marque}
            onChange={(e)=>{ setMarque(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Hard disk</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={hardDisk}
            onChange={(e)=>{ setHardDisk(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Screen</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={screen}
            onChange={(e)=>{ setScreen(e.target.value)}}
          />
        </div>

        <div className="mb-3" style={{border:"1px solid",padding:"15px"}}>

          <h4>Affectation</h4>

          <div className="mb-2">
          <CFormLabel htmlFor="exampleFormControlInput1">Warranty Period</CFormLabel>
          <CFormInput type="text" id="exampleFormControlInput1"
            value={warranty}
            onChange={(e)=>{ setWarranty(e.target.value)}}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="exampleFormControlInput1">Date</CFormLabel>
          <CFormInput type="date" id="exampleFormControlInput1"
            value={date}
            onChange={(e)=>{ setDate(e.target.value)}}
          />
        </div>
        <div className="mb-3">
        <CFormLabel htmlFor="exampleFormControlInput1">Affected to</CFormLabel>
        <tr />
        <CFormLabel htmlFor="exampleFormControlInput1">Departement</CFormLabel>
        <CFormSelect aria-label="Default select example"
            onChange={e => {departementSelected(e.target.value)}}
          >
            <option value="">No One</option>
            {
              departements.map((t,index) =>{
                return (
                  <option value={t.name} key={index}>{t.name}</option>
                )
              })
            }
          </CFormSelect>
          <tr />
          <CFormLabel htmlFor="exampleFormControlInput1">Member</CFormLabel>
          <CFormSelect aria-label="Default select example"
            onChange={e => {setOwner(owners[e.target.value])}}
            disabled={isDisabled}
          >
            <option value="">No One</option>
            {
              owners.map((t,index) =>{
                return (
                  <option value={index} key={index}>{t.name}</option>
                )
              })
            }
          </CFormSelect>
        </div>

        </div>

      </CForm>

      <CButton color="success" onClick={handleAddComputer} style={{margin:"10px"}}>Add</CButton>
      <CButton color="danger" onClick={() => setVisibleLg(!visibleLg)} style={{margin:"10px"}}>Cancel</CButton>


      </CModalBody>
    </CModal>
  </>)
}

export default Computers;
