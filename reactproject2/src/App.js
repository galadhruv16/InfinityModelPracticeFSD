import { useMemo, useState } from "react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const DESTINATIONS = [
  {
    id: "kyoto",
    name: "Kyoto, Japan",
    region: "Asia",
    bestSeason: "March to May",
    budget: "$$ - $$$",
    heroImage:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80",
    shortDescription:
      "Ancient temples, lantern-lit streets, and peaceful bamboo groves.",
    highlights: [
      "Fushimi Inari Shrine",
      "Arashiyama Bamboo Forest",
      "Gion District",
    ],
    details:
      "Kyoto is ideal for travelers who love history, food culture, and calm neighborhoods. Explore shrines early in the morning and enjoy traditional tea houses in the evening.",
  },
  {
    id: "interlaken",
    name: "Interlaken, Switzerland",
    region: "Europe",
    bestSeason: "June to September",
    budget: "$$$",
    heroImage:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    shortDescription:
      "Mountain adventures between crystal lakes and alpine villages.",
    highlights: ["Jungfraujoch", "Harder Kulm", "Lake Thun Cruise"],
    details:
      "Interlaken offers hiking, paragliding, and train journeys with dramatic panoramic views. It is a top choice for adventure and nature-focused travel plans.",
  },
  {
    id: "cape-town",
    name: "Cape Town, South Africa",
    region: "Africa",
    bestSeason: "November to March",
    budget: "$$ - $$$",
    heroImage:
      "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1200&q=80",
    shortDescription:
      "Coastline drives, rich culture, and iconic mountain views.",
    highlights: ["Table Mountain", "Cape Peninsula", "Bo-Kaap"],
    details:
      "Cape Town balances beaches, food, and cultural exploration. Travelers can enjoy sunset hikes, local markets, and nearby wine valleys.",
  },
  {
    id: "queenstown",
    name: "Queenstown, New Zealand",
    region: "Oceania",
    bestSeason: "December to February",
    budget: "$$ - $$$",
    heroImage:
      "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=1200&q=80",
    shortDescription:
      "A scenic base for lakeside relaxation and outdoor thrills.",
    highlights: ["Milford Sound Day Trip", "Skyline Gondola", "Lake Wakatipu"],
    details:
      "Queenstown is known for adrenaline sports and dramatic landscapes. It is perfect for active itineraries with world-class nature photography opportunities.",
  },
];

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top portal-nav">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          GlobeGuide
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#portalNav"
          aria-controls="portalNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="portalNav">
          <ul className="navbar-nav ms-auto gap-lg-2">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/destinations" className="nav-link">
                Destinations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
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
    <section className="hero-section text-white">
      <div className="container py-5">
        <div className="row align-items-center g-4 py-lg-5">
          <div className="col-lg-7">
            <p className="eyebrow mb-2">
              Travel Destination Information Portal
            </p>
            <h1 className="display-5 fw-bold mb-3">
              Discover your next destination with practical travel insights.
            </h1>
            <p className="lead text-light-emphasis mb-4">
              Compare regions, check the best season, explore key highlights,
              and build confident travel plans faster.
            </p>
            <Link
              className="btn btn-warning btn-lg fw-semibold"
              to="/destinations"
            >
              Explore Destinations
            </Link>
          </div>
          <div className="col-lg-5">
            <div className="hero-panel p-4">
              <h2 className="h5 fw-bold">Quick Benefits</h2>
              <ul className="list-unstyled mb-0 d-grid gap-2">
                <li>Region-wise destination catalog</li>
                <li>Best season and budget indicators</li>
                <li>Detail pages with attractions and context</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");

  const regions = useMemo(
    () => [
      "All",
      ...new Set(DESTINATIONS.map((destination) => destination.region)),
    ],
    [],
  );

  const filteredDestinations = useMemo(
    () =>
      DESTINATIONS.filter((destination) => {
        const matchesSearch = destination.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase());
        const matchesRegion =
          regionFilter === "All" || destination.region === regionFilter;
        return matchesSearch && matchesRegion;
      }),
    [regionFilter, searchTerm],
  );

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="eyebrow text-dark mb-1">Curated List</p>
          <h2 className="mb-0">Popular Destinations</h2>
        </div>
        <div className="d-flex gap-2 flex-column flex-sm-row">
          <input
            className="form-control"
            placeholder="Search destination"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select
            className="form-select"
            value={regionFilter}
            onChange={(event) => setRegionFilter(event.target.value)}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {filteredDestinations.map((destination) => (
          <div key={destination.id} className="col-md-6 col-lg-4">
            <article className="card destination-card h-100 border-0 shadow-sm">
              <img
                src={destination.heroImage}
                className="card-img-top"
                alt={destination.name}
              />
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-light align-self-start mb-2">
                  {destination.region}
                </span>
                <h3 className="h5">{destination.name}</h3>
                <p className="text-secondary">{destination.shortDescription}</p>
                <p className="mb-2">
                  <strong>Best Season:</strong> {destination.bestSeason}
                </p>
                <p className="mb-3">
                  <strong>Budget:</strong> {destination.budget}
                </p>
                <Link
                  className="btn btn-outline-dark mt-auto"
                  to={`/destinations/${destination.id}`}
                >
                  View Details
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

function DestinationDetailsPage() {
  const { destinationId } = useParams();
  const destination = DESTINATIONS.find((entry) => entry.id === destinationId);

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <section className="container py-5">
      <div className="row g-4 align-items-start">
        <div className="col-lg-6">
          <img
            src={destination.heroImage}
            className="img-fluid rounded-4 shadow-sm"
            alt={destination.name}
          />
        </div>
        <div className="col-lg-6">
          <span className="badge text-bg-light mb-2">{destination.region}</span>
          <h2>{destination.name}</h2>
          <p className="text-secondary">{destination.details}</p>
          <p className="mb-2">
            <strong>Best Season:</strong> {destination.bestSeason}
          </p>
          <p className="mb-4">
            <strong>Budget:</strong> {destination.budget}
          </p>
          <h3 className="h5">Top Highlights</h3>
          <ul className="list-group list-group-flush mb-4">
            {destination.highlights.map((highlight) => (
              <li key={highlight} className="list-group-item px-0">
                {highlight}
              </li>
            ))}
          </ul>
          <Link className="btn btn-dark" to="/destinations">
            Back to Destinations
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="container py-5">
      <div className="col-lg-8 p-0">
        <p className="eyebrow text-dark mb-1">About Portal</p>
        <h2>Plan Better Trips With Focused Information</h2>
        <p className="text-secondary">
          GlobeGuide helps travelers compare destinations quickly through
          consistent details: region, season, budget, and must-visit highlights.
          The portal is designed for students and beginner travelers who want
          reliable snapshots before deeper planning.
        </p>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="container py-5">
      <div className="row g-4">
        <div className="col-lg-5">
          <p className="eyebrow text-dark mb-1">Get In Touch</p>
          <h2>Contact Us</h2>
          <p className="text-secondary">
            Need recommendations for your route or destination list? Send us
            your travel preferences and we will get back to you.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0">
              Email: hello@globeguide.com
            </li>
            <li className="list-group-item px-0">Phone: +1 (555) 198-7788</li>
            <li className="list-group-item px-0">
              Hours: Mon-Fri, 10 AM - 6 PM
            </li>
          </ul>
        </div>
        <div className="col-lg-7">
          <form className="card border-0 shadow-sm p-4 contact-card">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input id="name" className="form-control" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                className="form-control"
                rows="5"
                required
              />
            </div>
            <button className="btn btn-warning fw-semibold" type="submit">
              Send Message
            </button>
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
      <p className="text-secondary">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-outline-dark">
        Return Home
      </Link>
    </section>
  );
}

function AppShell() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route
          path="/destinations/:destinationId"
          element={<DestinationDetailsPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
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
