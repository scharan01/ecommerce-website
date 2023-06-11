import { CloseOutlined, FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined, UpdateOutlined } from "@material-ui/icons";
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import { userrequest } from "../request";
import axios from "axios";


const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 270px;
    max-width : 270px;
    height: 350px;
    display: flex;
    justify-content : center;
    align-items : center;
    background-color : #f5fbfd;
    position : relative;
`;

const Image = styled.img`
    position : absolute;
    height : 90%;
    width : 90%;
    object-fit : contain;
    z-index: 2;
    cursor : pointer;
`;

const BottomInfo = styled.div`
    z-index : 4;
    position : relative;
    top : 40%;
    background-color : #131A22;
    padding : 10px;
    border-radius : 10px;
`;

const Price = styled.h3`
    color : white;
    font-weight : 500;

`;

const Closecont = styled.div`
    position : absolute;
    top : 2px;
    right : 2px;
    cursor : pointer;
`;

const Updatecont = styled.div`
    position : absolute;
    top : 2px;
    left : 2px;
    cursor : pointer;
`;

const Product = ({item,set,setprod}) => {
    const navigate = useNavigate();
    const user = useSelector(state=>state.user.currentUser);

    const handledelete = () =>{

        const del = async () =>{

            try{
            const res = await axios.delete(`http://localhost:5000/api/products/${item._id}`,{headers : {'token' : `BEARER ${user.accesstoken}`}});
            }catch(err){}
        }

        del();
    }

    const handleupdate = () =>{
        set("updateprod");
        setprod(item);
    }

  return (
    <Container >
        {user?.isAdmin&& <><Closecont onClick={handledelete}><CloseOutlined/></Closecont>
        <Updatecont><UpdateOutlined onClick={handleupdate} style={{"cursor" : "pointer"}} /></Updatecont></>
        }

        <Image src={item.img} onClick={()=>navigate(`/product/${item._id}`,{replace:true})}/>
        <BottomInfo>
            <Price>Rs.{item.price}</Price>
        </BottomInfo>
    </Container>
  )
}

export default Product