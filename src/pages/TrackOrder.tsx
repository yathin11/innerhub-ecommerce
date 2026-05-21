import { useEffect, useState } from "react";
import "./TrackOrder.css";

function TrackOrder() {
  const [orders, setOrders] = useState([]);
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    const phone = localStorage.getItem("phone");

    fetch(`http://localhost:5000/api/orders/${phone}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  // 🔥 Fetch Delhivery Tracking
  const handleTrack = async (awb) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/delhivery/track/${awb}`
      );
      const data = await res.json();

      setTrackingData(data);
    } catch (err) {
      alert("Tracking failed");
    }
  };

  return (
    <div className="track-container">
      <h2>Your Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">

          <p>Order ID: {order._id}</p>
          <p>Status: {order.status}</p>

          <p>
            Tracking ID:{" "}
            {order.tracking_id || "Not available"}
          </p>

          {order.tracking_id && (
            <button onClick={() => handleTrack(order.tracking_id)}>
              Track Live
            </button>
          )}
        </div>
      ))}

      {/* 🔥 SHOW TRACKING RESULT */}
      {trackingData && (
        <div className="tracking-box">
          <h3>Tracking Details</h3>

          {trackingData?.ShipmentData?.[0]?.Shipment?.Scans.map(
            (scan, i) => (
              <div key={i} className="scan">
                <p><b>Status:</b> {scan.ScanDetail.Scan}</p>
                <p><b>Location:</b> {scan.ScanDetail.ScannedLocation}</p>
                <p><b>Date:</b> {scan.ScanDetail.ScanDateTime}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default TrackOrder;