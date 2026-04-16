import React, { useState } from "react";

function AddProduct() {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [image,setImage] = useState("");

  const [variants,setVariants] = useState([
    {color:"",size:"",price:"",stock:""}
  ]);

  const handleVariantChange = (index,e) => {

    const values = [...variants];

    values[index][e.target.name] = e.target.value;

    setVariants(values);
  };

  const addVariant = () => {

    setVariants([
      ...variants,
      {color:"",size:"",price:"",stock:""}
    ]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const product = {
      name,
      description,
      price,
      image,
      variants
    };

    await fetch("http://localhost:5000/api/products/admin/create",{

      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(product)

    });

    alert("Product added successfully");

  };

  return (

    <div style={{padding:"40px"}}>

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Product Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Base Price"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
        />

        <h3>Variants</h3>

        {variants.map((variant,index)=> (

          <div key={index}>

            <input
              name="color"
              placeholder="Color"
              onChange={(e)=>handleVariantChange(index,e)}
            />

            <input
              name="size"
              placeholder="Size"
              onChange={(e)=>handleVariantChange(index,e)}
            />

            <input
              name="price"
              placeholder="Price"
              onChange={(e)=>handleVariantChange(index,e)}
            />

            <input
              name="stock"
              placeholder="Stock"
              onChange={(e)=>handleVariantChange(index,e)}
            />

            <br/><br/>

          </div>

        ))}

        <button type="button" onClick={addVariant}>
          Add Variant
        </button>

        <br/><br/>

        <button type="submit">Create Product</button>

      </form>

    </div>

  );

}

export default AddProduct;