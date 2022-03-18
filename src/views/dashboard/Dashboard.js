import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkRoles } from 'src/protectedRoutes/checkRoles'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
const Dashboard = () => {

  const navigate = useNavigate();
  useEffect( ()=>{
    let check = checkRoles(["ROLE_ADMIN"]);
    if(!check){
      navigate("../404", { replace: true });
    }
  })

  return <WidgetsDropdown />
}

export default Dashboard
