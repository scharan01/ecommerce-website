import styled from "styled-components";
import { userrequest } from "../request";
import { useState } from "react";
import { EditOutlined } from "@material-ui/icons";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`

`;

const Heading = styled.h1`
    margin-bottom : 30px;
    font-weight : 600; 
`;

const Inputcard = styled.div`
    font-weight : 300;
    margin : 30px 0px 5px 10px;
    display : flex;
    justify-content : space-between;
    font-size : 20px;
`;

const Input = styled.input`
    padding : 7px;
    margin-left : 5px;
    width : 50%;
`;

const Formcont = styled.form`
    margin : 20px;
    display : flex;
    justify-content : space-around;
    flex-direction : column;
`;

const Button = styled.button`
  margin-top : 30px;
  margin-left : 30%;
  width: 50%;
  padding: 15px;
  font-size : 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius : 10px;
  cursor : pointer;
`;

const Error = styled.h3``;

const Edit = styled.div`
    position : absolute;
    right : 0px;
    cursor : pointer;
`;

const Prodform = ({prods,set}) => {

    const [prod,setprod] = useState({});
    const [err,seterr] = useState("");
    const user = useSelector(state=>state.user.currentUser);
    const [ena,setena] = useState({
        "title" : true,
        "description" : true,
        "img" : true,
        "categories" : true,
        "size" : true,
        "color" : true,
        "price" : true
    })

    const handlechange = (e) =>{
        setprod(prev=>{
            if(e.target.name === "color" || e.target.name === "size" || e.target.name === "categories"){
                let data = (e.target.value).split(",");
                return {...prev,[e.target.name]: data};
            }
            return {...prev,[e.target.name] : e.target.value};
        });
    }

    const handleedit = (e) =>{
        e.preventDefault();

        const edit = async () =>{
            try{
                const res = await axios.put(`http://localhost:5000/api/products/${prods._id}`,{...prod},{headers : {'token' : `BEARER ${user.accesstoken}`}});
                if(res.status === 200){
                    seterr("product updated successfully");
                    set("productlist");
                }
            }catch(err){}
        }
        edit();

    }

    const edithandler = (det) =>{
        
        setena(prev=>{
            return {...prev,[det] : false};
        });
        
    }

  return (
    <Container>
        <Heading>Modify Product</Heading>
        <Error>{err}</Error>
        <Formcont>
        <Inputcard>
        Title : <Input name="title" onChange={handlechange} placeholder={prods.title} disabled={ena.title}/>
        <Edit><EditOutlined onClick = {()=>edithandler("title")} /></Edit>
        </Inputcard>
        <Inputcard>
        Description : <Input name="description" onChange={handlechange} placeholder={prods.description} disabled={ena.description}/>
        <Edit><EditOutlined onClick = {()=>edithandler("description")} /></Edit>
        </Inputcard>
        <Inputcard>
        Image(url) : <Input name="img" onChange={handlechange} placeholder={prods.img} disabled={ena.img}/>
        <Edit><EditOutlined onClick = {()=>edithandler("img")} /></Edit>
        </Inputcard>
        <Inputcard>
        Categories : <Input name="categories" onChange={handlechange} placeholder={prods.categories} disabled={ena.categories}/>
        <Edit><EditOutlined onClick = {()=>edithandler("categories")} /></Edit>
        </Inputcard>
        <Inputcard>
        Sizes : <Input name="size" onChange={handlechange} placeholder={prods.size} disabled={ena.size}/>
        <Edit><EditOutlined onClick = {()=>edithandler("size")} /></Edit>
        </Inputcard>
        <Inputcard>
        Colours : <Input name="color" onChange={handlechange} placeholder={prods.color} disabled={ena.color}/>
        <Edit><EditOutlined onClick = {()=>edithandler("color")} /></Edit>
        </Inputcard>
        <Inputcard>
        Price : <Input name="price" onChange={handlechange} placeholder={prods.price} disabled={ena.price}/>
        <Edit><EditOutlined onClick = {()=>edithandler("price")} /></Edit>
        </Inputcard>
        <Button onClick={handleedit}>Modify Product</Button>
        </Formcont>
    </Container>
  )
}

export default Prodform