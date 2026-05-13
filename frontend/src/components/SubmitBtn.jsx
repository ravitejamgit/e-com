export default function SubmitButton({ loading, label = "Submit" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`submit-btn ${loading ? "submit-btn--loading" : ""}`}
    >
      {loading ? "Please wait…" : `${label} →`}
    </button>
  );
}