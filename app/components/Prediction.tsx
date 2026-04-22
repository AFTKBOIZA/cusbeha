"use client";

import { useState } from "react";

export default function Prediction() {
  const [inputs, setInputs] = useState({
    age: 30,
    income: 50000,
    purchases: 5,
    timeSpent: 10.0,
    gender: 0,
    category: 0,
    loyalty: 0,
    discounts: 2
  });

  const [predictions, setPredictions] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    // Mock prediction logic - in real app, this would call an API
    const mockPredictions = {
      logistic: { prediction: Math.random() > 0.5 ? 1 : 0, confidence: Math.random() },
      randomForest: { prediction: Math.random() > 0.5 ? 1 : 0, confidence: Math.random() },
      xgboost: { prediction: Math.random() > 0.5 ? 1 : 0, confidence: Math.random() }
    };
    setPredictions(mockPredictions);
  };

  return (
    <section>
      <div style={{ marginBottom: 24 }}>
        <div style={{ padding: 16, background: "rgba(14, 165, 233, 0.2)", borderRadius: 12, border: "1px solid rgba(14, 165, 233, 0.3)" }}>
          <p style={{ margin: 0, color: "#0ea5e9" }}>ป้อนข้อมูลด้านล่างเพื่อทำนายว่าลูกค้าจะซื้อสินค้าหรือไม่</p>
        </div>
      </div>

      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>ข้อมูลลูกค้า</h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500", color: "#cbd5e1" }}>Age</label>
              <input
                type="number"
                min="18"
                max="100"
                value={inputs.age}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(148, 163, 184, 0.3)", borderRadius: 6, background: "rgba(51, 65, 85, 0.5)", color: "#f1f5f9" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Annual Income</label>
              <input
                type="number"
                min="0"
                max="500000"
                value={inputs.income}
                onChange={(e) => handleInputChange('income', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Number of Purchases</label>
              <input
                type="number"
                min="0"
                max="100"
                value={inputs.purchases}
                onChange={(e) => handleInputChange('purchases', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Time Spent on Website (hours)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={inputs.timeSpent}
                onChange={(e) => handleInputChange('timeSpent', parseFloat(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Gender</label>
              <select
                value={inputs.gender}
                onChange={(e) => handleInputChange('gender', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              >
                <option value={0}>Female</option>
                <option value={1}>Male</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Product Category</label>
              <select
                value={inputs.category}
                onChange={(e) => handleInputChange('category', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              >
                <option value={0}>Category 0</option>
                <option value={1}>Category 1</option>
                <option value={2}>Category 2</option>
                <option value={3}>Category 3</option>
                <option value={4}>Category 4</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Loyalty Program</label>
              <select
                value={inputs.loyalty}
                onChange={(e) => handleInputChange('loyalty', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: "0.9rem", fontWeight: "500" }}>Discounts Availed</label>
              <input
                type="number"
                min="0"
                max="10"
                value={inputs.discounts}
                onChange={(e) => handleInputChange('discounts', parseInt(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "end" }}>
              <button
                onClick={handlePredict}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#14b8a6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                🔮 ทำนายผล
              </button>
            </div>
          </div>
        </div>

        {predictions && (
          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>📊 ผลการทำนาย</h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
              <div style={{ padding: 16, background: "rgba(51, 65, 85, 0.5)", borderRadius: 12, textAlign: "center", border: "1px solid rgba(148, 163, 184, 0.2)" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: 8, color: "#14b8a6" }}>
                  Logistic Regression
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: 4, color: "#f1f5f9" }}>
                  {predictions.logistic.prediction === 1 ? "✅ ซื้อ" : "❌ ไม่ซื้อ"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                  Confidence: {(predictions.logistic.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div style={{ padding: 16, background: "rgba(51, 65, 85, 0.5)", borderRadius: 12, textAlign: "center", border: "1px solid rgba(148, 163, 184, 0.2)" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: 8, color: "#14b8a6" }}>
                  Random Forest
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: 4, color: "#f1f5f9" }}>
                  {predictions.randomForest.prediction === 1 ? "✅ ซื้อ" : "❌ ไม่ซื้อ"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                  Confidence: {(predictions.randomForest.confidence * 100).toFixed(1)}%
                </div>
              </div>
              <div style={{ padding: 16, background: "rgba(51, 65, 85, 0.5)", borderRadius: 12, textAlign: "center", border: "1px solid rgba(148, 163, 184, 0.2)" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: 8, color: "#14b8a6" }}>
                  XGBoost
                </div>
                <div style={{ fontSize: "1.5rem", marginBottom: 4, color: "#f1f5f9" }}>
                  {predictions.xgboost.prediction === 1 ? "✅ ซื้อ" : "❌ ไม่ซื้อ"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                  Confidence: {(predictions.xgboost.confidence * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            <div style={{ padding: 16, background: (predictions.logistic.prediction + predictions.randomForest.prediction + predictions.xgboost.prediction) / 3 >= 0.5 ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)", borderRadius: 12, textAlign: "center", border: (predictions.logistic.prediction + predictions.randomForest.prediction + predictions.xgboost.prediction) / 3 >= 0.5 ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)" }}>
              <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#f1f5f9" }}>
                🎯 ทำนายสำหรับคำตัดสิน: ลูกค้าจะ{(predictions.logistic.prediction + predictions.randomForest.prediction + predictions.xgboost.prediction) / 3 >= 0.5 ? "ซื้อ" : "ไม่ซื้อ"}สินค้า {(predictions.logistic.prediction + predictions.randomForest.prediction + predictions.xgboost.prediction) / 3 >= 0.5 ? "✅" : "❌"}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}