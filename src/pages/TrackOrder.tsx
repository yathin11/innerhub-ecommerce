import { useEffect, useState } from "react";
import "./TrackOrder.css";

type OrderType = {
  _id: string;
  status: string;
  tracking_id?: string;
};

type ScanType = {
  ScanDetail: {
    Scan: string;
    ScannedLocation: string;
    ScanDateTime: string;
  };
};

type TrackingType = {
  ShipmentData?: {
    Shipment?: {
      Scans: ScanType[];
    };
  }[];
};

function TrackOrder() {
  const [phone, setPhone] = useState<string>(() => localStorage.getItem("phone") || "");
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [trackingData, setTrackingData] = useState<TrackingType | null>(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState<boolean>(false);
  const [trackingAwb, setTrackingAwb] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchOrders = async (phoneNumber: string): Promise<void> => {
    const cleanPhone = phoneNumber.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Enter a valid 10 digit phone number");
      setOrders([]);
      return;
    }

    try {
      setIsLoadingOrders(true);
      setHasSearched(true);
      setError("");
      setTrackingData(null);

      localStorage.setItem("phone", cleanPhone);

      const res = await fetch(`https://innerhub-backend.onrender.com/api/orders/${cleanPhone}`);

      if (!res.ok) {
        throw new Error("Unable to fetch orders");
      }

      const data: OrderType[] = await res.json();
      setOrders(data);
    } catch {
      setOrders([]);
      setError("Unable to fetch orders. Please try again.");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");

    if (savedPhone) {
      fetchOrders(savedPhone);
    }
  }, []);

  const handleTrack = async (awb: string): Promise<void> => {
    try {
      setTrackingAwb(awb);
      setTrackingData(null);

      const res = await fetch(`https://innerhub-backend.onrender.com/api/delhivery/track/${awb}`);

      if (!res.ok) {
        throw new Error("Tracking failed");
      }

      const data: TrackingType = await res.json();
      setTrackingData(data);
    } catch {
      alert("Tracking failed");
    } finally {
      setTrackingAwb("");
    }
  };

  const scans = trackingData?.ShipmentData?.[0]?.Shipment?.Scans || [];

  return (
    <main className="track-page">
      <section className="track-header">
        <p className="track-kicker">YESSIX Orders</p>
        <h1>Track Your Order</h1>
        <p>
          Enter the mobile number used during checkout to view your order status.
        </p>
      </section>

      <section className="track-search-card">
        <div className="track-search-row">
          <input
            value={phone}
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="button"
            onClick={() => fetchOrders(phone)}
            disabled={isLoadingOrders}
          >
            {isLoadingOrders ? (
              <>
                <span className="track-spinner light"></span>
                Searching
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {error && <div className="track-error">{error}</div>}
      </section>

      <section className="orders-list">
        {orders.map((order) => (
          <article key={order._id} className="order-card">
            <div>
              <span className="order-label">Order ID</span>
              <h2>{order._id}</h2>

              <p>
                Status: <strong>{order.status}</strong>
              </p>

              <p>
                Tracking ID:{" "}
                <strong>{order.tracking_id || "Not available"}</strong>
              </p>
            </div>

            {order.tracking_id && (
              <button
                type="button"
                onClick={() => handleTrack(order.tracking_id!)}
                disabled={trackingAwb === order.tracking_id}
              >
                {trackingAwb === order.tracking_id ? (
                  <>
                    <span className="track-spinner light"></span>
                    Tracking
                  </>
                ) : (
                  "Track Live"
                )}
              </button>
            )}
          </article>
        ))}

        {hasSearched && !isLoadingOrders && !error && orders.length === 0 && (
          <div className="track-empty">
            <h2>No orders found</h2>
            <p>No orders are linked to this phone number yet.</p>
          </div>
        )}
      </section>

      {trackingData && (
        <section className="tracking-box">
          <p className="track-kicker">Live Tracking</p>
          <h2>Tracking Details</h2>

          {scans.length > 0 ? (
            <div className="scan-timeline">
              {scans.map((scan, i) => (
                <article key={i} className="scan">
                  <span></span>

                  <div>
                    <h3>{scan.ScanDetail.Scan}</h3>
                    <p>{scan.ScanDetail.ScannedLocation}</p>
                    <time>{scan.ScanDetail.ScanDateTime}</time>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="track-muted">No live tracking scans available yet.</p>
          )}
        </section>
      )}
    </main>
  );
}

export default TrackOrder;