import styled from "styled-components"

const Container = styled.div`
    height: 40px;
    background-color: #37475A;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`;


const Announcements = () => {
  return (
    <Container>
        Free Delivery for orders above Rs.500! Order Now!
    </Container>
  )
}

export default Announcements