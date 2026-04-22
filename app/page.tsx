'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Mock data - replace with actual CSV loading if available
const mockData = [
  { Age: 25, Gender: 'Female', AnnualIncome: 45000, NumberOfPurchases: 3, ProductCategory: 'Electronics', TimeSpentOnWebsite: 8.5, LoyaltyProgram: 'No', DiscountsAvailed: 1, PurchaseStatus: 0 },
  { Age: 35, Gender: 'Male', AnnualIncome: 65000, NumberOfPurchases: 7, ProductCategory: 'Clothing', TimeSpentOnWebsite: 12.3, LoyaltyProgram: 'Yes', DiscountsAvailed: 3, PurchaseStatus: 1 },
  // Add more mock data as needed
];

// Mock ML results - replace with actual results from Colab
const mockResults = [
  { Model: 'Logistic Regression', Accuracy: 0.85, Precision: 0.82, Recall: 0.88, F1: 0.85 },
  { Model: 'Random Forest', Accuracy: 0.92, Precision: 0.89, Recall: 0.95, F1: 0.92 },
  { Model: 'XGBoost', Accuracy: 0.90, Precision: 0.87, Recall: 0.93, F1: 0.90 }
];

const mockFeatureImportance = [
  { Feature: 'TimeSpentOnWebsite', Importance: 0.25 },
  { Feature: 'AnnualIncome', Importance: 0.20 },
  { Feature: 'NumberOfPurchases', Importance: 0.18 },
  // Add more
];

const mockCoefficients = [
  { Feature: 'TimeSpentOnWebsite', Coefficient: 1.2 },
  { Feature: 'AnnualIncome', Coefficient: 0.8 },
  // Add more
];

