import { publicrequest,userrequest } from "../request";
import { loginfailure, loginStart, loginSuccess } from "./userredux";
import { addProduct,clearstate } from "./cartRedux";
import axios from "axios";

export const login = async (dispatch,user) =>{
    dispatch(loginStart());
    try{
        const res = await publicrequest.post("auth/login",user);
        dispatch(loginSuccess(res.data));
        dispatch(clearstate());
        const res1 = await axios.get(`http://localhost:5000/api/cart/find/${res.data._id}`,{headers : {'token' : `BEARER ${user.accesstoken}`}});
        res1.data.products?.map((product)=>dispatch(addProduct(product)));
    }catch(err){
        dispatch(loginfailure());
    }
}
