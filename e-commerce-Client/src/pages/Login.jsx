import styled from "styled-components"
import { login } from "../Redux/apicall";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DoneOutlined } from "@material-ui/icons";
import { loginStart,loginSuccess,loginfailure } from "../Redux/userredux";
import axios from "axios";
import { addProduct,clearstate } from "../Redux/cartRedux";
import { publicrequest } from "../request";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background : -webkit-linear-gradient(top left, #a802e0, #f7676a);
    display : flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    margin: 20px 0px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    flex:1;
    width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 15px;
    border-radius : 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    padding: 15px 20px;
    background-color: black;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
    color : red;
    margin-bottom : 10px;
`;

const TopText = styled.h1`
    position : absolute;
    top : 20px;
    left : 20px;
    color : white;
`;

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching,error} = useSelector(state=>state.user);
    const [err,seterr] = useState();
    const user = useSelector(state=>state.user.currentUser);


    /*const login = async (dispatch,user) =>{
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
    }*/
    
    const handleLogin = (e) =>{
        e.preventDefault();

        const validate = () => {
            if(email == "" || password== ""){
                seterr("Email/Password cannot be empty!");
                return false;
            }else{
                return true;
            }
        }

        if(validate()){
            dispatch(loginStart());
            const login = async ()=>{
                try{
                    const res = await publicrequest.post("auth/login",{email,password});
                    dispatch(loginSuccess(res.data));
                    dispatch(clearstate());
                    const res1 = await axios.get(`http://localhost:5000/api/cart/find/${res.data._id}`,{headers : {'token' : `BEARER ${res.data.accesstoken}`}});
                    res1.data.products?.map((product)=>dispatch(addProduct(product)));
                }catch(err){
                    dispatch(loginfailure());
                }
            }
        login();
        if(error) seterr("username/password incorrect!");
        }
    }

  return (
    <Container>
        <TopText><DoneOutlined style={{fontSize : 30}}/>NAIKE</TopText>
        <Wrapper>
            <Title>LOGIN</Title>
            <Form>
                <Input placeholder="Email" type="email" onChange={(e)=>setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Agreement>
                Dont have an Account click <Link to="/register" style={{ color: "black", textDecoration: "none" }}><b>HERE</b></Link> to Sign Up!
                </Agreement>
                <Error>{err}</Error>
                <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login