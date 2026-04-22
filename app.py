"""
Customer Behavior Analysis - Streamlit Web Dashboard
ML Dashboard for predicting customer purchase behavior
"""

import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    classification_report,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
import warnings
warnings.filterwarnings('ignore')

# ============================================================================
# PAGE CONFIGURATION
# ============================================================================
st.set_page_config(
    page_title="Customer Behavior Analysis",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================================
# TITLE & HEADER
# ============================================================================
st.title("📊 Customer Behavior Analysis Dashboard")
st.markdown("---")

# ============================================================================
# LOAD & PROCESS DATA
# ============================================================================
@st.cache_data
def load_and_process_data():
    """Load and preprocess data"""
    try:
        df = pd.read_csv('customer_purchase_data.csv')
        
        # Data cleaning
        if df['PurchaseStatus'].dtype == 'object':
            df['PurchaseStatus'] = df['PurchaseStatus'].map({'No': 0, 'Yes': 1})
        
        df = df.dropna()
        
        # Prepare features
        X = df.drop('PurchaseStatus', axis=1)
        y = df['PurchaseStatus']
        
        # Encoding
        categorical_cols = ['Gender', 'ProductCategory', 'LoyaltyProgram']
        X = pd.get_dummies(X, columns=categorical_cols, drop_first=True)
        
        return df, X, y
    except FileNotFoundError:
        st.error("❌ ไฟล์ 'customer_purchase_data.csv' ไม่พบ")
        st.stop()

@st.cache_resource
def train_models(X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled):
    """Train ML models"""
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(eval_metric='logloss', verbose=0)
    }
    
    results = []
    trained_models = {}
    predictions = {}
    
    for name, model in models.items():
        if name == "Logistic Regression":
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
        else:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)
        
        trained_models[name] = model
        predictions[name] = y_pred
        
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred)
        rec = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        
        results.append([name, acc, prec, rec, f1])
    
    results_df = pd.DataFrame(results, columns=['Model', 'Accuracy', 'Precision', 'Recall', 'F1'])
    
    return trained_models, predictions, results_df

# ============================================================================
# LOAD DATA
# ============================================================================
df, X, y = load_and_process_data()

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train models
trained_models, predictions, results_df = train_models(
    X_train, X_test, y_train, y_test, X_train_scaled, X_test_scaled
)

# ============================================================================
# SIDEBAR NAVIGATION
# ============================================================================
st.sidebar.markdown("### 📑 นำทาง")
page = st.sidebar.radio(
    "เลือกหน้า:",
    ["📊 สรุปข้อมูล", "🎯 ผลประเมินโมเดล", "🔍 Feature Importance", "🔮 ทำนายข้อมูล", "📈 วิเคราะห์เพิ่มเติม"]
)

# ============================================================================
# PAGE 1: DATA SUMMARY
# ============================================================================
if page == "📊 สรุปข้อมูล":
    st.header("📊 สรุปข้อมูล")
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("📌 จำนวน Rows", f"{df.shape[0]:,}")
    with col2:
        st.metric("📋 จำนวน Features", f"{df.shape[1]}")
    with col3:
        st.metric("✅ ซื้อสินค้า", f"{(y == 1).sum()} ({(y == 1).sum()/len(y)*100:.1f}%)")
    with col4:
        st.metric("❌ ไม่ซื้อสินค้า", f"{(y == 0).sum()} ({(y == 0).sum()/len(y)*100:.1f}%)")
    
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📋 ข้อมูล 5 แถวแรก")
        st.dataframe(df.head(), use_container_width=True)
    
    with col2:
        st.subheader("📊 ประเภทข้อมูล")
        st.dataframe(pd.DataFrame({
            'Column': df.dtypes.index,
            'Type': df.dtypes.values.astype(str)
        }), use_container_width=True)
    
    st.markdown("---")
    st.subheader("📈 การแจกแจง PurchaseStatus")
    fig, ax = plt.subplots(figsize=(8, 4))
    y.value_counts().plot(kind='bar', ax=ax, color=['#FF6B6B', '#4ECDC4'])
    ax.set_title("Distribution of Purchase Status")
    ax.set_xlabel("Purchase Status (0=No, 1=Yes)")
    ax.set_ylabel("Count")
    ax.set_xticklabels(ax.get_xticklabels(), rotation=0)
    st.pyplot(fig)

