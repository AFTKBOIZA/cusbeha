"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataRow = {
  Age: number;
  Gender: number;
  AnnualIncome: number;
  NumberOfPurchases: number;
  ProductCategory: number;
  TimeSpentOnWebsite: number;
  LoyaltyProgram: number;
  DiscountsAvailed: number;
  PurchaseStatus: number;
};

export default function DataSummary() {
  const [data, setData] = useState<DataRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch this from an API
    // For now, we'll use sample data
    const sampleData: DataRow[] = [
      { Age: 40, Gender: 1, AnnualIncome: 66120, NumberOfPurchases: 8, ProductCategory: 0, TimeSpentOnWebsite: 30.57, LoyaltyProgram: 0, DiscountsAvailed: 5, PurchaseStatus: 1 },
      { Age: 20, Gender: 1, AnnualIncome: 23580, NumberOfPurchases: 4, ProductCategory: 2, TimeSpentOnWebsite: 38.24, LoyaltyProgram: 0, DiscountsAvailed: 5, PurchaseStatus: 0 },
      { Age: 27, Gender: 1, AnnualIncome: 127821, NumberOfPurchases: 11, ProductCategory: 2, TimeSpentOnWebsite: 31.63, LoyaltyProgram: 1, DiscountsAvailed: 0, PurchaseStatus: 1 },
      { Age: 24, Gender: 1, AnnualIncome: 137799, NumberOfPurchases: 19, ProductCategory: 3, TimeSpentOnWebsite: 46.17, LoyaltyProgram: 0, DiscountsAvailed: 4, PurchaseStatus: 1 },
      { Age: 31, Gender: 1, AnnualIncome: 99301, NumberOfPurchases: 19, ProductCategory: 1, TimeSpentOnWebsite: 19.82, LoyaltyProgram: 0, DiscountsAvailed: 0, PurchaseStatus: 1 },
    ];
    setData(sampleData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const purchaseStatusData = [
    { name: "ไม่ซื้อ (0)", value: data.filter(d => d.PurchaseStatus === 0).length },
    { name: "ซื้อ (1)", value: data.filter(d => d.PurchaseStatus === 1).length }
  ];

  return (
    <section>
      <div style={{ display: "grid", gap: 24, marginBottom: 32 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <div style={{ padding: 20, background: "rgba(30, 41, 59, 0.8)", borderRadius: 12, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#14b8a6" }}>{data.length}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>จำนวน Rows</div>
          </div>
          <div style={{ padding: 20, background: "rgba(30, 41, 59, 0.8)", borderRadius: 12, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#14b8a6" }}>{Object.keys(data[0] || {}).length}</div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>จำนวน Features</div>
          </div>
          <div style={{ padding: 20, background: "rgba(30, 41, 59, 0.8)", borderRadius: 12, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#14b8a6" }}>
              {data.filter(d => d.PurchaseStatus === 1).length} ({((data.filter(d => d.PurchaseStatus === 1).length / data.length) * 100).toFixed(1)}%)
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>ซื้อสินค้า</div>
          </div>
          <div style={{ padding: 20, background: "rgba(30, 41, 59, 0.8)", borderRadius: 12, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#14b8a6" }}>
              {data.filter(d => d.PurchaseStatus === 0).length} ({((data.filter(d => d.PurchaseStatus === 0).length / data.length) * 100).toFixed(1)}%)
            </div>
            <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>ไม่ซื้อสินค้า</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>ข้อมูล 5 แถวแรก</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
                <thead>
                  <tr>
                    {Object.keys(data[0] || {}).map(key => (
                      <th key={key} style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value, j) => (
                        <td key={j} style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
            <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>ประเภทข้อมูล</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", color: "#f1f5f9" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Column</th>
                    <th style={{ padding: "8px", textAlign: "left", borderBottom: "1px solid rgba(148, 163, 184, 0.2)", color: "#cbd5e1" }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(data[0] || {}).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{key}</td>
                      <td style={{ padding: "8px", borderBottom: "1px solid rgba(148, 163, 184, 0.1)" }}>{typeof value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ padding: 24, background: "rgba(30, 41, 59, 0.8)", borderRadius: 20, boxShadow: "0 18px 40px rgba(0, 0, 0, 0.3)", border: "1px solid rgba(148, 163, 184, 0.1)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: "#f1f5f9" }}>การแจกแจง PurchaseStatus</h3>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={purchaseStatusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: "#cbd5e1" }} />
                <YAxis tick={{ fill: "#cbd5e1" }} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(30, 41, 59, 0.9)", border: "1px solid rgba(148, 163, 184, 0.2)", color: "#f1f5f9" }} />
                <Bar dataKey="value" fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}