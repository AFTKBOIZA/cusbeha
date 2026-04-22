"use client";

import { useState } from "react";
import AnalysisDashboard from "./components/AnalysisDashboard";
import DataSummary from "./components/DataSummary";
import FeatureImportance from "./components/FeatureImportance";
import Prediction from "./components/Prediction";
import AdditionalAnalysis from "./components/AdditionalAnalysis";
import analysisData from "../data/analysis_results.json";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("📊 สรุปข้อมูล");

  const pages = [
    "📊 สรุปข้อมูล",
    "🎯 ผลประเมินโมเดล",
    "🔍 Feature Importance",
    "🔮 ทำนายข้อมูล",
    "📈 วิเคราะห์เพิ่มเติม"
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "📊 สรุปข้อมูล":
        return <DataSummary />;
      case "🎯 ผลประเมินโมเดล":
        return <AnalysisDashboard data={analysisData} />;
      case "🔍 Feature Importance":
        return <FeatureImportance data={analysisData} />;
      case "🔮 ทำนายข้อมูล":
        return <Prediction />;
      case "📈 วิเคราะห์เพิ่มเติม":
        return <AdditionalAnalysis data={analysisData} />;
      default:
        return <DataSummary />;
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #0f172a 0%, #1e293b 50%, #334155 100%)", padding: "40px 24px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", gap: 24 }}>
        {/* Sidebar */}
        <div style={{
          width: 280,
          background: "rgba(30, 41, 59, 0.9)",
          borderRadius: 20,
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)",
          padding: 24,
          height: "fit-content",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(148, 163, 184, 0.1)"
        }}>
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: "1.5rem", color: "#f1f5f9" }}>📑 นำทาง</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: "12px 16px",
                  border: "none",
                  borderRadius: 8,
                  background: currentPage === page ? "rgba(20, 184, 166, 0.2)" : "rgba(51, 65, 85, 0.5)",
                  color: currentPage === page ? "#14b8a6" : "#cbd5e1",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "0.9rem",
                  transition: "all 0.2s",
                  border: currentPage === page ? "1px solid #14b8a6" : "1px solid transparent"
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 24 }}>
            <p style={{ color: "#94a3b8", marginBottom: 8 }}>Customer purchase model analysis</p>
            <h1 style={{ margin: 0, fontSize: "clamp(2rem, 3vw, 3rem)", lineHeight: 1.1, color: "#f1f5f9" }}>
              Customer Behavior Dashboard
            </h1>
          </div>
          {renderPage()}
        </div>
      </div>
    </main>
  );
}
