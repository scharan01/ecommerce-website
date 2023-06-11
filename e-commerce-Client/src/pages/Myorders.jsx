import axios from "axios";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Orderbox from "../components/Orderbox";
import Products from "../components/Products";
import {userrequest} from "../request";

const Container = styled.div`
    
`;

const Wrapper = styled.div`
    min-height : 70vh;
    display : flex;
    justify-content : center;
`;

const Down = styled.h2`
    margin : 30px;
`;

const Heading = styled.h1`
    margin : 30px 0px 30px 30px;
    font-weight : 600;
`;

const Content = styled.div`
    width : 70vw;
    margin-top : 30px;
    display : flex;
    flex-direction: column;
`;

const Myorders = () => {
    const user = useSelector(state=>state.user.currentUser);
    const [orders,setorders] = useState();

    useEffect(()=>{

        const getorder = async () =>{
            const res = await axios.get(`http://localhost:5000/api/orders/find/${user._id}`,{headers : {'token' : `BEARER ${user.accesstoken}`}});
            setorders(res);
        }
        getorder();
    },[])
    
  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Heading>Your Orders</Heading>
        <Wrapper>
            <Content>
                {orders?.data.slice(0).reverse().map((order)=>
                    <Orderbox order={order} />
                )}
            </Content>
        </Wrapper>
        <Down>Checkout other products!</Down>
        <Products/>
        <Footer/>
    </Container>
  )
}

export default Myorders