# ============================================================================
# PAGE 2: MODEL EVALUATION
# ============================================================================
elif page == "🎯 ผลประเมินโมเดล":
    st.header("🎯 ผลประเมินโมเดล")
    
    st.subheader("📊 เปรียบเทียบผลประเมิน")
    st.dataframe(results_df, use_container_width=True)
    
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 กราฟเปรียบเทียบ Accuracy")
        fig, ax = plt.subplots(figsize=(8, 5))
        results_df.set_index('Model')['Accuracy'].plot(kind='bar', ax=ax, color='#4ECDC4')
        ax.set_title("Model Accuracy Comparison")
        ax.set_ylabel("Accuracy")
        ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
        st.pyplot(fig)
    
    with col2:
        st.subheader("📊 เมตริกทั้งหมด")
        fig, ax = plt.subplots(figsize=(10, 5))
        results_df.set_index('Model').plot(kind='bar', ax=ax)
        ax.set_title("Model Metrics Comparison")
        ax.set_ylabel("Score")
        ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
        ax.legend(loc='lower right')
        st.pyplot(fig)
    
    st.markdown("---")
    
    # Classification Report
    st.subheader("📝 Classification Report (Random Forest)")
    best_model = trained_models["Random Forest"]
    y_pred_best = predictions["Random Forest"]
    
    report_str = classification_report(y_test, y_pred_best, output_dict=False)
    st.text(report_str)
    
    # Confusion Matrix
    st.subheader("🔄 Confusion Matrix (Random Forest)")
    cm = confusion_matrix(y_test, y_pred_best)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', cbar=True, ax=ax)
    ax.set_xlabel("Predicted")
    ax.set_ylabel("Actual")
    ax.set_title("Confusion Matrix - Random Forest")
    st.pyplot(fig)

# ============================================================================
# PAGE 3: FEATURE IMPORTANCE
# ============================================================================
elif page == "🔍 Feature Importance":
    st.header("🔍 Feature Importance")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("🎯 Random Forest - Feature Importance")
        rf = trained_models["Random Forest"]
        feat_imp = pd.DataFrame({
            'Feature': X.columns,
            'Importance': rf.feature_importances_
        }).sort_values(by='Importance', ascending=False)
        
        st.dataframe(feat_imp.head(10), use_container_width=True)
        
        fig, ax = plt.subplots(figsize=(10, 6))
        sns.barplot(data=feat_imp.head(10), x='Importance', y='Feature', ax=ax, palette='viridis')
        ax.set_title("Top 10 Features - Random Forest")
        st.pyplot(fig)
    
    with col2:
        st.subheader("📊 Logistic Regression - Coefficients")
        lr = trained_models["Logistic Regression"]
        coef = pd.DataFrame({
            'Feature': X.columns,
            'Coefficient': lr.coef_[0]
        }).sort_values(by='Coefficient', ascending=False)
        
        st.dataframe(coef.head(10), use_container_width=True)
        
        fig, ax = plt.subplots(figsize=(10, 6))
        top_coef = pd.concat([coef.head(5), coef.tail(5)])
        colors = ['green' if x > 0 else 'red' for x in top_coef['Coefficient']]
        ax.barh(top_coef['Feature'], top_coef['Coefficient'], color=colors)
        ax.set_title("Top Positive & Negative Coefficients")
        ax.set_xlabel("Coefficient")
        st.pyplot(fig)

