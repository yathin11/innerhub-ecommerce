import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div style={{padding:"40px"}}>

      <h1>Admin Dashboard</h1>

      <div style={{marginTop:"30px"}}>

        <Link to="/admin/add-product">
          <button>Add Product</button>
        </Link>

        <Link to="/admin/products" style={{marginLeft:"20px"}}>
          <button>View Products</button>
        </Link>

        <Link to="/admin/orders" style={{marginLeft:"20px"}}>
          <button>View Orders</button>
        </Link>

      </div>

    </div>
  );

}

export default Dashboard;