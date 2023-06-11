import styled from "styled-components";
import Orderbox from "./Orderbox";
import { useEffect, useState } from "react";
import { userrequest } from "../request";
import Products from "./Products";
import Prodform from "./Prodform";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  font-weight: 600;
`;

const Content = styled.div`
  width: 70vw;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Ordercontainer = styled.div``;

const Productlistcont = styled.div``;

const Productwrapper = styled.div`
  width: 70vw;
`;

const FilterContainer = styled.div`
  display: flex;
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

const Option = styled.option``;

const Addprodcont = styled.div`
  width: 40vw;
`;

const Inputcard = styled.div`
  font-weight: 300;
  margin: 30px 0px 5px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;

const Input = styled.input`
  padding: 7px;
  margin-left: 5px;
  width: 50%;
`;

const Formcont = styled.form`
  margin: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const Button = styled.button`
  margin-top: 30px;
  margin-left: 30%;
  width: 50%;
  padding: 15px;
  font-size: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`;

const Error = styled.h3``;

const Table = styled.table`
  margin-top: 60px;
  border: 1px solid black;
  border-collapse: collapse;
  width: 80%;
  border-radius: 10px;
`;

const Th = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
  width: 33%;
`;

const Tr = styled.tr``;

const Td = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 10px;
`;

const Thead = styled.thead``;

const Tbody = styled.tbody``;

const Userlistcont = styled.div`
  width: 70vw;
`;

const Admindisplay = ({ page, set }) => {
  const [orders, setorders] = useState();
  const [prod, setprod] = useState({});
  const [err, seterr] = useState("");
  const [cust, setcust] = useState();
  const [proddet, setproddet] = useState({});
  const user = useSelector((state) => state.user.currentUser);

  const handlechange = (e) => {
    setprod((prev) => {
      if (
        e.target.name === "color" ||
        e.target.name === "size" ||
        e.target.name === "categories"
      ) {
        let data = e.target.value.split(",");
        return { ...prev, [e.target.name]: data };
      }
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const getorder = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders`, {
        headers: { token: `BEARER ${user.accesstoken}` },
      });
      setorders(res);
    };
    getorder();
  }, [orders]);

  useEffect(() => {
    const getcust = async () => {
      const res = await axios.get(`http://localhost:5000/api/users`, {
        headers: { token: `BEARER ${user.accesstoken}` },
      });
      setcust(res);
      console.log(cust);
    };
    getcust();
  }, []);

  const handleadd = (e) => {
    e.preventDefault();

    const add = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/products",
          { ...prod },
          { headers: { token: `BEARER ${user.accesstoken}` } }
        );
        if (res.status === 200) seterr("product added successfully");
      } catch (err) {}
    };
    add();
  };

  return (
    <Container>
      {(page === "orders" || page === "") && (
        <Ordercontainer>
          <Heading>All Orders</Heading>
          <Wrapper>
            <Content>
              {orders?.data
                .slice(0)
                .reverse()
                .map((order) => (
                  <Orderbox order={order} />
                ))}
            </Content>
          </Wrapper>
        </Ordercontainer>
      )}
      {page === "productlist" && (
        <Productlistcont>
          <Heading>Product List</Heading>
          <Productwrapper>
            <Products set={set} setprod={setprod} />
          </Productwrapper>
        </Productlistcont>
      )}
      {page === "products" && (
        <Addprodcont>
          <Heading>Add Products</Heading>
          <Error>{err}</Error>
          <Formcont>
            <Inputcard>
              Title : <Input name="title" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Description : <Input name="description" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Image(url) : <Input name="img" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Categories : <Input name="categories" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Sizes : <Input name="size" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Colours : <Input name="color" onChange={handlechange} />
            </Inputcard>
            <Inputcard>
              Price : <Input name="price" onChange={handlechange} />
            </Inputcard>
            <Button onClick={handleadd}>Add Product</Button>
          </Formcont>
        </Addprodcont>
      )}
      {page === "userslist" && (
        <Userlistcont>
          <Heading>List of Customers</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cust?.data.map((cus) => (
                <Tr>
                  <Td>N.A</Td>
                  <Td>{cus.email}</Td>
                  <Td>N.A</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Userlistcont>
      )}
      {page === "updateprod" && (
        <Addprodcont>
          <Prodform prods={prod} set={set} />
        </Addprodcont>
      )}
    </Container>
  );
};

export default Admindisplay;
