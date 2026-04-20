const inr = (amount) => `Rs ${amount.toLocaleString("en-IN")}`;

export default function DestinationCard({
  destination,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
}) {
  return (
    <article className={`destination-card ${isSelected ? "selected" : ""}`}>
      <img src={destination.image} alt={destination.name} />
      <div className="destination-content">
        <div className="destination-line">
          <p>{destination.region}</p>
          <span>{destination.score.toFixed(1)} / 5</span>
        </div>
        <h3>{destination.name}</h3>
        <p>{destination.country}</p>
        <p className="destination-summary">{destination.summary}</p>
        <div className="destination-meta">
          <span>{destination.season}</span>
          <span>{destination.flightHours}h flight</span>
          <span>{inr(destination.budget)}</span>
        </div>
        <div className="destination-actions">
          <button type="button" onClick={() => onSelect(destination.id)}>
            View Details
          </button>
          <button
            type="button"
            className="ghost"
            onClick={() => onToggleFavorite(destination.id)}
          >
            {isFavorite ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </article>
  );
}
