Overview

DOSEWISE is an AI-powered platform that leverages machine learning, natural language processing, and computer vision to assist users in identifying affordable generic alternatives for prescribed medicines. It also provides video consultation with doctors and chatbot support for health-related guidance.

Features

1. Prescription Scanning & Generic Medicine Recommendation

Accepts prescriptions in multiple languages as PDFs or images.

Uses OCR and Computer Vision to extract text from prescriptions.

Recognizes medicine names with LLM (Large Language Model).

Searches for generic alternatives using a RAG model and vector database.

Provides top 5 affordable substitutes.

2. Doctor Consultation & Appointment Scheduling

Patients can view available doctor slots through an intuitive UI.

Users can contact doctors via a built-in messaging system.

Video consultation with doctors through the platform.

3. AI-Powered Chatbot

Provides health advice and helps with medicine-related queries.

Assists in scheduling appointments and basic medical guidance.

Tech Stack

Backend: Django (Python)

Frontend: React (JavaScript)

OCR & Computer Vision: OpenCV, Tesseract OCR

Machine Learning: RAG Model, LLM (Large Language Model)

Database: PostgreSQL, Vector Database (e.g., FAISS)

Video Consultation: WebRTC / Jitsi

Deployment: Docker, AWS / Firebase

Installation & Setup

Prerequisites

Ensure you have the following installed:

Node.js & npm

Python 3 & pip

PostgreSQL

Docker (if deploying with containers)

Backend (Django Server)

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Frontend (React)

cd frontend
npm install
npm run dev

Running OCR & ML Services

cd ml_services
python ocr_service.py  # Runs OCR extraction
python medicine_recommender.py  # Runs ML model for generic medicine recommendation

Running the Chatbot Service

cd chatbot
npm install
npm start

Running Video Consultation Service

cd video_service
npm install
npm start

API Endpoints

Endpoint

Method

Description

/api/upload-prescription

POST

Uploads prescription (PDF/Image)

/api/extract-medicine

POST

Extracts medicine names from OCR

/api/recommend-medicine

POST

Fetches 5 generic medicine substitutes

/api/doctors

GET

Fetches available doctors and slots

/api/book-appointment

POST

Books an appointment with a doctor

/api/chatbot

POST

AI Chatbot for medical guidance

Deployment

To deploy using Docker:

docker-compose up --build

Contributing

Feel free to contribute! Fork the repo, create a branch, and submit a PR.
