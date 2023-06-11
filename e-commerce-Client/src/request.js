import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

/*const gettoken = ()=>{

    let TOKEN_user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    let TOKEN = (TOKEN_user) ? JSON.parse(TOKEN_user).currentUser?.accesstoken : "";

    return TOKEN;
}*/


export const publicrequest = axios.create({
    baseURL : BASE_URL,
});

/*export const userrequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : `BEARER ${()=>gettoken}`},
});*/


