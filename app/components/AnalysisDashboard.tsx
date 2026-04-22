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
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: "#666", marginBottom: 8 }}>Customer purchase model analysis</p>
        <h1 style={{ margin: 0, fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1 }}>
          Customer Behavior Dashboard
        </h1>
      </div>

      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: "#ffffff", borderRadius: 20, boxShadow: "0 18px 40px rgba(18, 38, 63, 0.08)" }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Model Performance</h2>
          <div style={{ width: "100%", minHeight: 360 }}>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={data.metrics} margin={{ top: 24, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="Model" tick={{ fontSize: 13 }} />
                <YAxis tickFormatter={formatPercent} />
                <Tooltip formatter={(value: number) => formatPercent(value)} />
                <Bar dataKey="Accuracy" fill="#2563eb" radius={[8, 8, 0, 0]}>
                  <LabelList dataKey="Accuracy" content={({ x, y, width, value }) => (
                    <text x={x + width / 2} y={y - 8} fill="#111" fontSize={12} textAnchor="middle">
                      {formatPercent(value as number)}
                    </text>
                  )} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {data.metrics.map((metric) => (
            <div key={metric.Model} style={{ padding: 20, background: "#fff", borderRadius: 20, boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)" }}>
              <h3 style={{ margin: "0 0 12px", fontSize: 18 }}>{metric.Model}</h3>
              <p style={{ margin: 0, color: "#334155" }}>Accuracy: <strong>{formatPercent(metric.Accuracy)}</strong></p>
              <p style={{ margin: 0, color: "#334155" }}>Precision: <strong>{formatPercent(metric.Precision)}</strong></p>
              <p style={{ margin: 0, color: "#334155" }}>Recall: <strong>{formatPercent(metric.Recall)}</strong></p>
              <p style={{ margin: 0, color: "#334155" }}>F1 Score: <strong>{formatPercent(metric.F1)}</strong></p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1.5fr 1fr" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 18px 40px rgba(18, 38, 63, 0.08)" }}>
          <h2 style={{ marginTop: 0, marginBottom: 18 }}>Top 10 Feature Importances</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "10px 12px", color: "#475569" }}>Feature</th>
                <th style={{ textAlign: "right", padding: "10px 12px", color: "#475569" }}>Importance</th>
              </tr>
            </thead>
            <tbody>
              {data.top_features.map((item) => (
                <tr key={item.Feature} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", color: "#0f172a" }}>{item.Feature}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#0f172a" }}>{item.Importance!.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 18px 40px rgba(18, 38, 63, 0.08)" }}>
          <h2 style={{ marginTop: 0, marginBottom: 18 }}>Confusion Matrix (XGBoost)</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ padding: "10px 12px", background: "#f8fafc" }}></th>
                <th style={{ padding: "10px 12px", background: "#f8fafc" }}>Predicted 0</th>
                <th style={{ padding: "10px 12px", background: "#f8fafc" }}>Predicted 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px", fontWeight: 600 }}>Actual 0</td>
                <td style={{ padding: "12px" }}>{data.confusion_matrix[0][0]}</td>
                <td style={{ padding: "12px" }}>{data.confusion_matrix[0][1]}</td>
              </tr>
              <tr>
                <td style={{ padding: "12px", fontWeight: 600 }}>Actual 1</td>
                <td style={{ padding: "12px" }}>{data.confusion_matrix[1][0]}</td>
                <td style={{ padding: "12px" }}>{data.confusion_matrix[1][1]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "grid", gap: 24 }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 24, boxShadow: "0 18px 40px rgba(18, 38, 63, 0.08)" }}>
          <h2 style={{ marginTop: 0, marginBottom: 16 }}>Top Logistic Regression Coefficients</h2>
          <ul style={{ display: "grid", gap: 10, paddingLeft: 0, listStyle: "none", margin: 0 }}>
            {data.top_coefficients.map((item) => (
              <li key={item.Feature} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
                <span style={{ color: "#0f172a" }}>{item.Feature}</span>
                <span style={{ color: "#334155" }}>{item.Coefficient!.toFixed(3)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