export default function Home() {
  const [page, setPage] = useState("📊 สรุปข้อมูล");

  const renderPage = () => {
    switch(page) {
      case "📊 สรุปข้อมูล":
        return <DataSummary data={mockData} />;
      case "🎯 ผลประเมินโมเดล":
        return <ModelEvaluation results={mockResults} />;
      case "🔍 Feature Importance":
        return <FeatureImportance importance={mockFeatureImportance} coefficients={mockCoefficients} />;
      case "🔮 ทำนายข้อมูล":
        return <Prediction />;
      case "📈 วิเคราะห์เพิ่มเติม":
        return <AdditionalAnalysis results={mockResults} />;
      default:
        return <DataSummary data={mockData} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setPage={setPage} currentPage={page} />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">📊 Customer Behavior Analysis Dashboard</h1>
        <hr className="mb-6" />
        {renderPage()}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          📊 Customer Behavior Analysis Dashboard | Created with Next.js
        </footer>
      </div>
    </div>
  );
}

function Sidebar({ setPage, currentPage }) {
  const pages = [
    "📊 สรุปข้อมูล",
    "🎯 ผลประเมินโมเดล",
    "🔍 Feature Importance",
    "🔮 ทำนายข้อมูล",
    "📈 วิเคราะห์เพิ่มเติม"
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">📑 นำทาง</h2>
      <div className="space-y-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-full text-left p-2 rounded ${currentPage === p ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function DataSummary({ data }) {
  const totalRows = data.length;
  const purchaseYes = data.filter(d => d.PurchaseStatus === 1).length;
  const purchaseNo = data.filter(d => d.PurchaseStatus === 0).length;

  const purchaseData = [
    { name: 'ไม่ซื้อ', value: purchaseNo },
    { name: 'ซื้อ', value: purchaseYes }
  ];

  const colors = ['#FF6B6B', '#4ECDC4'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 สรุปข้อมูล</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{totalRows.toLocaleString()}</div>
          <div className="text-gray-600">📌 จำนวน Rows</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{Object.keys(data[0] || {}).length}</div>
          <div className="text-gray-600">📋 จำนวน Features</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{purchaseYes} ({(purchaseYes/totalRows*100).toFixed(1)}%)</div>
          <div className="text-gray-600">✅ ซื้อสินค้า</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{purchaseNo} ({(purchaseNo/totalRows*100).toFixed(1)}%)</div>
          <div className="text-gray-600">❌ ไม่ซื้อสินค้า</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📋 ข้อมูล 5 แถวแรก</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {Object.keys(data[0] || {}).map(key => <th key={key} className="text-left p-1">{key}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b">
                  {Object.values(row).map((val, j) => <td key={j} className="p-1">{String(val)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📊 ประเภทข้อมูล</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-1">Column</th>
                <th className="text-left p-1">Type</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data[0] || {}).map(key => (
                <tr key={key} className="border-b">
                  <td className="p-1">{key}</td>
                  <td className="p-1">{typeof data[0][key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">📈 การแจกแจง PurchaseStatus</h3>
        <BarChart width={600} height={300} data={purchaseData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4ECDC4" />
        </BarChart>
      </div>
    </div>
  );
}

function ModelEvaluation({ results }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🎯 ผลประเมินโมเดล</h2>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">📊 เปรียบเทียบผลประเมิน</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Model</th>
              <th className="text-left p-2">Accuracy</th>
              <th className="text-left p-2">Precision</th>
              <th className="text-left p-2">Recall</th>
              <th className="text-left p-2">F1</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{row.Model}</td>
                <td className="p-2">{row.Accuracy.toFixed(4)}</td>
                <td className="p-2">{row.Precision.toFixed(4)}</td>
                <td className="p-2">{row.Recall.toFixed(4)}</td>
                <td className="p-2">{row.F1.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📈 กราฟเปรียบเทียบ Accuracy</h3>
          <BarChart width={400} height={300} data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Model" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Accuracy" fill="#4ECDC4" />
          </BarChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📊 เมตริกทั้งหมด</h3>
          <BarChart width={400} height={300} data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Model" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Precision" fill="#8884d8" />
            <Bar dataKey="Recall" fill="#82ca9d" />
            <Bar dataKey="F1" fill="#ffc658" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

function FeatureImportance({ importance, coefficients }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🔍 Feature Importance</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">🎯 Random Forest - Feature Importance</h3>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-1">Feature</th>
                <th className="text-left p-1">Importance</th>
              </tr>
            </thead>
            <tbody>
              {importance.slice(0, 10).map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">{row.Feature}</td>
                  <td className="p-1">{row.Importance.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <BarChart width={400} height={300} data={importance.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Feature" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Importance" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📊 Logistic Regression - Coefficients</h3>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left p-1">Feature</th>
                <th className="text-left p-1">Coefficient</th>
              </tr>
            </thead>
            <tbody>
              {coefficients.slice(0, 10).map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-1">{row.Feature}</td>
                  <td className="p-1">{row.Coefficient.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <BarChart width={400} height={300} data={coefficients.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Feature" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Coefficient" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

function Prediction() {
  const [inputs, setInputs] = useState({
    Age: 30,
    Gender: 0,
    AnnualIncome: 50000,
    NumberOfPurchases: 5,
    ProductCategory: 0,
    TimeSpentOnWebsite: 10.0,
    LoyaltyProgram: 0,
    DiscountsAvailed: 2
  });

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const mockPredictions = [
    { model: 'Logistic Regression', prediction: 1, confidence: 0.85 },
    { model: 'Random Forest', prediction: 1, confidence: 0.92 },
    { model: 'XGBoost', prediction: 0, confidence: 0.60 }
  ];

  const consensus = mockPredictions.reduce((sum, p) => sum + p.prediction, 0) / mockPredictions.length;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🔮 ทำนายข้อมูล</h2>
      <div className="bg-blue-50 p-4 rounded mb-6">
        ป้อนข้อมูลด้านล่างเพื่อทำนายว่าลูกค้าจะซื้อสินค้าหรือไม่
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input type="number" value={inputs.Age} onChange={(e) => handleInputChange('Age', parseInt(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Annual Income</label>
          <input type="number" value={inputs.AnnualIncome} onChange={(e) => handleInputChange('AnnualIncome', parseInt(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Purchases</label>
          <input type="number" value={inputs.NumberOfPurchases} onChange={(e) => handleInputChange('NumberOfPurchases', parseInt(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time Spent on Website</label>
          <input type="number" step="0.1" value={inputs.TimeSpentOnWebsite} onChange={(e) => handleInputChange('TimeSpentOnWebsite', parseFloat(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select value={inputs.Gender} onChange={(e) => handleInputChange('Gender', parseInt(e.target.value))} className="w-full p-2 border rounded">
            <option value={0}>Female</option>
            <option value={1}>Male</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Category</label>
          <select value={inputs.ProductCategory} onChange={(e) => handleInputChange('ProductCategory', parseInt(e.target.value))} className="w-full p-2 border rounded">
            <option value={0}>Electronics</option>
            <option value={1}>Clothing</option>
            <option value={2}>Home</option>
            <option value={3}>Sports</option>
            <option value={4}>Books</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loyalty Program</label>
          <select value={inputs.LoyaltyProgram} onChange={(e) => handleInputChange('LoyaltyProgram', parseInt(e.target.value))} className="w-full p-2 border rounded">
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discounts Availed</label>
          <input type="number" value={inputs.DiscountsAvailed} onChange={(e) => handleInputChange('DiscountsAvailed', parseInt(e.target.value))} className="w-full p-2 border rounded" />
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-6">🔮 ทำนายผล</button>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">📊 ผลการทำนาย</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {mockPredictions.map((p, i) => (
            <div key={i} className="bg-gray-50 p-4 rounded">
              <div className="text-lg font-semibold">{p.model}</div>
              <div className="text-2xl">{p.prediction === 1 ? '✅ ซื้อ' : '❌ ไม่ซื้อ'}</div>
              <div className="text-sm text-gray-600">Confidence: {(p.confidence * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
        <div className={`p-4 rounded ${consensus >= 0.5 ? 'bg-green-100' : 'bg-red-100'}`}>
          🎯 **ทำนายสำหรับคำตัดสิน: ลูกค้าจะ{consensus >= 0.5 ? 'ซื้อ' : 'ไม่ซื้อ'}สินค้า ({consensus >= 0.5 ? '✅' : '❌'})**
        </div>
      </div>
    </div>
  );
}

function AdditionalAnalysis({ results }) {
  const learningCurveData = [
    { size: 100, accuracy: 0.75 },
    { size: 200, accuracy: 0.80 },
    { size: 300, accuracy: 0.85 },
    { size: 400, accuracy: 0.88 },
    { size: 500, accuracy: 0.90 }
  ];

  const summaryData = results.map(r => ({
    Model: r.Model,
    TrainTime: r.Model === 'Logistic Regression' ? 'Fast' : 'Medium',
    Accuracy: r.Accuracy.toFixed(4),
    F1: r.F1.toFixed(4)
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📈 วิเคราะห์เพิ่มเติม</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📊 Accuracy vs Data Size</h3>
          <LineChart width={400} height={300} data={learningCurveData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="size" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">💾 Model Summary Statistics</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Model</th>
                <th className="text-left p-2">Train Time</th>
                <th className="text-left p-2">Accuracy</th>
                <th className="text-left p-2">F1 Score</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{row.Model}</td>
                  <td className="p-2">{row.TrainTime}</td>
                  <td className="p-2">{row.Accuracy}</td>
                  <td className="p-2">{row.F1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
