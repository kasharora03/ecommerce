import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
        })
        result = await result.json();
        if (result) {
            getProducts();
            alert('record delted successfully!')
        }
    }
    const searchHandle = async (event) => {
        console.warn(event.target.value);
        let key = event.target.value;
        if (key) {

            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }

    }
    return (
        <div className='product-list'>
            <h3>product list</h3>
            <input type='text' placeholder='search product' onChange={searchHandle} />
            <ul>
                <li>sno</li>
                <li>name</li>
                <li>price</li>
                <li>category</li>
                <li>company</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ?
                products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>delte</button>
                            <Link to={'/update/' + item._id}>Update</Link></li>

                    </ul>
                )
                :
                <h3>no result</h3>
            }
        </div>
    )
}

export default ProductList;
