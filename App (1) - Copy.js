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
        
      </Routes>

      
    </div>
  </Router>
    
  );
}

export default App;
