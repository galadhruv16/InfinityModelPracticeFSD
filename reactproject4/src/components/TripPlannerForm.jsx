const initialPlanner = {
  traveler: "",
  month: "",
  budget: "",
  companions: 1,
  notes: "",
};

export const createInitialPlanner = () => ({ ...initialPlanner });

export default function TripPlannerForm({
  planner,
  onFieldChange,
  selectedDestination,
  onSubmit,
}) {
  return (
    <section className="planner-panel">
      <h2>Build Trip Plan</h2>
      <p>
        {selectedDestination
          ? `Planning for ${selectedDestination.name}`
          : "Choose a destination to begin planning."}
      </p>
      <form
        className="planner-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label>
          Traveler Name
          <input
            type="text"
            name="traveler"
            value={planner.traveler}
            onChange={onFieldChange}
            placeholder="Your name"
          />
        </label>
        <label>
          Travel Month
          <input
            type="month"
            name="month"
            value={planner.month}
            onChange={onFieldChange}
          />
        </label>
        <label>
          Budget (INR)
          <input
            type="number"
            name="budget"
            value={planner.budget}
            onChange={onFieldChange}
            min="1000"
            placeholder="65000"
          />
        </label>
        <label>
          Companions
          <input
            type="number"
            name="companions"
            value={planner.companions}
            onChange={onFieldChange}
            min="1"
            max="12"
          />
        </label>
        <label>
          Notes
          <textarea
            name="notes"
            value={planner.notes}
            onChange={onFieldChange}
            rows="3"
            placeholder="Focus on food tours and local craft markets"
          />
        </label>
        <button type="submit">Save Plan</button>
      </form>
    </section>
  );
}
