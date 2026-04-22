"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ModelMetric = {
  Model: string;
  Accuracy: number;
  Precision: number;
  Recall: number;
  F1: number;
};

type FeatureRank = {
  Feature: string;
  Importance?: number;
  Coefficient?: number;
};

type AnalysisData = {
  metrics: ModelMetric[];
  top_features: FeatureRank[];
  top_coefficients: FeatureRank[];
  confusion_matrix: number[][];
};

const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export default function AnalysisDashboard({ data }: { data: AnalysisData }) {
  return (
    <section>
      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📊 เปรียบเทียบผลประเมิน</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
              <thead>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Model</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Accuracy</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Precision</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>Recall</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid rgba(148, 163, 184, 0.2)", background: "rgba(51, 65, 85, 0.5)", color: "#cbd5e1" }}>F1</th>
                </tr>
              </thead>
              <tbody>
                {data.metrics.map((metric, i) => (
                  <tr key={i}>
                    <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)", fontWeight: "500", color: "#14b8a6" }}>{metric.Model}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{metric.Accuracy.toFixed(4)}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{metric.Precision.toFixed(4)}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{metric.Recall.toFixed(4)}</td>
                    <td style={{ padding: "12px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{metric.F1.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📈 กราฟเปรียบเทียบ Accuracy</h3>
            <div style={{ width: "100%", minHeight: 360 }}>
              <ResponsiveContainer>
                <BarChart data={data.metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="Model" tick={{ fill: "#cbd5e1" }} />
                  <YAxis domain={[0, 1]} tick={{ fill: "#cbd5e1" }} />
                <Tooltip formatter={(value: any) => value != null && typeof value === 'number' ? formatPercent(value) : String(value)} contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                  <Bar dataKey="Accuracy" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📊 เมตริกทั้งหมด</h3>
            <div style={{ width: "100%", minHeight: 360 }}>
              <ResponsiveContainer>
                <BarChart data={data.metrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="Model" tick={{ fill: "#cbd5e1" }} />
                  <YAxis domain={[0, 1]} tick={{ fill: "#cbd5e1" }} />
                  <Tooltip formatter={(value: any) => value != null && typeof value === 'number' ? formatPercent(value) : String(value)} contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                  <Bar dataKey="Accuracy" fill="#14b8a6" />
                  <Bar dataKey="Precision" fill="#45B7D1" />
                  <Bar dataKey="Recall" fill="#96CEB4" />
                  <Bar dataKey="F1" fill="#FECA57" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📝 Classification Report (Random Forest)</h3>
          <div style={{ background: "rgba(51, 65, 85, 0.5)", padding: 16, borderRadius: 8, fontFamily: "monospace", fontSize: "0.9rem", color: "#f1f5f9" }}>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`              precision    recall  f1-score   support

           0       0.99      0.90      0.94       160
           1       0.88      0.99      0.93       120

    accuracy                           0.94       280
   macro avg       0.94      0.94      0.94       280
weighted avg       0.94      0.94      0.94       280`}
            </pre>
          </div>
        </div>

        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>🔄 Confusion Matrix (Random Forest)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            <div style={{ background: "rgba(34, 197, 94, 0.2)", padding: 20, borderRadius: 12, textAlign: "center", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#22c55e" }}>{data.confusion_matrix[0][0]}</div>
              <div style={{ color: "#22c55e", fontSize: "0.9rem" }}>True Negative</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.2)", padding: 20, borderRadius: 12, textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{data.confusion_matrix[0][1]}</div>
              <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>False Positive</div>
            </div>
            <div style={{ background: "rgba(239, 68, 68, 0.2)", padding: 20, borderRadius: 12, textAlign: "center", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ef4444" }}>{data.confusion_matrix[1][0]}</div>
              <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>False Negative</div>
            </div>
            <div style={{ background: "rgba(34, 197, 94, 0.2)", padding: 20, borderRadius: 12, textAlign: "center", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#22c55e" }}>{data.confusion_matrix[1][1]}</div>
              <div style={{ color: "#22c55e", fontSize: "0.9rem" }}>True Positive</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>Top Logistic Regression Coefficients</h3>
          <ul style={{ display: "grid", gap: 10, paddingLeft: 0, listStyle: "none", margin: 0, color: "#f1f5f9" }}>
            {data.top_coefficients.map((item) => (
              <li key={item.Feature} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>
                <span style={{ color: "#cbd5e1" }}>{item.Feature}</span>
                <span style={{ color: item.Coefficient! > 0 ? "#22c55e" : "#ef4444" }}>{item.Coefficient!.toFixed(3)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
