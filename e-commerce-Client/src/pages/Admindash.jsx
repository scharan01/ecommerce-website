import styled from "styled-components";
import { DoneOutlined } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/userredux';
import { useState } from "react";
import Admindisplay from "../components/Admindisplay";

const Container = styled.div`
    background-color : light-gray;
    display : flex;
`;


const Sidecontainer = styled.div`
    background-color : #131A22;
    width : 20vw;
    height : 100vh;
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    padding : 0px 10px;
    position : fixed;
`;

const Logo = styled.h2`
    font-weight: bold;
    cursor : pointer;
    color : white;
`;

const Logocont = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
`;

const Infocont = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-around;
    color : white;
    
`;

const Infoitem = styled.h2`
    font-size : 20px;
    font-weight : 500;
    padding : 15px;
    cursor : pointer;
    margin : 4px;

    &:hover{
        background-color : #37475A;
        border-radius : 10px;
    }

`;

const Rightcontainer = styled.div`
    position : relative;
    left : 25%;
`;

const Admindash = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sel,setsel] = useState("");

  return (
    <Container>
        <Sidecontainer>
            <Logocont>
                <Logo onClick={()=>navigate("/",{replace:true})}><DoneOutlined style={{fontSize : 30}}/>NAIKE</Logo> 
            </Logocont>
                <Infocont>
                <Infoitem onClick={()=>navigate("/",{replace:true})}>Home</Infoitem>
                <Infoitem onClick={()=>setsel("orders")}>Orders</Infoitem>
                <Infoitem onClick={()=>setsel("products")}>Add Products</Infoitem>
                <Infoitem onClick={()=>setsel("productlist")}>View/Modify Products</Infoitem>
                <Infoitem onClick={()=>setsel("categories")}>Categories</Infoitem>
                <Infoitem onClick={()=>setsel("slider")}>Slider</Infoitem>
                <Infoitem onClick={()=>setsel("userslist")}>Customer List</Infoitem>
                <Infoitem style={{"fontWeight":"800"}} onClick={()=>{dispatch(logout());navigate("/",{replace:true})}}>LOGOUT</Infoitem>
            </Infocont>
        </Sidecontainer>
        <Rightcontainer>
            <Admindisplay page={sel} set={setsel}/>
        </Rightcontainer>
    </Container>
  )
}

export default Admindash