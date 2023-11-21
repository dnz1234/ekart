import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removeFromCart } from '../redux/slices/cartSlice';
import { Navigate, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate()
  
  const cartArray=useSelector((state)=>state.cartReducer)
  console.log(cartArray);
  const dispatch=useDispatch()
  const [total , setTotal] = useState (0)
  const getTotal = ()=>{
    if (cartArray.length>0){
    setTotal(cartArray.map(item=>item.price).reduce((p1,p2)=>p1+p2))
  }
  else{
    setTotal(0)
  }
}
 useEffect(()=>{
  getTotal()
 },[cartArray])

 const handlecart= ()=>{
    alert('thank you ..... you order  placed sucessfully')
    dispatch( emptyCart())
    navigate('/')
 }
  return (
    <div style={{marginTop:'100px'}}>
     
      {cartArray?.length>0?
      <div className='row w-100'>
        <div className='col-lg-6 mx-5'>
          <table className='table border shadow'>
           <thead>
              <tr>
                <th>0</th>
                <th>Product</th>
                <th>Image</th>
                <th>Prise</th>
                <th>Action</th>
              </tr>
           </thead>
           <tbody>
              {cartArray?.map((item,index)=>(
                <tr>
                <td>{index+1}</td>
                <td>{item.title}</td>
                <td><img width={'160px'} height={'100px'} src={item.thumbnail} alt="" /></td>
                <td>{item.price}</td>
                <td>
                <Button onClick={()=>dispatch(removeFromCart(item.id))}
                    variant="outline-danger rounded ms-3">
                      <i className="fa-solid fa-trash"></i>
                </Button>
                </td>
              </tr>
              
              ))
                }
           </tbody>
          </table>
      </div>
      
      <div className='col-lg-4 d-flex align-items-center m-0 p-0 justify-content-center'>
            <div className='d-flex flex-column justify-content-center'>
                <h1>Cart Summery</h1>
                <div className='mt-2 d-flex justify-content-between'>
                  <h5 className='text-warning'>Total no.of products : <span className='text-primary fw-bolder fs-3'>{cartArray.length} </span></h5>
                  <h5 className='text-warning me-3'></h5>
                  </div>
                <h5 className='mb-3 text-warning'>Total Price : <span className='text-primary fw-border fs-3'>{total} </span></h5>
                <button onClick={handlecart} className='btn btn-success mt-2'>Check out</button>
            </div>
      </div>
      
      </div>
      :
      <p>Nothing to display</p>
      
      }
     </div>
  )       
    }         

export default Cart