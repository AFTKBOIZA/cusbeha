"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type AnalysisData = {
  metrics: any[];
  top_features: any[];
  top_coefficients: any[];
  confusion_matrix: number[][];
};

export default function AdditionalAnalysis({ data }: { data: AnalysisData }) {
  // Mock learning curve data
  const learningCurveData = [
    { size: 100, accuracy: 0.85 },
    { size: 200, accuracy: 0.88 },
    { size: 300, accuracy: 0.91 },
    { size: 400, accuracy: 0.93 },
    { size: 500, accuracy: 0.95 }
  ];

  const modelSummary = [
    { Model: "Logistic Regression", TrainTime: "Fast", Accuracy: "83.67%", F1: "78.97%" },
    { Model: "Random Forest", TrainTime: "Medium", Accuracy: "95.33%", F1: "94.26%" },
    { Model: "XGBoost", TrainTime: "Medium", Accuracy: "94.67%", F1: "93.39%" }
  ];

  return (
    <section>
      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📊 Accuracy vs Data Size</h3>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={learningCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="size" tick={{ fill: "#cbd5e1" }} />
                  <YAxis domain={[0.8, 1]} tick={{ fill: "#cbd5e1" }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                  <Line type="monotone" dataKey="accuracy" stroke="#14b8a6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>💾 Model Summary Statistics</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Model</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Train Time</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Accuracy</th>
                    <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>F1 Score</th>
                  </tr>
                </thead>
                <tbody>
                  {modelSummary.map((model, i) => (
                    <tr key={i}>
                      <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)", fontWeight: "500", color: "#14b8a6" }}>{model.Model}</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{model.TrainTime}</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{model.Accuracy}</td>
                      <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{model.F1}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}