export default function HeroBanner({
  activeDestination,
  favoritesCount,
  plansCount,
}) {
  return (
    <header className="hero-banner">
      <div className="hero-copy">
        <p className="hero-kicker">Travel Destination Information Portal</p>
        <h1>Plan Better Journeys with Live Destination Insights</h1>
        <p>
          Explore destination cards, compare seasons and budgets, save
          favorites, and build your personal itinerary using React hooks and
          reusable components.
        </p>
        <div className="hero-metrics">
          <span>{favoritesCount} favorites saved</span>
          <span>{plansCount} travel plans drafted</span>
          <span>Updated destination index</span>
        </div>
      </div>
      <article className="hero-spotlight">
        <p className="spotlight-label">Currently Viewing</p>
        <h2>
          {activeDestination
            ? activeDestination.name
            : "No destination selected"}
        </h2>
        <p>
          {activeDestination
            ? activeDestination.summary
            : "Choose a destination card to see details."}
        </p>
      </article>
    </header>
  );
}
