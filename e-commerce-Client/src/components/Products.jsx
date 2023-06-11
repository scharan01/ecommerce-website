import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components"
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat,filter,sort,set,setprod}) => {
  
  const [products,setproducts] = useState([]);
  const [filteredproducts,setfilteredproducts] = useState([]);

  useEffect(() =>{
    const getproducts = async () =>{
      try{
        const res = await axios.get( cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products" );
        setproducts(res.data);
      }catch(err){

      }
    }
    getproducts();
  },[cat,products]);

  useEffect(() =>{
    cat && 
    setfilteredproducts(
      products.filter((item) =>
      Object.entries(filter).every(([key,value]) =>
      item[key].includes(value)
      )
      )
    );
  },[products,cat,filter]);

  useEffect(()=>{
    if(sort="newest"){
      setfilteredproducts(prev => 
        [...prev].sort((a,b)=> a.createdAt - b.createdAt));
    }
    else if(sort="asc"){
      setfilteredproducts(prev => 
        [...prev].sort((a,b)=> a.price - b.price));
    }
    else{
      setfilteredproducts(prev => 
        [...prev].sort((a,b)=> b.price - a.price));
    }
  },[sort]);

  return (
    <Container>
        {cat ? filteredproducts.map((item) => <Product item={item} key={item.id} set={set} setprod={setprod}/>)
            : products.slice(0,12).map((item) => <Product item={item} key={item.id} set={set} setprod={setprod}/>)
        }

    </Container>
  )
}

export default Products