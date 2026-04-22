import os

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier


DATA_FILE = os.path.join(os.path.dirname(__file__), "customer_purchase_data.csv")


def load_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    print("Loaded data:", df.shape)
    return df


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    if df['PurchaseStatus'].dtype == 'object':
        df['PurchaseStatus'] = df['PurchaseStatus'].map({'No': 0, 'Yes': 1})

    df = df.dropna()
    print("After cleaning:", df.shape)
    return df


def prepare_features(df: pd.DataFrame):
    X = df.drop('PurchaseStatus', axis=1)
    y = df['PurchaseStatus']

    categorical_cols = ['Gender', 'ProductCategory', 'LoyaltyProgram']
    X = pd.get_dummies(X, columns=categorical_cols, drop_first=True)

    print("After encoding:", X.shape)
    return X, y


def split_and_scale(X: pd.DataFrame, y: pd.Series):
    if X.shape[0] == 0:
        raise ValueError("Data is empty ก่อน split")

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("Train:", X_train.shape)
    print("Test:", X_test.shape)
    return X_train, X_test, X_train_scaled, X_test_scaled, y_train, y_test


def evaluate_models(X_train, X_test, X_train_scaled, X_test_scaled, y_train, y_test, X_columns):
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(eval_metric='logloss', use_label_encoder=False),
    }

    results = []
    predictions = {}

    for name, model in models.items():
        if name == "Logistic Regression":
            model.fit(X_train_scaled, y_train)
            y_pred = model.predict(X_test_scaled)
        else:
            model.fit(X_train, y_train)
            y_pred = model.predict(X_test)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, zero_division=0)
        rec = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)

        results.append([name, acc, prec, rec, f1])
        predictions[name] = y_pred

        print(f"\n=== {name} ===")
        print(classification_report(y_test, y_pred, zero_division=0))

    results_df = pd.DataFrame(results, columns=['Model', 'Accuracy', 'Precision', 'Recall', 'F1'])
    results_df = results_df.set_index('Model')
    print("\nModel comparison:\n", results_df)

    return models, results_df, predictions


def plot_model_comparison(results_df: pd.DataFrame):
    results_df.plot(kind='bar')
    plt.title("Model Comparison")
    plt.xticks(rotation=0)
    plt.tight_layout()
    plt.show()


def plot_feature_importance(model, feature_names):
    feat_imp = pd.DataFrame({
        'Feature': feature_names,
        'Importance': model.feature_importances_,
    }).sort_values(by='Importance', ascending=False)

    print("Top 10 feature importances:\n", feat_imp.head(10))

    sns.barplot(data=feat_imp.head(10), x='Importance', y='Feature')
    plt.title("Top 10 Features (Random Forest)")
    plt.tight_layout()
    plt.show()


def plot_logistic_coefficients(model, feature_names):
    coef = pd.DataFrame({
        'Feature': feature_names,
        'Coefficient': model.coef_[0],
    }).sort_values(by='Coefficient', ascending=False)

    print("Top 10 logistic coefficients:\n", coef.head(10))

    sns.barplot(data=coef.head(10), x='Coefficient', y='Feature')
    plt.title("Top 10 Features (Logistic Regression)")
    plt.tight_layout()
    plt.show()


def plot_confusion_matrix(y_test, y_pred):
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.title("Confusion Matrix")
    plt.tight_layout()
    plt.show()


def main():
    if not os.path.exists(DATA_FILE):
        raise FileNotFoundError(f"ไม่พบไฟล์ data ที่ {DATA_FILE}")

    df = load_data(DATA_FILE)
    df = clean_data(df)
    X, y = prepare_features(df)
    X_train, X_test, X_train_scaled, X_test_scaled, y_train, y_test = split_and_scale(X, y)

    models, results_df, predictions = evaluate_models(
        X_train,
        X_test,
        X_train_scaled,
        X_test_scaled,
        y_train,
        y_test,
        X.columns,
    )

    plot_model_comparison(results_df)
    plot_feature_importance(models['Random Forest'], X.columns)
    plot_logistic_coefficients(models['Logistic Regression'], X.columns)
    plot_confusion_matrix(y_test, predictions['XGBoost'])


if __name__ == "__main__":
    main()
