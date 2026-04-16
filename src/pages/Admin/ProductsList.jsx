import React, { useEffect, useState } from "react";

function ProductsList() {

  const [products,setProducts] = useState([]);

  useEffect(()=>{

    fetch("http://localhost:5000/api/products")
    .then(res=>res.json())
    .then(data=>setProducts(data));

  },[]);

  return (

    <div style={{padding:"40px"}}>

      <h2>Products</h2>

      {products.map(product => (

        <div key={product.id} style={{marginBottom:"20px"}}>

          <h3>{product.name}</h3>

          <p>{product.description}</p>

          <p>Price: ₹{product.base_price}</p>

        </div>

      ))}

    </div>

  );

}

export default ProductsList;