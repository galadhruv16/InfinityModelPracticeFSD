import DestinationCard from "./DestinationCard.jsx";

export default function DestinationGrid({
  destinations,
  selectedId,
  favoriteIds,
  onSelect,
  onToggleFavorite,
}) {
  if (destinations.length === 0) {
    return (
      <section className="destination-grid empty-grid">
        <p>
          No destinations match your filters. Adjust search, region, or season.
        </p>
      </section>
    );
  }

  return (
    <section className="destination-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          isSelected={selectedId === destination.id}
          isFavorite={favoriteIds.includes(destination.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}
