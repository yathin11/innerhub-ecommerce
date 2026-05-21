import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";

type SizeType = {
  size: string;
  price: number;
  offerPrice: number;
  stock: number;
};

type VariantType = {
  color: string;
  images: string[];
  sizes: SizeType[];
};

type ProductType = {
  _id: string;
  name: string;
  description: string;
  variants: VariantType[];
};

type ProductDetailsProps = {
  product: ProductType;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartContext must be used inside CartProvider");
  }

  const { addToCart } = context;

  const [selectedVariant, setSelectedVariant] = useState<VariantType | undefined>(
    product?.variants?.[0]
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.variants?.[0]?.images?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) {
    return <p className="product-details-loading">Loading product...</p>;
  }

  const isOutOfStock = selectedSize ? selectedSize.stock <= 0 : false;
  const hasDiscount =
    selectedSize && selectedSize.price > selectedSize.offerPrice;

  const handleAddToCart = (): void => {
    if (!selectedSize || isOutOfStock) return;

    addToCart({
      productId: {
        _id: product._id,
        name: product.name,
        image: selectedImage,
        price: selectedSize.offerPrice || selectedSize.price,
      },
      quantity: 1,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <section className="product-details">
      <div className="image-section">
        <div className="main-image-wrap">
          {selectedImage ? (
            <img className="main-image" src={selectedImage} alt={product.name} />
          ) : (
            <div className="main-image main-image-empty">No Image</div>
          )}
        </div>
{selectedVariant && selectedVariant.images.length > 0 && (
  <div className="thumbnail-row">
    {selectedVariant.images.map((img, i) => (
      <button
        key={i}
        type="button"
        className={`thumbnail-btn ${selectedImage === img ? "active" : ""}`}
        onClick={() => setSelectedImage(img)}
      >
        <img src={img} alt={`${product.name} view ${i + 1}`} />
      </button>
    ))}
  </div>
)}
      </div>

      <div className="details-section">
        <p className="product-kicker">YESSIX Essentials</p>

        <h1>{product.name}</h1>

        <p className="desc">{product.description}</p>

        {selectedSize ? (
          <div className="price-box">
            <span className="price">₹{selectedSize.offerPrice}</span>

            {hasDiscount && (
              <>
                <span className="old-price">₹{selectedSize.price}</span>

                <span className="discount">
                  {Math.round(
                    ((selectedSize.price - selectedSize.offerPrice) /
                      selectedSize.price) *
                      100
                  )}
                  % OFF
                </span>
              </>
            )}
          </div>
        ) : (
          <p className="select-note">Select a size to view price and stock.</p>
        )}

        <div className="option-block">
          <h2>Colors</h2>

          <div className="color-row">
            {product.variants.map((v, i) => (
              <button
                key={i}
                type="button"
                className={selectedVariant === v ? "color active" : "color"}
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
        </div>

        <div className="option-block">
          <h2>Sizes</h2>

          <div className="size-row">
            {selectedVariant?.sizes.map((s, i) => (
              <button
                key={i}
                type="button"
                className={selectedSize === s ? "size active" : "size"}
                onClick={() => setSelectedSize(s)}
                disabled={s.stock <= 0}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        {selectedSize && (
          <p className={isOutOfStock ? "stock out" : "stock"}>
            {isOutOfStock
              ? "Out of Stock"
              : `In Stock (${selectedSize.stock})`}
          </p>
        )}

        <button
          className={`add-btn ${added ? "added" : ""}`}
          type="button"
          disabled={!selectedSize || isOutOfStock}
          onClick={handleAddToCart}
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </section>
  );
}