import React from 'react'
import styled from 'styled-components'
import { Search, ShoppingCartOutlined,DoneOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import {useDispatch,useSelector} from "react-redux";
import { Link, useNavigate} from 'react-router-dom';
import { logout } from '../Redux/userredux';
import { clearstate } from '../Redux/cartRedux';
import { useEffect,useState } from 'react';
import { publicrequest, userrequest } from '../request';

const Container = styled.div`
    height: 80px;
    background-color : #131A22;
`;

const Wrapper = styled.div`
    padding : 20px 20px;
    display: flex;
    justify-content : center;
    align-items : center;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Center = styled.div`
    flex: 1;
    
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    margin-left: 25px;
    display: flex;
    align-items: center;
    border-radius : 10px;
`;

const Input = styled.input`
    border: none;
    padding : 12px;
    border-radius: 10px 0px 0px 10px;
    width : 88%;
`;

const Searchbtn = styled.div`
    background-color : #FEBD69;
    width : 12%;
    height : 40px;
    border-radius : 0px 10px 10px 0px;
    display : flex;
    align-items : center;
    justify-content  :center;
`;

const Logo = styled.h2`
    font-weight: bold;
    cursor : pointer;
    color : white;
`;

const MenuItem = styled.div`
    font-size: 18px;
    cursor: pointer;
    margin-left: 25px;
    color : white;
`;

const Dropdown = styled.div`
   display : flex;
   flex-direction : column;
   position : absolute;
   top : 43px;
   left : 27px;
   background-color : white;
   width : 29vw;
   border-radius : 0px 0px 10px 10px;
   z-index : 3;
`;

const Dropitem = styled.h4`
    font-weight : 500;
    padding : 10px;
    cursor : pointer;
    &:hover{
        background-color : lightgray;
    }
`;

const Searchmaincont = styled.div`
    display : flex;
    flex-direction : column;
    position : relative;
`;

const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector(state=>state.user.currentUser);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [prod,setprod] = useState();
    const [filteredprod,setfilteredprod] = useState();

    const handleLogout = () =>{
        dispatch(logout());
        dispatch(clearstate());
        navigate("/",{replace:true});
    }

    setTimeout(() => {
        handleLogout();
    },7200000);

    useEffect(()=>{

        const fetchdata = async () =>{

            try{
                const res = await publicrequest.get("/products");
                setprod(res.data);
                //console.log(prod);
            }catch{}
            
        }
        fetchdata();

    },[])

    const handlesearch = (e) =>{
        const searchword = e.target.value;
        const newfilter = prod.filter((item) => item.title.toLowerCase().includes((searchword).toLowerCase()));

        searchword === "" ? setfilteredprod([]) : setfilteredprod(newfilter);
    }

  return (
    <Container>
        <Wrapper>
            <Left>
            <Logo onClick={()=>navigate("/",{replace:true})}><DoneOutlined style={{fontSize : 30}}/>NAIKE</Logo>  
            </Left>

            <Center>
                <Searchmaincont>
                    <SearchContainer>
                            <Input onChange={handlesearch}/>
                            <Searchbtn>
                                <Search style={{color:"black" , fontSize:20}}/>
                            </Searchbtn>
                    </SearchContainer>
                    <Dropdown>
                    {filteredprod?.map((data)=>
                        <Dropitem onClick={()=>navigate(`/product/${data._id}`,{replace:true})}>{data.title}</Dropitem>
                    )}
                    </Dropdown>
                </Searchmaincont>
            </Center>

            <Right>
                {!user&& 
                <>
                <MenuItem onClick={()=>navigate("/login")}>LOGIN</MenuItem>
                <MenuItem onClick={()=>navigate("/register")}>REGISTER</MenuItem></>}
                {user&&
                <>
                <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
                </> }

                {(user?.isAdmin)&&
                
                <MenuItem onClick={()=>navigate("/admindash",{replace:true})}>DASHBOARD</MenuItem>
                
                }

                {(!user?.isAdmin&&user)&&
                <>
                <MenuItem onClick={()=>navigate("/myorders")}>ORDERS</MenuItem></>}
                {(!user?.isAdmin)&&
                <>
                <MenuItem onClick={()=>navigate("/cart",{replace:true})}>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined style={{fontSize:30}}/>
                    </Badge>
                </MenuItem></>}
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar