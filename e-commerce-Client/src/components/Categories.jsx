import React from 'react'
import styled from 'styled-components'
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import { ArrowLeftOutlined,ArrowRightOutlined } from '@material-ui/icons';
import { useState } from 'react';

const Container = styled.div`
    position : relative;
    background-color : #FEBD69;
    overflow : hidden;
`;


const Arrow = styled.div`
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius : 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    cursor: pointer;
    z-index : 2;
`;

const Wrapper = styled.div`
    margin : 0px 20px;
    padding : 20px;
    display : flex;
    transition: all 1s ease;
    transform: translateX(${props=> props.slideIndex * -100}vw);
`;

const Title = styled.h1`
  font-size : 40px;
  font-weight : 500;
  margin : 10px 0px 5px 25px;
  color : white;
`;

const Categories = () => {

  const [slideIndex,setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }
    }
    
  return (
    <Container>
      <Title>Categories </Title>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
    {categories.map((item)=> (
        <CategoryItem item={item} key={item.id}/>
    ))}
    </Wrapper>
    <Arrow direction="right" onClick={() => handleClick("right")}>
      <ArrowRightOutlined/>
    </Arrow>
    </Container>
  )
}

export default Categories