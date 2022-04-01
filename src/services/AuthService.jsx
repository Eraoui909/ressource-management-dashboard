import axios from "axios";
import {API_URL} from "../services/config";
import {useNavigate} from "react-router-dom";

export async function login(username, password){

    let {data:jwt} = await axios.post(API_URL+"/auth/login",{username,password});
    localStorage.setItem("token",jwt.token);
    localStorage.setItem("username",jwt.username);
    localStorage.setItem("email",jwt.email);
    localStorage.setItem("roles",jwt.roles);
    return jwt;
}

export function logout(){

  localStorage.removeItem("token");
  localStorage.removeItem("roles");
  localStorage.removeItem("email");
  localStorage.removeItem("username");

}
