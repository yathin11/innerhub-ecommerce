type ProductType = {
  _id: string;
  name: string;
  image?: string;
  price: number;
};

type CartItemProps = {
  item: {
    productId: ProductType;
    quantity: number;
  };

  removeFromCart: (
    id: string
  ) => void;
};

export default function CartItem({
  item,
  removeFromCart,
}: CartItemProps) {

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "16px",
        borderBottom:
          "1px solid #eee",
      }}
    >

      <img
        src={
          item.productId.image ||
          "https://via.placeholder.com/100"
        }
        alt={
          item.productId.name
        }
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <div
        style={{
          flex: 1,
        }}
      >

        <h3>
          {
            item.productId.name
          }
        </h3>

        <p>
          ₹
          {
            item.productId.price
          }
        </p>

        <p>
          Qty:
          {
            item.quantity
          }
        </p>

        <button
          onClick={() =>
            removeFromCart(
              item.productId._id
            )
          }
          style={{
            marginTop: "10px",
            padding:
              "8px 14px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Remove
        </button>

      </div>
    </div>
  );
}