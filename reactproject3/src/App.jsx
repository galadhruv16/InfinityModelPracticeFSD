import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Trailblaze Sneakers",
    category: "Footwear",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Breathable knit trainers built for daily miles and all-day comfort.",
  },
  {
    id: 2,
    name: "AeroFit Performance Tee",
    category: "Apparel",
    price: 1299,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description:
      "Sweat-wicking athletic tee with stretch mesh panels for airflow.",
  },
  {
    id: 3,
    name: "HydraSmart Bottle",
    category: "Accessories",
    price: 899,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    description: "Insulated bottle that keeps drinks cold for 18 hours.",
  },
  {
    id: 4,
    name: "Summit Daypack 20L",
    category: "Accessories",
    price: 1899,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80",
    description:
      "Compact everyday backpack with padded straps and laptop sleeve.",
  },
  {
    id: 5,
    name: "Pulse Smart Watch",
    category: "Tech",
    price: 4999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Track workouts, sleep, and heart rate with week-long battery life.",
  },
  {
    id: 6,
    name: "ZenGrip Yoga Mat",
    category: "Fitness",
    price: 1599,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=900&q=80",
    description:
      "Non-slip textured mat designed for balance and joint support.",
  },
];

const highlights = [
  {
    id: 1,
    title: "Fast Dispatch",
    text: "Orders ship in under 24 hours from curated local hubs.",
  },
  {
    id: 2,
    title: "Curated Products",
    text: "Only top-rated products selected by our in-house team.",
  },
  {
    id: 3,
    title: "Easy Returns",
    text: "7-day no-questions replacement on every item.",
  },
];

