import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Products.css";

type SizeType = {
  price?: number;
  offerPrice?: number;
};

type VariantType = {
  images?: string[];
  sizes?: SizeType[];
};

type ProductType = {
  _id: string;
  name: string;
  basePrice: number;
  variants?: VariantType[];
};

export default function Products() {
  const context = useContext(CartContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedId, setAddedId] = useState<string>("");

  if (!context) {
    throw new Error("CartContext must be used inside CartProvider");
  }

  const { addToCart } = context;

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://innerhub-backend.onrender.com/api/products"
        );

        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductData = (product: ProductType) => {
    const image =
      product.variants?.[0]?.images?.[0] ||
      "https://via.placeholder.com/500x650?text=YESSIX";

    const price =
      product.variants?.[0]?.sizes?.[0]?.offerPrice ||
      product.variants?.[0]?.sizes?.[0]?.price ||
      product.basePrice;

    const oldPrice = product.variants?.[0]?.sizes?.[0]?.price || product.basePrice;

    const discount =
      oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

    return {
      image,
      price,
      oldPrice,
      discount,
    };
  };

  const handleAddToCart = (product: ProductType): void => {
    const { image, price } = getProductData(product);

    addToCart({
      productId: {
        _id: product._id,
        name: product.name,
        image,
        price: Number(price),
      },
      quantity: 1,
    });

    setAddedId(product._id);

    window.setTimeout(() => {
      setAddedId("");
    }, 1100);
  };

  const handleBuyNow = (product: ProductType): void => {
    handleAddToCart(product);
    navigate("/checkout");
  };

  if (loading) {
    return (
      <section className="products-section">
        <div className="products-heading">
          <p>YESSIX Store</p>
          <h2>Men&apos;s Innerwear Collection</h2>
        </div>

        <div className="products-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="product-card product-skeleton" key={item}></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <motion.div
        className="products-heading"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <p>YESSIX Store</p>
        <h2>Men&apos;s Innerwear Collection</h2>
      </motion.div>

      <div className="products-grid">
        {products.map((item, index) => {
          const { image, price, oldPrice, discount } = getProductData(item);

          return (
            <motion.article
              className="product-card"
              key={item._id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="product-image">
                <img src={image} alt={item.name} />

                {discount > 0 && (
                  <span className="discount-badge">{discount}% OFF</span>
                )}

                <div className="image-overlay">
                  <button
                    className="quick-buy"
                    type="button"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="product-info">
                <p className="brand">YESSIX</p>

                <h3>{item.name}</h3>

                <div className="price-row">
                  <span className="product-price">₹{price}</span>

                  {oldPrice > price && (
                    <span className="product-old-price">₹{oldPrice}</span>
                  )}
                </div>

                <div className="rating">4.5 Rated Essential</div>

                <button
                  className={`add-cart-btn ${addedId === item._id ? "added" : ""}`}
                  type="button"
                  onClick={() => handleAddToCart(item)}
                >
                  {addedId === item._id ? "Added" : "Add to Cart"}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}