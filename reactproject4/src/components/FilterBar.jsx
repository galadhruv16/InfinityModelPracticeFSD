export default function FilterBar({
  query,
  onQueryChange,
  region,
  onRegionChange,
  season,
  onSeasonChange,
  sortBy,
  onSortByChange,
  regions,
  seasons,
  searchRef,
}) {
  return (
    <section className="filter-bar">
      <label>
        Search
        <input
          ref={searchRef}
          type="search"
          value={query}
          placeholder="Try: hiking, culture, beach"
          onChange={(event) => onQueryChange(event.target.value)}
          aria-label="Search destinations"
        />
      </label>

      <label>
        Region
        <select
          value={region}
          onChange={(event) => onRegionChange(event.target.value)}
        >
          {regions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Season
        <select
          value={season}
          onChange={(event) => onSeasonChange(event.target.value)}
        >
          {seasons.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Sort By
        <select
          value={sortBy}
          onChange={(event) => onSortByChange(event.target.value)}
        >
          <option value="score-desc">Top Rated</option>
          <option value="budget-asc">Budget: Low to High</option>
          <option value="flight-asc">Shortest Flight</option>
          <option value="name-asc">Name A-Z</option>
        </select>
      </label>
    </section>
  );
}
