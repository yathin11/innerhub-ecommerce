import { useState } from "react";

function TrackOrder() {

const [phone,setPhone] = useState("");
const [orders,setOrders] = useState([]);

const handleSearch = async () => {

const res = await fetch(`http://localhost:5000/orders/${phone}`);
const data = await res.json();

setOrders(data);
};

return (

<div>

<h2>Track Your Order</h2>

<input
type="text"
placeholder="Enter Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
/>

<button onClick={handleSearch}>Track</button>

{orders.map(order => (

<div key={order.id}>

<h4>Order #{order.id}</h4>
<p>Status: {order.status}</p>
<p>Tracking ID: {order.tracking_id}</p>

</div>

))}

</div>
);
}

export default TrackOrder;