const currency = (value) => `Rs ${value.toLocaleString("en-IN")}`;

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case "increase":
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    case "decrease":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0);
    case "remove":
      return state.filter((item) => item.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

const initCart = () => {
  try {
    const saved = localStorage.getItem("reactproject3-cart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function App() {
  const [cart, dispatch] = useReducer(cartReducer, [], initCart);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [coupon, setCoupon] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [checkoutData, setCheckoutData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const couponRef = useRef(null);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [],
  );

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = category === "All" || product.category === category;
      const matchesSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      return inCategory && matchesSearch;
    });
  }, [category, searchTerm]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const discount = Math.round(subtotal * discountRate);
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.08);
    const shipping = subtotal === 0 ? 0 : subtotal > 5000 ? 0 : 149;
    return {
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      discount,
      tax,
      shipping,
      grandTotal: taxable + tax + shipping,
    };
  }, [cart, discountRate]);

  useEffect(() => {
    localStorage.setItem("reactproject3-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.title = `Cart (${totals.items}) | Infinity Market`;
  }, [totals.items]);

  useEffect(() => {
    couponRef.current?.focus();
  }, []);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      setDiscountRate(0.1);
      setStatusMessage("Coupon applied: 10% off on products.");
      return;
    }
    setDiscountRate(0);
    setStatusMessage("Invalid coupon code. Try SAVE10.");
  };

  const handleCheckoutField = (event) => {
    const { name, value } = event.target;
    setCheckoutData((previous) => ({ ...previous, [name]: value }));
  };

  const handleCheckoutSubmit = (event) => {
    event.preventDefault();

    const values = Object.values(checkoutData).map((value) => value.trim());
    if (values.some((value) => value.length === 0)) {
      setStatusMessage("Please complete all checkout fields.");
      return;
    }

    if (cart.length === 0) {
      setStatusMessage("Your cart is empty. Add items before checkout.");
      return;
    }

    setStatusMessage(
      `Order placed for ${checkoutData.fullName}. Total: ${currency(totals.grandTotal)}.`,
    );
    dispatch({ type: "clear" });
    setCheckoutData({
      fullName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
    });
    setCoupon("");
    setDiscountRate(0);
    couponRef.current?.focus();
  };

  return (
    <div className="store-shell">
      <header className="store-header">
        <div>
          <p className="kicker">React Hooks E-Commerce Demo</p>
          <h1>Infinity Market</h1>
          <p>
            Discover trend-forward essentials with bold design, rich visuals,
            and a smooth shopping flow powered by React hooks.
          </p>
          <div className="header-pills">
            <span>Free shipping over Rs 5,000</span>
            <span>Coupon: SAVE10</span>
            <span>Secure Checkout</span>
          </div>
        </div>
        <div className="hero-spotlight">
          <img
            src="https://imgs.search.brave.com/oJcojeXcxS-eCjwaQ_5HWEw0oIXmDR5oxWiTxqMxq-c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbXMu/Y2dpZnVybml0dXJl/LmNvbS9jZG4tY2dp/L2ltYWdlL3c9MTI4/MCxoPTk2MCxmPWF1/dG8vdXBsb2Fkcy9w/cm9kdWN0X2xpZmVz/dHlsZV92aXN1YWxp/emF0aW9uX21vdGlv/bl85MzI5N2UwNGVh/LmpwZw"
            alt="Lifestyle product showcase"
          />
          <div>
            <p>Editor Pick</p>
            <h3>Weekend Performance Bundle</h3>
            <small>Built for city workouts and quick getaways.</small>
          </div>
        </div>
      </header>

      <section className="highlights-grid">
        {highlights.map((item) => (
          <article key={item.id} className="highlight-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <main className="store-grid">
        <section className="panel catalog-panel">
          <div className="panel-heading">
            <h2>Product Catalog</h2>
            <span>{filteredProducts.length} items shown</span>
          </div>

          <div className="filters">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              aria-label="Search products"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-meta">
                  <p className="product-category">{product.category}</p>
                  <span>{product.rating}/5</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                  <strong>{currency(product.price)}</strong>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "add", product })}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel cart-panel">
          <div className="panel-heading">
            <h2>Shopping Cart</h2>
            <span>{totals.items} units</span>
          </div>

          <div className="cart-list">
            {cart.length === 0 ? (
              <p className="empty-state">Your cart is currently empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-image"
                  />
                  <div className="cart-copy">
                    <h3>{item.name}</h3>
                    <p>{currency(item.price)} each</p>
                  </div>
                  <div className="qty-controls">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "decrease", id: item.id })
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "increase", id: item.id })
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove"
                    onClick={() => dispatch({ type: "remove", id: item.id })}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="coupon-row">
            <input
              ref={couponRef}
              type="text"
              placeholder="Coupon code (SAVE10)"
              value={coupon}
              onChange={(event) => setCoupon(event.target.value)}
            />
            <button type="button" onClick={applyCoupon}>
              Apply
            </button>
          </div>

          <div className="totals">
            <p>
              <span>Subtotal</span>
              <strong>{currency(totals.subtotal)}</strong>
            </p>
            <p>
              <span>Discount</span>
              <strong>-{currency(totals.discount)}</strong>
            </p>
            <p>
              <span>Tax (8%)</span>
              <strong>{currency(totals.tax)}</strong>
            </p>
            <p>
              <span>Shipping</span>
              <strong>{currency(totals.shipping)}</strong>
            </p>
            <p className="grand-total">
              <span>Total</span>
              <strong>{currency(totals.grandTotal)}</strong>
            </p>
          </div>
        </section>

        <section className="panel checkout-panel">
          <div className="panel-heading">
            <h2>Checkout Form</h2>
            <span>Secure payment simulated</span>
          </div>
          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                value={checkoutData.fullName}
                onChange={handleCheckoutField}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={checkoutData.email}
                onChange={handleCheckoutField}
              />
            </label>
            <label>
              Address
              <input
                type="text"
                name="address"
                value={checkoutData.address}
                onChange={handleCheckoutField}
              />
            </label>
            <div className="inline-fields">
              <label>
                City
                <input
                  type="text"
                  name="city"
                  value={checkoutData.city}
                  onChange={handleCheckoutField}
                />
              </label>
              <label>
                Postal Code
                <input
                  type="text"
                  name="postalCode"
                  value={checkoutData.postalCode}
                  onChange={handleCheckoutField}
                />
              </label>
            </div>
            <button type="submit">Place Order</button>
          </form>

          {statusMessage && <p className="status-message">{statusMessage}</p>}
        </section>
      </main>

      <footer className="store-footer">
        Hooks used: useState, useReducer, useMemo, useEffect, useRef
      </footer>
    </div>
  );
}

export default App;
