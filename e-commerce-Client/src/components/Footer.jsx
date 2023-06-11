import { DoneOutlined, Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@material-ui/icons";
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    background-color : #37475A;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction : column;
    padding : 20px;
`;

const Logo = styled.h1`
    color : white;
`;

const Desc = styled.p`
    margin: 20px 0;
    color : white;
`;

const SocialContainer = styled.div`
    display: flex;

`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=> props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin : 20px 0px;
    color : white;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style : none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color : white;
`;

const Right = styled.div`
    flex: 1;
`;

const ContactItem = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    color : white;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo><DoneOutlined style={{fontSize : 30}}/> NAIKE</Logo>
            <Desc>
            "NAIKE is an evolving footwear brand aimed at bringing awesome designs and quality for different needs.We are committed to delivering top class products at affordable prices without any compromises.Our products are proudly made in India"
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter/>
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest/>
                </SocialIcon>
            </SocialContainer>

        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>My orders</ListItem>
            <ListItem>Feedback</ListItem>
            <ListItem>Running Shoes</ListItem>
            <ListItem>Basketball Shoes</ListItem>
            <ListItem>Football Shoes</ListItem>
            <ListItem>Non-marking Shoes</ListItem>
            <ListItem>Casual Shoes</ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><Room style={{marginRight:"10px"}}/> 3rd floor,Sai Complex,Kukatpally,Hyderabad</ContactItem>
            <ContactItem><Phone style={{marginRight:"10px"}}/> +91 9820001231, 040 11223344</ContactItem>
            <ContactItem><MailOutline style={{marginRight:"10px"}}/> naike.shop@gmail.com</ContactItem>
        </Right>

    </Container>
  )
}

export default Footer