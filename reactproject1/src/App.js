import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "Urban Sneakers",
    description: "Everyday comfort with a clean streetwear profile.",
    price: 59,
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Canvas Backpack",
    description: "Carry essentials with sturdy fabric and soft straps.",
    price: 42,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Noise-Cancel Headphones",
    description: "Balanced sound and deep focus for long sessions.",
    price: 129,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Classic Watch",
    description: "Minimal dial with premium feel and timeless style.",
    price: 85,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
  },
];

function Navbar({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-shell sticky-top">
      <div className="container py-1">
        <Link className="navbar-brand brand-mark" to="/">
          NovaCart
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item mt-2 mt-lg-0 ms-lg-2">
              <NavLink className="btn btn-warning fw-semibold" to="/cart">
                Cart ({cartCount})
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero-wrap text-white">
        <div className="container py-5">
          <div className="row align-items-center g-4 py-4">
            <div className="col-lg-6">
              <p className="kicker mb-2">Limited Season Drop</p>
              <h1 className="display-5 fw-bold">
                Style, tech, and comfort in one cart.
              </h1>
              <p className="lead text-light-emphasis mt-3 mb-4">
                Explore curated essentials, fast checkout, and secure delivery
                for your everyday lifestyle.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link
                  to="/products"
                  className="btn btn-warning btn-lg fw-semibold"
                >
                  Shop Now
                </Link>
                <Link to="/contact" className="btn btn-outline-light btn-lg">
                  Talk to Us
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-card p-4 p-md-5">
                <h2 className="h4 fw-bold mb-3">Why NovaCart?</h2>
                <ul className="list-unstyled m-0 d-grid gap-3">
                  <li>Free shipping on orders above $99</li>
                  <li>Secure checkout with instant confirmation</li>
                  <li>7-day easy returns and responsive support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductsPage({ onAddToCart }) {
  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <p className="kicker text-dark mb-1">Catalog</p>
          <h2 className="mb-0">Featured Products</h2>
        </div>
      </div>
      <div className="row g-4">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="col-sm-6 col-lg-3">
            <article className="card product-card h-100 border-0 shadow-sm">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-light align-self-start mb-2">
                  {product.category}
                </span>
                <h3 className="h5 card-title">{product.name}</h3>
                <p className="card-text text-secondary">
                  {product.description}
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <strong>${product.price}</strong>
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() => onAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function CartPage({ cartItems, onAddToCart, onDecrease, onRemove }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty. Add products to continue.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Quantity controls"
                      >
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => onDecrease(item.id)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          disabled
                        >
                          {item.quantity}
                        </button>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => onAddToCart(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="m-0">Total: ${total}</h4>
            <Link to="/checkout" className="btn btn-success btn-lg">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </section>
  );
}

function CheckoutPage({ cartItems }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <section className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty. Go to <Link to="/products">products</Link> to
          place an order.
        </div>
      ) : (
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input id="fullName" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input id="email" type="email" className="form-control" required />
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input id="address" className="form-control" required />
          </div>
          <div className="col-md-6">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input id="city" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="zip" className="form-label">
              ZIP
            </label>
            <input id="zip" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label htmlFor="card" className="form-label">
              Card Number
            </label>
            <input id="card" className="form-control" required />
          </div>
          <div className="col-12">
            <button className="btn btn-primary btn-lg" type="submit">
              Place Order
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

function ContactPage() {
  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <p className="kicker text-dark mb-1">Support</p>
          <h2>Contact Us</h2>
          <p className="text-secondary">
            Have a question about orders, returns, or products? Send us a
            message and we will respond within 24 hours.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0">
              Email: support@novacart.com
            </li>
            <li className="list-group-item px-0">Phone: +1 (555) 231-9090</li>
            <li className="list-group-item px-0">
              Hours: Mon-Sat, 9 AM - 7 PM
            </li>
          </ul>
        </div>
        <div className="col-lg-7">
          <form className="card p-4 shadow-sm border-0 contact-card">
            <div className="mb-3">
              <label htmlFor="contactName" className="form-label">
                Name
              </label>
              <input id="contactName" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">
                Email
              </label>
              <input
                id="contactEmail"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contactMessage" className="form-label">
                Message
              </label>
              <textarea
                id="contactMessage"
                className="form-control"
                rows="5"
                required
              />
            </div>
            <button className="btn btn-dark">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function NotFoundPage() {
  return (
    <section className="container py-5 text-center">
      <h2>Page Not Found</h2>
      <p className="text-secondary">The page you requested does not exist.</p>
      <Link to="/" className="btn btn-outline-dark">
        Return Home
      </Link>
    </section>
  );
}

function AppShell() {
  const [cart, setCart] = useState({});

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const cartItems = useMemo(
    () =>
      PRODUCTS.filter((product) => cart[product.id])
        .map((product) => ({
          ...product,
          quantity: cart[product.id],
        }))
        .sort((a, b) => a.id - b.id),
    [cart],
  );

  const handleAddToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrease = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[productId]) {
        return prev;
      }
      next[productId] -= 1;
      if (next[productId] <= 0) {
        delete next[productId];
      }
      return next;
    });
  };

  const handleRemove = (productId) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={<ProductsPage onAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
