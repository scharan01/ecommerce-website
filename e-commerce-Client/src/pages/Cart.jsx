import { Add, Remove,ClearOutlined } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Announcements from "../components/Announcements";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {Link, useNavigate} from "react-router-dom";
import { removeProduct,addProduct,modifyProductQuantity,clearstate } from "../Redux/cartRedux";
import { userrequest } from "../request";
import { useState,useEffect } from "react";
import Products from "../components/Products";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
    text-align: center;
    font-weight: 300;
`;

const Wrapper = styled.div`
    padding: 20px;

`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.button`
    padding:10px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 10px;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
      props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`

`;

const TopText = styled.span`
    text-decoration: underline;
    margin-right : 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    border : 2px solid black;
    border-radius : 10px;
    margin-bottom : 5px;
    margin-right : 2px;
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content : space-around;
`;

const ProductName = styled.span`
    
`;

const ProductID = styled.span``;

const ProductSize = styled.span``;

const ProductColour = styled.span`
    display : inline-block;
    margin-left : 5px;
    width: 20px;
    height: 20px;
    border-radius : 50%;
    background-color : ${props => props.colour}
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
    margin-bottom : 20px;
`;

const ProductAmount= styled.div`
    font-size: 24px;
    margin: 5px;
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border : 1px solid black;
    padding: 20px;
    height: 50vh;
    border-radius:10px;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 25px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius : 10px;
  cursor : pointer;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Down = styled.h2`
    margin : 30px;
`;

const Clearcont = styled.div`
    margin : 3px;
`;

const Error = styled.h3`
    color : red;
    font-weight : 400;
`;

const Cart = () => {

    const user = useSelector(state=>state.user.currentUser);
    const cart = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [err,seterr] = useState();


    const handlecheckout = () => {
        if(cart.quantity == 0) seterr("No items in cart!")
        else navigate("/order",{replace:true});
    }

    const handleclick = (val,item) =>{
        if(val === "dec"){
            if(item.amount>1) dispatch(modifyProductQuantity({...item,val}));
        }else{
            if(item.amount<6) dispatch(modifyProductQuantity({...item,val}));
            
        }
    }

    useEffect(()=>{
        const addCart = async () =>{
            try{
                const res = await axios.put(`http://localhost:5000/api/cart/${user._id}`,{"id" : user._id,"products" : cart.products,"quantity" : cart.quantity,"total" : cart.total},{headers : {'token' : `BEARER ${user.accesstoken}`}});
            }catch(err){
                
            }
        }
        if(user!=null) addCart();
    },[cart]);

  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Wrapper>
            <Title>Your Cart</Title>
            <Top>
                <TopButton onClick={()=>navigate("/",{replace:true})}>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Cart({cart.quantity})  |</TopText>
                        <TopText style={{"cursor" : "pointer"}} onClick={()=>dispatch(clearstate())}>Clear Cart</TopText>
                    </TopTexts>
                    <Error>{err}</Error>
                <TopButton type="filled" onClick={handlecheckout}>Checkout</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart?.products?.map((item)=>(
                         <Product>
                         <ProductDetail>
                             <Image src={item.img}/>
                             <Details>
                                 <ProductName><b>PRODUCT :</b> {item.title}</ProductName>
                                 <ProductID><b>ID :</b> {item._id} </ProductID>
                                 <ProductID><b>Colour :</b><ProductColour colour={item.color}/></ProductID>
                                 <ProductSize><b>Size : </b>{item.size}</ProductSize>
                             </Details>
                         </ProductDetail>
                         <PriceDetail>
                             <ProductAmountContainer>
                             <Remove style={{"cursor":"pointer"}} onClick={()=>handleclick("dec",item)} />
                                 <ProductAmount>{item.amount}</ProductAmount>
                             <Add style={{"cursor":"pointer"}} onClick={()=>handleclick("inc",item)} />
                             </ProductAmountContainer>
                             <ProductPrice>Rs.{item.price}</ProductPrice>
                         </PriceDetail>
                         <Clearcont onClick={()=>dispatch(removeProduct(item))}><ClearOutlined /></Clearcont>
                     </Product>
                    ))}
                    <Hr/>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal</SummaryItemText>
                        <SummaryItemPrice>{cart?.total}</SummaryItemPrice>
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
                        <SummaryItemPrice>{cart?.total}</SummaryItemPrice>
                    </SummaryItem>
                    <Button onClick={handlecheckout}>CHECKOUT</Button>
                </Summary>
            </Bottom>
        </Wrapper>
        <Down>Checkout other products!</Down>
        <Products/>
        <Footer/>
    </Container>
  )
}

export default Cart