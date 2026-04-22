import AnalysisDashboard from "./components/AnalysisDashboard";
import analysisData from "../data/analysis_results.json";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <AnalysisDashboard data={analysisData} />
      </div>
    </main>
  );
}
