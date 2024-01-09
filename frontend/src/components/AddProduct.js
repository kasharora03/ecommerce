import React from "react";
import { useState } from "react";
const AddProduct = ()=>{
    const[name,setName]=useState('');
    const[price,setPrice]=useState('');
    const[category,setCategory]=useState('');
    const[company,setCompany]=useState('');
    const[error,setError]=useState(false);
    const addProduct= async()=>{
        if(!name ||!price ||!category ||!company){
            setError(true);
            return false;
        }
        console.warn(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'));
        console.warn(userId._id)
        let result = await fetch("http://localhost:5000/addproduct",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        result= await result.json();
        console.warn(result);
        setName('')
        setPrice('')
        setCategory('')
        setCompany('')
    }
    return(
        <div className="product">
        <h1>add product</h1>
        <input type='text' placeholder="enter product name" className="inputbox" onChange={(e)=>{setName(e.target.value)}} value={name}/>
        {error && !name && <span className="sp">enter name</span>}
        <input type='text' placeholder="enter product price" className="inputbox" onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
        {error && !price && <span className="sp">enter price</span>}
        <input type='text' placeholder="enter product category" className="inputbox" onChange={(e)=>{setCategory(e.target.value)}} value={category}/>
        {error && !category && <span className="sp">enter category</span>}
        <input type='text' placeholder="enter product company" className="inputbox" onChange={(e)=>{setCompany(e.target.value)}} value={company}/>
        {error && !company && <span className="sp">enter company</span>}
        <button className="inputbtn" onClick={addProduct}>ADD product</button>
        </div>
    );
}
export default AddProduct;