import styled from "styled-components";
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {publicrequest,userrequest} from "../request";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PowerInputSharp, SettingsPowerRounded } from "@material-ui/icons";
import axios from "axios";


const Container = styled.div`

`;

const Wrapper = styled.div`
    margin : 10px;
    display : flex;
    position : relative;
`;

const Left = styled.div`
    flex : 1;
    border : 2px solid lightgray;
    border-radius : 10px;
`;

const Right = styled.div`
    flex: 2;
    border : 2px solid lightgray;
    border-radius : 10px;
    margin-left : 20px;
`;

const TitleContainer = styled.div`
    margin : 20px;
`;

const Title = styled.h1``;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border : 1px solid black;
    border-radius : 10px;
    margin : 10px;
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Details = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content : space-between;
`;

const ProductName = styled.span`
    margin : 3px;
`;

const ProductSize = styled.span`
    margin : 3px;
`;

const ProductColour = styled.div`
    width: 15px;
    height: 15px;
    border-radius : 50%;
    background-color : ${props => props.colour};
    display : inline-block;

`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content : center;
    margin-bottom : 10px;
`;

const ProductAmount= styled.div`
    font-size: 15px;
    margin: 3px;
`;

const ProductPrice = styled.div`
    font-size: 15px;
    font-weight: 300;
`;

const Summary = styled.div`
    margin : 10px;
    border : 1px solid black;
    padding: 20px;
    border-radius: 10px;
`;

const SummaryTitle = styled.h3`
    font-weight: 600;
    margin-bottom : 20px;
`;

const SummaryItem = styled.div`
    margin: 10px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
    margin-top: ${props=> props.type === "total" && "20px"};
`;

const Button = styled.button`
  width: 20%;
  padding: 15px;
  font-size : 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius : 10px;
  cursor : pointer;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Top = styled.div`
    margin : 20px;
    height : 30vh;
    display : flex;
    justify-content : space-around;
    flex-direction : column;
`;

const ShipTitle = styled.h1``;

const Contactcard = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    
`;

const Contactinfo = styled.h4`
    font-weight : 300;
    margin : 5px;
    display : flex;
    justify-content : space-between;
    width : 75%;
`;

const ContactInput = styled.input`
    padding : 7px;
    width : 50%;
    margin-left : 5px;
`;

const Bottom = styled.div`
    margin : 20px;
    height : 50vh;
    display : flex;
    justify-content : space-around;
    flex-direction : column;
`;

const TopLine = styled.div`
    display : flex;
    justify-content : space-between;
`;

const Error = styled.h3`
    color : red;
    font-weight : 400;
`;


const Orders = () => {

    const user = useSelector(state=>state.user.currentUser);
    const cart = useSelector(state=>state.cart);
    const [email,setemail] = useState("");
    const [phone,setphone] = useState("");
    const [house,sethouse] = useState("");
    const [area,setarea] = useState("");
    const [city,setcity] = useState("");
    const [pin,setpin] = useState("");
    const navigate = useNavigate();
    const [err,seterr] = useState();

    const handleOrder = async () =>{

        const validate = () => {
            if(email === "" || phone === "" ||house === "" ||area === "" || city === "" || pin === ""){
                seterr("Fields cannot be empty!");
                return false;
            }else{
                return true;
            }
        }

        try{

            if(validate()){
                const res = user? await axios.post("http://localhost:5000/api/orders",{"userid" : user._id,"email" : email,"phone" : phone,"products" : cart.products,"total": cart.total,"address" : house+","+area+","+city+","+pin+"."},{headers : {'token' : `BEARER ${user.accesstoken}`}}) : await publicrequest.post("/orders",{"userid" : "nonmember","email" : email,"phone" : phone,"products" : cart.products,"total": cart.total,"address" : house+","+area+","+city+","+pin+"."});
                if(res.status === 200 && user != null){
                    alert("Order placed successfully!Track your order on myorders page");
                    navigate("/myorders",{replace:true});
                }
                else if(res.status === 200) {
                    alert("Order has been placed successfully,you will recieve an email with the details,please create an account to track your orders and save your cart!")
                    navigate("/",{replace:true});
                }else{
                    alert("something went wrong!");
                }
            }
            
        }catch(err){}
    }

  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
        <Left>
            <TitleContainer>
                <Title>Checkout</Title>
            </TitleContainer>
            {cart?.products?.map((item)=>(
            <Product>
                <ProductDetail>
                    <Details>
                        <ProductName><b>Product:</b> {item.title}</ProductName>
                        <ProductName><b>Colour : </b> <ProductColour colour={item.color} /></ProductName>
                        <ProductSize><b>size: </b>{item.size}</ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                        <ProductAmount>Quantity: {item.amount}</ProductAmount>
                    </ProductAmountContainer>
                    <ProductPrice>Price: Rs.{item.price}</ProductPrice>
                </PriceDetail>
            </Product>
        ))}
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>SubTotal</SummaryItemText>
                    <SummaryItemPrice>Rs.{cart?.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Delivery Charges</SummaryItemText>
                    <SummaryItemPrice>Rs.99</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Delivery Discount</SummaryItemText>
                    <SummaryItemPrice>-Rs.99</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem  type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>Rs.{cart?.total}</SummaryItemPrice>
                </SummaryItem>
            </Summary>
        </Left>
        <Right>
            <Top>
                <TopLine>
                <ShipTitle>Shipping Details</ShipTitle>
                <Error>{err}</Error>
                <Button onClick={handleOrder}>Place Order</Button>
                </TopLine>
            <Contactcard>
                <Contactinfo>
                    Email : <ContactInput onChange={(e)=>setemail(e.target.value)}/>
                </Contactinfo>
                <Contactinfo>
                    Phone Number : <ContactInput onChange={(e)=>setphone(e.target.value)}/>
                </Contactinfo>
            </Contactcard>
            </Top>
            <Bottom>
                <ShipTitle>Address</ShipTitle>
                <Contactcard>
                <Contactinfo>House/Apartment : <ContactInput onChange={(e)=>sethouse(e.target.value)}/>
                </Contactinfo>
                <Contactinfo>Area : <ContactInput onChange={(e)=>setarea(e.target.value)}/>
                </Contactinfo>
                <Contactinfo>City : <ContactInput onChange={(e)=>setcity(e.target.value)}/>
                </Contactinfo>
                <Contactinfo>Pincode : <ContactInput onChange={(e)=>setpin(e.target.value)}/>
                </Contactinfo>
                </Contactcard>
            </Bottom>
        </Right>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default Orders;