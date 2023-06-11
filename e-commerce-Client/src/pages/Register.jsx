import {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { publicrequest } from "../request";
import { DoneOutlined } from "@material-ui/icons";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background : -webkit-linear-gradient(top left, #a802e0, #f7676a);
    display : flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 50%;
    padding: 30px;
    background-color: white;
    border-radius: 10px;
`;

const Title = styled.h1`
    margin: 0px 10px 20px 10px;
    font-size: 24px;
    font-weight: 300;
    text-align: left;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
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
    margin-left : 30%;
    margin-top : 20px;
`;

const TopText = styled.h1`
    position : absolute;
    top : 20px;
    left : 20px;
    color : white;
`;

const Error = styled.h3`
    color : red;
    font-weight : 400;
    
`;

const Register = () => {
    const [data,setdata] = useState({});
    const navigate = useNavigate();
    const [err,seterr] = useState();

    const handlereg = (e) => {
        e.preventDefault();

        const validate = () =>{
            if(Object.keys(data).length <6 || data.fname === "" ||data.lname === "" ||data.phone === "" ||data.email === "" ||data.password === "" ||data.cpassword === "" ){
                seterr("Fields cannot be empty!");
                return false;
            }else if(data.password !== data.cpassword){
                seterr("passwords do not match");
                return false;
            }else{
                return true;
            }
            
        }

        const reg = async () => {

            if(validate()){
                try{
                    
                    const res = await publicrequest.post("auth/register",{"email" : data.email,"password" : data.password});
                    if(res.status === 201) seterr(res.data);
                    else navigate("/login",{replace:true});
                }catch(err){
                    seterr("something went wrong!")
                }
            } 
        }
        reg();
    }

    const handlechange = (e) =>{
        setdata(prev=>{
            return {...prev,[e.target.name] : e.target.value};
        });
    }

    return (
      <Container>
        <TopText><DoneOutlined style={{fontSize : 30}}/>NAIKE</TopText>
          <Wrapper>
              <Title>Create an Account!</Title>
              <Form>
                  <Input name="fname" onChange={handlechange} placeholder="First Name"/>
                  <Input name="lname" onChange={handlechange} placeholder="Last Name"/>
                  <Input name="phone" onChange={handlechange} placeholder="Phone Number"/>
                  <Input name="email" onChange={handlechange} placeholder="Email"/>
                  <Input type="password" name="password" onChange={handlechange} placeholder="Password"/>
                  <Input type="password" name="cpassword" onChange={handlechange} placeholder="Confirm Password"/>
                  <Agreement>
                  By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
                  </Agreement>
                  <Error>{err}</Error>
                  <Button onClick={handlereg}>REGISTER</Button>
              </Form>
          </Wrapper>
      </Container>
    )
  }
  
  export default Register
