import React from 'react'
import styled from 'styled-components'
import {ArrowLeftOutlined,ArrowRightOutlined } from '@material-ui/icons';
import {sliderItems} from '../data'
import { useState } from 'react';
import { useEffect } from 'react';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
`;

const Arrow = styled.div`
    height: 50px;
    width: 50px;
    background-color: #fff7f7;
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
    height: 100%;
    display: flex;
    transition: all 2.5s ease;
    transform: translateX(${props=> props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    width : 100vw;
    height : 100vh;
    background-color: #${props => props.bg}
`;

const ImageContainer = styled.div`
    text-align: center;
    height: 100%;
    flex: 1;
`;

const InfoContainer = styled.div`
    margin-right: 30px;
    flex: 1;
    padding: 50px;
`;

const Image = styled.img`
    height: 80%;
    width : 80%;
    object-fit : contain;
`;

const Title = styled.h1`
    font-size: 60px;
`;

const Description = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: black;
    color : white;
    font-size: 20px;
    cursor: pointer;
    border-radius: 5px;

`;

const Slider = () => {

    const [slideIndex,setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if(direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2);
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0);
        },3500)
    },[slideIndex]);

  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item) => (
                <Slide bg={item.bg} key={item.bg}>
                <ImageContainer>
                    <Image src={item.img}/>
                </ImageContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Description>{item.desc}</Description>
                    <Button>SHOP NOW</Button>
                </InfoContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider