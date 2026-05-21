import React, { useState } from "react";

function Orders() {

  const [phone,setPhone] = useState("");
  const [orders,setOrders] = useState([]);

  const searchOrders = async () => {

    const res = await fetch(
      `http://localhost:5000/api/orders/${phone}`
    );

    const data = await res.json();

    setOrders(data);
  };

  return (

    <div style={{padding:"40px"}}>

      <h2>Search Orders</h2>

      <input
        placeholder="Enter phone number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <button onClick={searchOrders}>
        Search
      </button>

      <div>

        {orders.map(order => (

          <div key={order.id}>

            <h3>Order #{order.id}</h3>

            <p>Status: {order.status}</p>

            <p>Tracking: {order.tracking_id}</p>

            <p>Total: ₹{order.total}</p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Orders;