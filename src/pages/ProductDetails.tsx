import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext);

  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0]
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.variants?.[0]?.images?.[0]
  );

  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">

      {/* LEFT - IMAGES */}
      <div className="image-section">
        <img className="main-image" src={selectedImage} alt="" />

        <div className="thumbnail-row">
          {selectedVariant?.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={selectedImage === img ? "active" : ""}
            />
          ))}
        </div>
      </div>

      {/* RIGHT - DETAILS */}
      <div className="details-section">

        <h2>{product.name}</h2>
        <p className="desc">{product.description}</p>

        {/* PRICE */}
        {selectedSize && (
          <div className="price-box">
            <span className="price">₹{selectedSize.offerPrice}</span>
            <span className="old-price">₹{selectedSize.price}</span>
            <span className="discount">
              {Math.round(
                ((selectedSize.price - selectedSize.offerPrice) /
                  selectedSize.price) *
                  100
              )}
              % OFF
            </span>
          </div>
        )}

        {/* COLORS */}
        <h4>Colors</h4>
        <div className="color-row">
          {product.variants.map((v, i) => (
            <button
              key={i}
              className={
                selectedVariant === v ? "color active" : "color"
              }
              onClick={() => {
                setSelectedVariant(v);
                setSelectedImage(v.images[0]);
                setSelectedSize(null);
              }}
            >
              {v.color}
            </button>
          ))}
        </div>

        {/* SIZES */}
        <h4>Sizes</h4>
        <div className="size-row">
          {selectedVariant?.sizes.map((s, i) => (
            <button
              key={i}
              className={
                selectedSize === s ? "size active" : "size"
              }
              onClick={() => setSelectedSize(s)}
            >
              {s.size}
            </button>
          ))}
        </div>

        {/* STOCK */}
        {selectedSize && (
          <p className="stock">
            {selectedSize.stock > 0
              ? `In Stock (${selectedSize.stock})`
              : "Out of Stock"}
          </p>
        )}

        {/* ADD TO CART */}
        <button
          className="add-btn"
          disabled={!selectedSize}
          onClick={() =>
            addToCart({
              ...product,
              selectedVariant,
              selectedSize,
              image: selectedImage,
            })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}