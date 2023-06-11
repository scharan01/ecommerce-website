import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import ProductSingle from "./pages/ProductSingle";
import Register from "./pages/Register";
import { BrowserRouter,Routes,Route,Navigate, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import Orders from "./pages/Orders";
import Myorders from "./pages/Myorders";
import Admindash from "./pages/Admindash";

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  

  const loginhandle = () =>{
    if(user?.isAdmin) return <Navigate to="/admindash" />
    else if(!user) return <Login/>
    else return <Navigate to="/" />
  }
  
  return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/product/:productid" element={<ProductSingle />} />
          <Route path="/cart" element={user?.isAdmin? <Navigate to="/" /> :<Cart />} />
          <Route path="/login" element={loginhandle()} />
          <Route path="/register" element={user? <Navigate to="/" /> :<Register />} />
          <Route path="/order" element={user?.isAdmin? <Navigate to="/" /> :<Orders />} />
          <Route path="/myorders" element={!user||user.isAdmin? <Navigate to="/" /> :<Myorders />} />
          <Route path="/admindash" element={!user?.isAdmin? <Navigate to="/" /> :<Admindash />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;