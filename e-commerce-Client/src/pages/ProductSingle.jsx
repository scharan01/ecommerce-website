import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { publicrequest,userrequest } from "../request";
import { addProduct,clearstate } from "../Redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { BottomNavigation } from "@material-ui/core";
import axios from "axios";


const Container = styled.div`

`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;

const ImageContainer = styled.div`
    flex:1;
`;

const Image = styled.img`
    width: 100%;
    height: 80vh;
    object-fit: contain;
`;

const InfoContainer = styled.div`
    height : 70vh;
    flex:1;
    display : flex;
    justify-content : space-between;
    flex-direction : column;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Desc = styled.p`
    margin : 20px 0px;
`;

const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-wrap : wrap;
    justify-content : space-between;
    width: 80%;
    margin : 30px 0px;
`;

const Filter = styled.div`
    display: flex;
    align-items: center;

`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
    margin-right: 10px;
`;

const Filtercolour = styled.div`
    width: 20px;
    height: 20px;
    border-radius : 50%;
    background-color: ${props=> props.colour};
    margin: 0px 5px;
    cursor: pointer;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`;

const FilterSizeOption = styled.option`

`;

const Top = styled.div``;

const Middle = styled.div``;
const Bottom = styled.div``;

const AddContainer = styled.div`
    display : flex;
    align-items : center;
    width: 60%;
    justify-content: space-between;
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius : 10px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;

`;

const Button = styled.button`
    padding : 15px;
    border: 2px solid black;
    border-radius : 5px;
    font-weight: 500;
    background-color: black;
    cursor: pointer;
    color : white;

    &:hover{
        background-color: white;
        color: black;
    }
`;

const Alert = styled.h3`
    font-weight : 400;
    color : ${props=>props.type === "Successfully added to cart"  ? "green" : "red"};
    margin-top : 20px;
`;


const ProductSingle = () => {

    const location = useLocation();
    const user = useSelector(state=>state.user.currentUser);
    const id = location.pathname.split("/")[2];
    const cart = useSelector(state=>state.cart);
    const [product,setProduct] = useState({});
    const [amount,setAmount] = useState(1);
    const [size,setsize] = useState();
    const [color,setcolor] = useState();
    const dispatch = useDispatch()
    const [alert,setalert] = useState();

    useEffect(() => {
      const getproduct = async () =>{
        try{
            const res = await publicrequest.get(`products/find/${id}`);
            setProduct(res.data);
        }catch(err){

        }
      }
      getproduct();
    },[id]);

    const handleQuantity = (val) =>{
        if(val === "dec"){
            if(amount>1) setAmount(amount-1);
        }else{
            if(amount<6) setAmount(amount+1);
        }
    }

    const handleAdd = () =>{

        const validate = () => {
            if(color == null && size==null){
                setalert("Please choose the colour and size!");
                return false;
            }
            else if(color == null){
                setalert("Please choose the colour!");
                return false;
            }
            else if(size==null){
                setalert("Please choose the size!");
                return false;
            }else{
                setalert("Successfully added to cart")
                return true;
            }
        }

        if(validate()){
            dispatch(
                addProduct({...product,amount,color,size})
            )
        }
        
    }

    useEffect(()=>{
        const addCart = async () =>{
            try{
                const res = await axios.put(`http://localhost:5000/api/cart/${user._id}`,{"id" : user._id,"products" : cart.products,"quantity" : cart.quantity,"total" : cart.total},{headers : {'token' : `BEARER ${user.accesstoken}`}});
                if(res.data.matchedCount === 0){
                    const res = await axios.post(`cart`,{"id" : user._id,"products" : cart.products,"quantity" : cart.quantity,"total" : cart.total},{headers : {'token' : `BEARER ${user.accesstoken}`}});
                    console.log(res);
                }
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
            <ImageContainer>
                <Image src={product.img}/>
            </ImageContainer>
            <InfoContainer>
                <Top>
                <Title>{product.title}</Title>
                <Desc>{product.description}</Desc>
                </Top>
                <Middle>
                <Price>Rs.{product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Colour : </FilterTitle>
                        {product.color?.map((item)=>
                            <Filtercolour key={item} colour={item} onClick={()=>setcolor(item)}/>
                        )}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size : </FilterTitle>
                        <FilterSize onChange={(e)=>setsize(e.target.value)}>
                            <FilterSizeOption selected disabled>size</FilterSizeOption>
                            {product.size?.map((item)=>
                                <FilterSizeOption key={item}>{item}</FilterSizeOption>
                            )}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                </Middle>
                <Bottom>
                <AddContainer>
                    <AmountContainer>
                        <Remove style={{"cursor":"pointer"}} onClick={()=>handleQuantity("dec")} />
                        <Amount>{amount}</Amount>
                        <Add style={{"cursor":"pointer"}} onClick={()=>handleQuantity("inc")} />
                    </AmountContainer>
                    {(!user?.isAdmin)&&<Button onClick={handleAdd}>Add to Cart</Button>}
                </AddContainer>
                </Bottom>
                <Alert type={alert}>{alert}</Alert>
            </InfoContainer>
        </Wrapper>
        <Footer/>
    </Container>
  )
}

export default ProductSingle