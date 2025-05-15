import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const View = () => {
  const {product} = useLocation().state ||{}
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
 
  const img_url = "https://kangethevictor.pythonanywhere.com/static/images/"
  const navigate = useNavigate()
  
  const submit = async (e) => {
    e.preventDefault()
    setMessage("please wait")

    const data =new FormData()
    data.append("phone", phone)
    data.append("amount", product.product_cost)
    
    const response = await axios.get(
      "https://kangethevictor.pythonanywhere.com/api/get_products_details",
      data

    )
    setMessage(response.data.message)
  }
  
  return (
    <div>
      <nav >
        
        <Link className='m-4 mb-5 btn btn-dark' to="/">Get all products</Link>
        <h1>Makepayment-Lipa na Mpesa Online</h1>
        
      </nav>
      <div className="card justify-content-center m-4">
      <div className='row'>
      
      <div className='col-md-4 mb-4'>
      
        <div >
        <img
          src={img_url+product.product_image}
          alt=""
          className="mt-4 prod_img card-img-top"
       />
   
        </div>
      
      

      </div>
      <div className='col-md-8 mt-4'>
      <div >

      
          <h3>Product Name: {product.product_name}</h3>
          <h4>Product cost: {product.product_cost}</h4>
          <p className="text-muted  descr m-65">
                                {product.product_description.slice(0,10)}
                            </p>
          <form onSubmit={submit}>
            
            
          <button
                            className="btn btn-outline-primary ml-2"
                            onClick={()=> navigate('/makepayment',
                            {state:{product}})}
                            >
                                Purchase now
                            </button>
          </form>
          </div>
         </div>
      </div>
      </div>
    </div>
  )
}

export default View