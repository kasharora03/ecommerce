import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async()=>{
        let result= await fetch('http://localhost:5000/products');
        result=await result.json();
        setProducts(result);
    }
    const deleteProduct =async(id)=>{
        let result = await fetch(`http://localhost:5000/products/${id}`,{
            method:'DELETE',
        })
        result= await result.json();
        if (result) {
            getProducts();
            alert('record delted successfully!')
        }
    }
  return (
    <div className='product-list'>
      <h3>product list</h3>
      <ul>
        <li>sno</li>
        <li>name</li>
        <li>price</li>
        <li>category</li>
        {/* <li>company</li> */}
        <li>Operation</li>
      </ul>
      {
        products.map((item,index)=>
        <ul key={item._id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>$ {item.price}</li>
        <li>{item.category}</li>
        {/* <li>{item.company}</li> */}
        <li><button onClick={()=>deleteProduct(item._id)}>delte</button>
        <Link to={'/update/'+item._id}>Update</Link></li>

      </ul>
      )
      }
    </div>
  )
}

export default ProductList;
