import styled from "styled-components"
import Announcements from "../components/Announcements";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`

`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display:flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
`;

const FilteredText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`;

const Option = styled.option`

`;


const ProductList = () => {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filter,setfilter] = useState({});
    const [sort,setsort] = useState("newest");

    const handleFilter = (e) =>{
        const value = e.target.value;
        setfilter({
            ...filter,
            [e.target.name] : value,
        });

    }

  return (
    <Container>
        <Navbar/>
        <Announcements/>
        <Title>Footwear for {cat}</Title>
        <FilterContainer>
            <Filter>
                <FilteredText>Filter Products</FilteredText>
                <Select name="color" onChange={handleFilter}>
                    <Option selected disabled>Colour</Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                </Select>
                <Select name="size" onChange={handleFilter}>
                    <Option selected disabled>
                    Size
                    </Option>
                    <Option>UK6</Option>
                    <Option>UK7</Option>
                    <Option>UK8</Option>
                    <Option>UK9</Option>
                    <Option>UK10</Option>
                </Select>
            </Filter>
            <Filter>
                <FilteredText>Sort Products</FilteredText>
                <Select onChange={(e)=> setsort(e.target.value)}>
                    <Option value={"newest"}>Latest</Option>
                    <Option value={"asc"}>Price : low to high</Option>
                    <Option value={"desc"}>Price : high to low</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filter={filter} sort={sort}/>
        <Footer/>
    </Container>
  )
}

export default ProductList