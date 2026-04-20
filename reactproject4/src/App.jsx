import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import "./App.css";
import { destinations } from "./data/destinations.js";
import HeroBanner from "./components/HeroBanner.jsx";
import FilterBar from "./components/FilterBar.jsx";
import DestinationGrid from "./components/DestinationGrid.jsx";
import DestinationDetails from "./components/DestinationDetails.jsx";
import TripPlannerForm, {
  createInitialPlanner,
} from "./components/TripPlannerForm.jsx";
import SavedPlans from "./components/SavedPlans.jsx";

function favoritesReducer(state, action) {
  switch (action.type) {
    case "toggle": {
      if (state.includes(action.id)) {
        return state.filter((item) => item !== action.id);
      }
      return [...state, action.id];
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

function plansReducer(state, action) {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "remove":
      return state.filter((plan) => plan.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

function initFavorites() {
  try {
    const raw = localStorage.getItem("reactproject4-favorites");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function initPlans() {
  try {
    const raw = localStorage.getItem("reactproject4-plans");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function sortDestinations(list, sortBy) {
  const sorted = [...list];
  if (sortBy === "score-desc") {
    sorted.sort((a, b) => b.score - a.score);
  } else if (sortBy === "budget-asc") {
    sorted.sort((a, b) => a.budget - b.budget);
  } else if (sortBy === "flight-asc") {
    sorted.sort((a, b) => a.flightHours - b.flightHours);
  } else if (sortBy === "name-asc") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sorted;
}

function App() {
  const [favorites, dispatchFavorites] = useReducer(
    favoritesReducer,
    [],
    initFavorites,
  );
  const [plans, dispatchPlans] = useReducer(plansReducer, [], initPlans);

  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [season, setSeason] = useState("All");
  const [sortBy, setSortBy] = useState("score-desc");
  const [selectedId, setSelectedId] = useState(destinations[0]?.id ?? null);
  const [planner, setPlanner] = useState(createInitialPlanner);
  const [statusMessage, setStatusMessage] = useState("");
  const searchRef = useRef(null);

  const regions = useMemo(
    () => ["All", ...new Set(destinations.map((item) => item.region))],
    [],
  );

  const seasons = useMemo(
    () => ["All", ...new Set(destinations.map((item) => item.season))],
    [],
  );

  const filteredDestinations = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = destinations.filter((item) => {
      const inRegion = region === "All" || item.region === region;
      const inSeason = season === "All" || item.season === season;
      const matchesQuery =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.country.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.tags.join(" ").toLowerCase().includes(term);
      return inRegion && inSeason && matchesQuery;
    });

    return sortDestinations(filtered, sortBy);
  }, [query, region, season, sortBy]);

  const selectedDestination = useMemo(
    () =>
      filteredDestinations.find((item) => item.id === selectedId) ??
      filteredDestinations[0] ??
      null,
    [filteredDestinations, selectedId],
  );

  useEffect(() => {
    localStorage.setItem("reactproject4-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("reactproject4-plans", JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    document.title = `Travel Portal (${filteredDestinations.length})`;
  }, [filteredDestinations.length]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selectedDestination && filteredDestinations.length > 0) {
      setSelectedId(filteredDestinations[0].id);
      return;
    }

    if (selectedDestination && selectedId !== selectedDestination.id) {
      setSelectedId(selectedDestination.id);
    }
  }, [filteredDestinations, selectedDestination, selectedId]);

  const handlePlannerChange = (event) => {
    const { name, value } = event.target;
    setPlanner((previous) => ({
      ...previous,
      [name]: name === "companions" ? Math.max(1, Number(value || 1)) : value,
    }));
  };

  const handlePlanSubmit = () => {
    if (!selectedDestination) {
      setStatusMessage("Select a destination before saving a plan.");
      return;
    }

    if (!planner.traveler.trim() || !planner.month || !planner.budget) {
      setStatusMessage("Traveler name, month, and budget are required.");
      return;
    }

    const plan = {
      id: crypto.randomUUID(),
      destinationName: selectedDestination.name,
      traveler: planner.traveler.trim(),
      month: planner.month,
      budget: `Rs ${Number(planner.budget).toLocaleString("en-IN")}`,
      companions: Number(planner.companions),
      notes: planner.notes.trim(),
      createdAt: new Date().toLocaleString(),
    };

    dispatchPlans({ type: "add", payload: plan });
    setPlanner(createInitialPlanner());
    setStatusMessage(`Plan saved for ${plan.destinationName}.`);
  };

  return (
    <div className="portal-shell">
      <HeroBanner
        activeDestination={selectedDestination}
        favoritesCount={favorites.length}
        plansCount={plans.length}
      />

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        region={region}
        onRegionChange={setRegion}
        season={season}
        onSeasonChange={setSeason}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        regions={regions}
        seasons={seasons}
        searchRef={searchRef}
      />

      <main className="portal-layout">
        <section>
          <div className="section-head">
            <h2>Destination Index</h2>
            <p>{filteredDestinations.length} destinations matched</p>
          </div>
          <DestinationGrid
            destinations={filteredDestinations}
            selectedId={selectedDestination?.id ?? null}
            favoriteIds={favorites}
            onSelect={setSelectedId}
            onToggleFavorite={(id) => dispatchFavorites({ type: "toggle", id })}
          />
        </section>

        <aside className="portal-sidebar">
          <DestinationDetails
            destination={selectedDestination}
            isFavorite={
              selectedDestination
                ? favorites.includes(selectedDestination.id)
                : false
            }
            onToggleFavorite={(id) => dispatchFavorites({ type: "toggle", id })}
          />

          <TripPlannerForm
            planner={planner}
            onFieldChange={handlePlannerChange}
            selectedDestination={selectedDestination}
            onSubmit={handlePlanSubmit}
          />

          <SavedPlans
            plans={plans}
            onRemove={(id) => dispatchPlans({ type: "remove", id })}
            onClear={() => dispatchPlans({ type: "clear" })}
          />
        </aside>
      </main>

      {statusMessage && <p className="status-message">{statusMessage}</p>}

      <footer className="portal-footer">
        Hooks used: useState, useReducer, useMemo, useEffect, useRef
      </footer>
    </div>
  );
}

export default App;
