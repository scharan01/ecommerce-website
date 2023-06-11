import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Container = styled.div`
    min-width : 32vw;
    margin-right :10px;
    height: 65vh;
    position: relative;
    border-radius : 10px;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top : 0;
    left : 0;
    display: flex;
    align-items : center;
    justify-content: center;
    flex-direction : column;

`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: black;
    cursor: pointer;
    font-weight: 600;
    border-radius : 10px;

    &:hover{
        background-color : black;
        color : white;
    }
`;

const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
   
`;

const CategoryItem = ({item}) => {
  return (
    <Container>
        <Link to={`/products/${item.cat}`}>
            <Image src={item.img}/>
            <Info>
                <Title>{item.title}</Title>
                <Button>SHOP NOW</Button>
            </Info>
        </Link>
    </Container>
  )
}

export default CategoryItem