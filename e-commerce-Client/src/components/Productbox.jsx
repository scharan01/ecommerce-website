import styled from "styled-components";

const Product = styled.div`
flex : 1;
display : flex;
justify-content: space-between;
border : 1px solid black;
border-radius : 10px;
margin : 5px;

`;

const ProductDetails = styled.div`
flex: 2;
display: flex;
`;

const Image = styled.img`
width: 150px;
`;

const Details = styled.div`
padding: 20px;
display: flex;
flex-direction: column;
justify-content : space-around;
`;

const ProductName = styled.span`

`;

const ProductID = styled.span``;

const ProductSize = styled.span``;

const ProductColour = styled.span`
display : inline-block;
margin-left : 5px;
width: 20px;
height: 20px;
border-radius : 50%;
background-color : ${props => props.colour}
`;

const PriceDetail = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

`;

const ProductPrice = styled.div`
font-size: 30px;
font-weight: 200;
`;

const Productbox = ({product}) => {
  return (
    <Product>
        <ProductDetails>
            <Image src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1614188818-TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_b01b1013-cd8d-48e7-bed9-52db26515dc4.png?crop=1xw:1.00xh;center,top&resize=480%3A%2A"/>
            <Details>
                <ProductName><b>PRODUCT : {product.title}</b> </ProductName>
                <ProductID><b>Colour : </b>{product.color} <ProductColour/></ProductID>
                <ProductSize><b>Size : </b> {product.size}</ProductSize>
                <ProductSize><b>Quantity : </b>{product.amount}</ProductSize>
            </Details>
        </ProductDetails>
        <PriceDetail>
            <ProductPrice>Rs.{product.price}</ProductPrice>
        </PriceDetail>
    </Product>
  )
}

export default Productbox