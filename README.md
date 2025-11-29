# 🎬 Movie Success Prediction System

A simple machine learning web application that predicts whether a movie will be a **Flop, Hit, or Super Hit** using **Logistic Regression**, **Django**, and **MySQL**.

---

## ⭐ Features

* 🤖 **ML Prediction:** Logistic Regression (≥80% accuracy)
* 🔐 **Authentication:** User registration & login
* 🛠️ **Admin Tools:** Manage training data, retrain model
* 🗂️ **MySQL Database:** Stores users, data, and prediction logs

---

## 🚀 Run Locally

### Requirements

* Python 3.10+
* MySQL
* pip

### Steps

```bash
git clone <repo-url>
cd movie-success-prediction
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Train ML model
python train_model.py

# Run server
python manage.py runserver
```

Open: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

Built by Group 3 – Movie Success Prediction Project