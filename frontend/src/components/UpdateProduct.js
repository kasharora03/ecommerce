import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails();
    }, []);
    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCompany(result.company);
        setCategory(result.category);
    }
    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json()
        navigate('/');
    }
    return (
        <div>
            <div className="product">
                <h1>update product</h1>
                <input type='text' placeholder="enter product name" className="inputbox" onChange={(e) => { setName(e.target.value) }} value={name} />
                <input type='text' placeholder="enter product price" className="inputbox" onChange={(e) => { setPrice(e.target.value) }} value={price} />
                <input type='text' placeholder="enter product category" className="inputbox" onChange={(e) => { setCategory(e.target.value) }} value={category} />

                <input type='text' placeholder="enter product company" className="inputbox" onChange={(e) => { setCompany(e.target.value) }} value={company} />

                <button className="inputbtn" onClick={updateProduct}>update product</button>
            </div>
        </div>
    )
}

export default UpdateProduct;
