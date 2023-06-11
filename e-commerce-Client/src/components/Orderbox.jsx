import Productbox from "./Productbox";
import styled from "styled-components";
import { DoneOutline, DoneOutlined, UpdateOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { userrequest } from "../request";
import axios from "axios";

const Top = styled.div`
    padding : 20px;
    display : flex;
    justify-content : space-between;
    background-color : #37475A;
    border-radius : 8px 8px 0px 0px;
`;

const Orderdetail = styled.h3`
    display : flex;
    flex-direction : column;
    color :white;
`;

const ProductDetail = styled.div`
    border : 2px solid black;
    border-radius : 10px;
    margin-bottom : 10px;
`;


const Middle = styled.div`
    padding : 10px;
    display : flex;
`;

const Summary = styled.div`
    flex: 1;
    border : 1px solid black;
    padding: 10px;
    border-radius:10px;
    display : flex;
    justify-content : space-between;
    flex-direction : column;
    margin : 5px;
    max-height : 30vh;
`;

const SummaryTitle = styled.h3`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 5px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Productcont = styled.div`
    display : flex;
    flex-direction : column;
    width : 70%;
`;

const Ordertitle = styled.h4`
    font-weight : 600;
    margin-bottom : 5px;
`;

const Orderitem = styled.h5`
    font-weight : 500;
`;

const Input = styled.input``;

const Bottom = styled.div`
    padding : 20px;
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    background-color : #37475A;
    border-radius :  0px 0px 8px 8px;
`;

const Detailcont = styled.div`
    display : flex;
    justify-content : space-between;
    color : white;
    font-size : 18px;
`;

const Email = styled.span``;

const Phoneno = styled.span``;

const Address = styled.span`
    color : white;
    font-size : 18px;
    margin-top : 10px;
`;


const Orderbox = ({order}) => {

    const user = useSelector(state=>state.user.currentUser);
    const [upd,setupd] = useState(false);
    const [updtxt,setupdtxt] = useState("");

  const changeDate = (date) =>{
    const dat = date.substring(0,10).split("-").reverse().join("-");
    return dat;
  }

  const handleupdate = () => {
    
    const update = async ()=> {
        try{
        const res = await axios.put(`http://localhost:5000/api/orders/${order._id}`,{...order,"status" : updtxt},{headers : {'token' : `BEARER ${user.accesstoken}`}});
        }catch(err){}
    }
    
    if(updtxt !== "") update();
    setupd(false);
  }

  const updatehandler = () =>{
    if(!upd){
        return (
            <Orderitem>{order.status} 
            {(user.isAdmin)&& <UpdateOutlined onClick={()=>setupd(true)} style={{"cursor" : "pointer"}} fontSize="small"/> }
            </Orderitem>
        )
    }else{
        return (
            <Orderitem>
                <Input onChange={(e)=>setupdtxt(e.target.value)}/><DoneOutlined onClick={handleupdate} style={{"position" : "absolute","cursor" : "pointer"}}/>
            </Orderitem>
        )
    }
  }

  return (
    <ProductDetail>
      <Top>
          <Orderdetail>
            <Ordertitle>Order Placed</Ordertitle>
            <Orderitem>{changeDate(order.createdAt)}</Orderitem>
        </Orderdetail>
          <Orderdetail> 
            <Ordertitle>Order Status</Ordertitle>
            {updatehandler()}
           </Orderdetail>
          <Orderdetail> 
            <Ordertitle>Order ID</Ordertitle>
            <Orderitem>{order._id}</Orderitem>
        </Orderdetail>
      </Top>
      <Middle>   
        <Productcont>
            {order?.products?.map((product)=>
            <Productbox product={product} />
            )}
        </Productcont>
      <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
          <SummaryItemText>SubTotal </SummaryItemText>
          <SummaryItemPrice>{order.total}</SummaryItemPrice>
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
              <SummaryItemText>Total : </SummaryItemText>
              <SummaryItemPrice>{order.total}</SummaryItemPrice>
          </SummaryItem>
      </Summary>
      </Middle>
      {user?.isAdmin&&
        <Bottom>
            <Detailcont>
                <Email>Email : {order.email}</Email>
                <Phoneno>Phone No : {order.phone}</Phoneno>
            </Detailcont>
            <Address>Address : {order.address}</Address>
        </Bottom>
      }
  </ProductDetail>   
  )
}

export default Orderbox