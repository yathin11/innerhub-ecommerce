import React, { useState } from "react";
import "./Admin.css";

type OrderType = {
  id: number;
  status: string;
  tracking_id: string;
  total: number;
};

function Orders() {
  const [phone, setPhone] = useState<string>("");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const searchOrders = async (): Promise<void> => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Enter a valid 10 digit phone number");
      setOrders([]);
      return;
    }

    try {
      setIsSearching(true);
      setHasSearched(true);
      setError("");

      const res = await fetch(
  `https://innerhub-backend.onrender.com/api/orders/${cleanPhone}`
);

      if (!res.ok) {
        throw new Error("Unable to fetch orders");
      }

      const data: OrderType[] = await res.json();
      setOrders(data);
    } catch {
      setOrders([]);
      setError("Unable to fetch orders. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-header">
        <div>
          <p className="admin-kicker">Orders</p>
          <h1 className="admin-title">Search Orders</h1>
        </div>
      </div>

      <section className="admin-panel admin-panel-animated">
        <div className="admin-search-row">
          <input
            className="admin-input"
            placeholder="Enter phone number"
            value={phone}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            className="admin-btn primary"
            onClick={searchOrders}
            disabled={isSearching}
            type="button"
          >
            {isSearching ? (
              <>
                <span className="admin-spinner light"></span>
                Searching
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {error && <div className="admin-error-alert">{error}</div>}
      </section>

      <div className="admin-order-list">
        {orders.map((order) => (
          <article key={order.id} className="admin-order-card admin-row-animated">
            <div>
              <h3>Order #{order.id}</h3>
              <p>Status: {order.status}</p>
              <p>Tracking: {order.tracking_id || "Not assigned"}</p>
            </div>

            <strong>₹{order.total}</strong>
          </article>
        ))}

        {hasSearched && !isSearching && !error && orders.length === 0 && (
          <div className="admin-empty-state">
            <h2>No orders found</h2>
            <p>No customer orders match this phone number.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;