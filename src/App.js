import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './component/signup';
import Signin from './component/signin';
import Addproducts from './component/Addproducts';
import Getproducts from './component/Getproducts';
import Makepayment from './component/Makepayment';
import Aboutus from './component/Aboutus';
import Accessories from './component/accesories';
import GamingProducts from './component/gaminglp';
import Normal from './component/normal';
import View from './component/viewp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ChatBot from './component/chatBot';
import Sa from './component/sa';





function App() {
  return (
    <Router>
      <div className="App">
         
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Addproducts" element={<Addproducts />} />
          <Route path="/" element={<Getproducts />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/Accessories" element={<Accessories />} />
          <Route path="/gaming" element={<GamingProducts />} />
          <Route path="/view" element={<View />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/Sa" element={<Sa />} />
          

        
      </Routes>

      
    </div>
  </Router>
    
  );
}

export default App;
