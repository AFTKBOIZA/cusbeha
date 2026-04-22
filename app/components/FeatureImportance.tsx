"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type FeatureRank = {
  Feature: string;
  Importance?: number;
  Coefficient?: number;
};

type AnalysisData = {
  metrics: any[];
  top_features: FeatureRank[];
  top_coefficients: FeatureRank[];
  confusion_matrix: number[][];
};

export default function FeatureImportance({ data }: { data: AnalysisData }) {
  return (
    <section>
      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>🎯 Random Forest - Feature Importance</h3>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Feature</th>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Importance</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_features.slice(0, 10).map((feature, i) => (
                    <tr key={i}>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{feature.Feature}</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{feature.Importance?.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data.top_features.slice(0, 10)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis type="number" tick={{ fill: "#cbd5e1" }} />
                  <YAxis dataKey="Feature" type="category" width={100} tick={{ fill: "#cbd5e1" }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                  <Bar dataKey="Importance" fill="#14b8a6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📊 Logistic Regression - Coefficients</h3>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Feature</th>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Coefficient</th>
                  </tr>
                </thead>
                <tbody>
                  {data.top_coefficients.slice(0, 10).map((feature, i) => (
                    <tr key={i}>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{feature.Feature}</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{feature.Coefficient?.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data.top_coefficients.slice(0, 10)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis type="number" tick={{ fill: "#cbd5e1" }} />
                  <YAxis dataKey="Feature" type="category" width={100} tick={{ fill: "#cbd5e1" }} />
                  <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                  <Bar
                    dataKey="Coefficient"
                    fill={(entry: any) => entry.Coefficient > 0 ? "#14b8a6" : "#ef4444"}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}