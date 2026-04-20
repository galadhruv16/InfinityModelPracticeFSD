export default function SavedPlans({ plans, onRemove, onClear }) {
  return (
    <section className="plans-panel">
      <div className="panel-head">
        <h2>Saved Plans</h2>
        <button
          type="button"
          className="ghost"
          onClick={onClear}
          disabled={plans.length === 0}
        >
          Clear
        </button>
      </div>

      {plans.length === 0 ? (
        <p className="placeholder">No plans saved yet.</p>
      ) : (
        <div className="plans-list">
          {plans.map((plan) => (
            <article key={plan.id} className="plan-item">
              <h3>{plan.destinationName}</h3>
              <p>{plan.traveler}</p>
              <p>
                {plan.month} | Budget {plan.budget}
              </p>
              <p>{plan.companions} travelers</p>
              {plan.notes && <p>{plan.notes}</p>}
              <small>{plan.createdAt}</small>
              <button
                type="button"
                className="ghost"
                onClick={() => onRemove(plan.id)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