# ============================================================================
# PAGE 4: PREDICTION
# ============================================================================
elif page == "🔮 ทำนายข้อมูล":
    st.header("🔮 ทำนายข้อมูล")
    
    st.info("ป้อนข้อมูลด้านล่างเพื่อทำนายว่าลูกค้าจะซื้อสินค้าหรือไม่")
    
    # Create input columns
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        age = st.number_input("Age", min_value=18, max_value=100, value=30)
    
    with col2:
        income = st.number_input("Annual Income", min_value=0, max_value=500000, value=50000)
    
    with col3:
        purchases = st.number_input("Number of Purchases", min_value=0, max_value=100, value=5)
    
    with col4:
        time_spent = st.number_input("Time Spent on Website (hours)", min_value=0.0, max_value=100.0, value=10.0)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        gender = st.selectbox("Gender", [0, 1])  # 0=Female, 1=Male
    
    with col2:
        category = st.selectbox("Product Category", [0, 1, 2, 3, 4])
    
    with col3:
        loyalty = st.selectbox("Loyalty Program", [0, 1])
    
    col1, col2 = st.columns(2)
    
    with col1:
        discounts = st.number_input("Discounts Availed", min_value=0, max_value=10, value=2)
    
    if st.button("🔮 ทำนายผล", type="primary"):
        # Prepare input
        input_data = pd.DataFrame({
            'Age': [age],
            'Gender': [gender],
            'AnnualIncome': [income],
            'NumberOfPurchases': [purchases],
            'ProductCategory': [category],
            'TimeSpentOnWebsite': [time_spent],
            'LoyaltyProgram': [loyalty],
            'DiscountsAvailed': [discounts]
        })
        
        # One-hot encode
        input_encoded = pd.get_dummies(input_data, columns=['Gender', 'ProductCategory', 'LoyaltyProgram'], drop_first=True)
        
        # Ensure same columns as training data
        for col in X.columns:
            if col not in input_encoded.columns:
                input_encoded[col] = 0
        
        input_encoded = input_encoded[X.columns]
        
        # Make predictions
        st.markdown("---")
        st.subheader("📊 ผลการทำนาย")
        
        col1, col2, col3 = st.columns(3)
        
        with col1:
            # Logistic Regression
            lr_pred = trained_models["Logistic Regression"].predict(
                scaler.transform(input_encoded)
            )[0]
            lr_prob = trained_models["Logistic Regression"].predict_proba(
                scaler.transform(input_encoded)
            )[0][1]
            
            st.metric(
                "Logistic Regression",
                "✅ ซื้อ" if lr_pred == 1 else "❌ ไม่ซื้อ",
                f"Confidence: {lr_prob*100:.1f}%"
            )
        
        with col2:
            # Random Forest
            rf_pred = trained_models["Random Forest"].predict(input_encoded)[0]
            rf_prob = trained_models["Random Forest"].predict_proba(input_encoded)[0][1]
            
            st.metric(
                "Random Forest",
                "✅ ซื้อ" if rf_pred == 1 else "❌ ไม่ซื้อ",
                f"Confidence: {rf_prob*100:.1f}%"
            )
        
        with col3:
            # XGBoost
            xgb_pred = trained_models["XGBoost"].predict(input_encoded)[0]
            xgb_prob = trained_models["XGBoost"].predict_proba(input_encoded)[0][1]
            
            st.metric(
                "XGBoost",
                "✅ ซื้อ" if xgb_pred == 1 else "❌ ไม่ซื้อ",
                f"Confidence: {xgb_prob*100:.1f}%"
            )
        
        # Consensus prediction
        st.markdown("---")
        consensus = (lr_pred + rf_pred + xgb_pred) / 3
        if consensus >= 0.5:
            st.success("🎯 **ทำนายสำหรับคำตัดสิน: ลูกค้าจะซื้อสินค้า (✅)**")
        else:
            st.warning("🎯 **ทำนายสำหรับคำตัดสิน: ลูกค้าจะไม่ซื้อสินค้า (❌)**")

# ============================================================================
# PAGE 5: ADDITIONAL ANALYSIS
# ============================================================================
elif page == "📈 วิเคราะห์เพิ่มเติม":
    st.header("📈 วิเคราะห์เพิ่มเติม")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📊 Accuracy vs Data Size")
        sample_sizes = np.linspace(100, len(X_train), 5, dtype=int)
        train_scores = []
        
        for size in sample_sizes:
            X_temp = X_train[:size]
            y_temp = y_train[:size]
            rf_temp = RandomForestClassifier(n_estimators=100, random_state=42)
            rf_temp.fit(X_temp, y_temp)
            score = rf_temp.score(X_test, y_test)
            train_scores.append(score)
        
        fig, ax = plt.subplots(figsize=(8, 5))
        ax.plot(sample_sizes, train_scores, marker='o', linewidth=2, markersize=8)
        ax.set_xlabel("Training Set Size")
        ax.set_ylabel("Test Accuracy")
        ax.set_title("Learning Curve - Random Forest")
        ax.grid(True, alpha=0.3)
        st.pyplot(fig)
    
    with col2:
        st.subheader("💾 Model Summary Statistics")
        summary_data = {
            "Model": ["Logistic Regression", "Random Forest", "XGBoost"],
            "Train Time": ["Fast", "Medium", "Medium"],
            "Accuracy": [
                f"{results_df.loc[0, 'Accuracy']:.4f}",
                f"{results_df.loc[1, 'Accuracy']:.4f}",
                f"{results_df.loc[2, 'Accuracy']:.4f}"
            ],
            "F1 Score": [
                f"{results_df.loc[0, 'F1']:.4f}",
                f"{results_df.loc[1, 'F1']:.4f}",
                f"{results_df.loc[2, 'F1']:.4f}"
            ]
        }
        st.dataframe(pd.DataFrame(summary_data), use_container_width=True)

# ============================================================================
# FOOTER
# ============================================================================
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: gray; font-size: 12px;'>
    📊 Customer Behavior Analysis Dashboard | Created with Streamlit
    </div>
    """,
    unsafe_allow_html=True
)
