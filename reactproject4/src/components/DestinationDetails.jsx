const inr = (amount) => `Rs ${amount.toLocaleString("en-IN")}`;

export default function DestinationDetails({
  destination,
  isFavorite,
  onToggleFavorite,
}) {
  if (!destination) {
    return (
      <section className="details-panel">
        <h2>Destination Details</h2>
        <p>Select a destination to view detailed information.</p>
      </section>
    );
  }

  return (
    <section className="details-panel">
      <div className="panel-head">
        <h2>{destination.name}</h2>
        <button
          type="button"
          className="ghost"
          onClick={() => onToggleFavorite(destination.id)}
        >
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </button>
      </div>
      <p className="details-country">{destination.country}</p>
      <p>{destination.summary}</p>
      <ul className="details-stats">
        <li>Best Season: {destination.season}</li>
        <li>Approx Budget: {inr(destination.budget)}</li>
        <li>Flight Time: {destination.flightHours} hours</li>
      </ul>
      <h3>Highlights</h3>
      <ul className="details-highlights">
        {destination.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="tag-row">
        {destination.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </section>
  );
}
