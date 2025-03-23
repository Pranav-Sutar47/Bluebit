# **DOSEWISE**

## **AI-Powered Prescription Scanner & Generic Medicine Recommender**

DOSEWISE is an innovative healthcare platform that leverages **machine learning, natural language processing, and computer vision** to make healthcare more accessible and affordable. Our solution helps users identify cost-effective **generic alternatives** to brand-name medications while providing access to healthcare professionals through an **integrated appointment system**.

---

## **Features**

### **1. Prescription Scanner & Generic Alternative Finder 💊**
- Accepts prescriptions in **multiple languages** as **PDF or image** 📄🖼️
- Uses **computer vision and OCR** for text extraction 👁️‍🗨️🔎
- Leverages **LLMs to identify medicine names** ✨
- Employs **RAG model to search vector database** for affordable generic alternatives 🤖🗃️
- Provides **up to 5 substitute options** for each medicine ✅

### **2. Healthcare Professional Connect 👩‍⚕️👨‍⚕️**
- Patients can **view available slots** of doctors through **interactive scheduling** 🗓️📊
- Website **messaging system** to contact doctors 💬
- Schedule and conduct **video consultations** 📹
- **Real-time** patient-doctor consultations for **expert medical advice** ⏱️🩺
- **Seamless one-to-one video calling** between patients and doctors 🌐✨

### **3. Smart Health Chatbot 🤖**
- A chatbot that answers **all types of user queries** regarding health concerns.
- Provides **comfort, support, and motivational conversations** for patients struggling with **mental health issues**.
- Allows users to **chat freely** with the bot for **emotional relief**.

### **4. Computer Vision-Based Medicine Recognition 👁️**
- A system for **visually impaired individuals** or those with **damaged/torn medicine wrappers**.
- Users can **show their medicine strip to the webcam** in real-time.
- The system **recognizes the medicine and displays its name and details** from the database.

### **5. Secure Medical History Storage 🔐**
- Patients’ **past medical history** is **securely stored** in the system.
- Doctors can **access it before prescribing medications**, ensuring **informed, safe, and personalized** treatment decisions.

### **6. Multilingual Prescription Support 🌍**
- Accepts prescriptions in **various languages**.
- Uses **OCR (Optical Character Recognition)** to **extract and process text**.
- Can **translate and enhance understanding** for better accessibility.

---

## **Project Setup**

### **Prerequisites**
- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **Python 3.8+** (for ML components)

### **Installation**

#### **Clone the repository**
```bash
git clone https://github.com/Pranav-Sutar47/Bluebit.git
cd BlueBit
```

#### **Set up and run the frontend**
```bash
cd frontend
npm install
npm run dev
```

#### **Set up and run the backend**
```bash
cd backend/Bluebit
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The application should now be running at **http://localhost:3000**

---

## **Usage**

### **Prescription Scanning**
1. Navigate to the **"Scan Prescription"** section.
2. Upload your prescription (**PDF or image**).
3. Wait for the system to process the prescription.
4. Review the identified medications and their **generic alternatives**.
5. Save or **export your results**.

### **Doctor Consultation**
1. Browse **available healthcare providers**.
2. Check their schedule and **available time slots** with our **visual scheduling interface**.
3. Contact doctors through our **messaging system**.
4. Book and attend **video consultations**.
5. Receive **expert medical advice in real-time**.

### **Smart Health Chatbot**
1. Ask health-related questions and receive **instant responses**.
2. Get **motivational and emotional support** for mental health concerns.
3. Chat freely with the bot for **comfort and guidance**.

### **Medicine Recognition for Visually Impaired Users**
1. Open the **real-time medicine recognition** feature.
2. Show your **medicine strip** to the **webcam**.
3. The system will **identify the medicine and display its details**.

---

## **Technology Stack**

### **Frontend**
- **React.js**
- **Tailwind CSS**
- **Axios**

### **Backend & Authentication**
- **Django (Python)**
- **Google Auth for Login**

### **Machine Learning**
- **TensorFlow / PyTorch**
- **OpenAI API**
- **Langchain**
- **OCR (Tesseract)**
- **Vector database (Pinecone/Milvus)**

### **Video Calling**
- **One-to-One Video Calling** between patient and doctor

---

## **Contributing**

1. **Fork** the repository.
2. **Create your feature branch**:  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**:  
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**:  
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**.

---

## **License**
This project is licensed under the **MIT License** - see the **LICENSE** file for details.

---

## **Acknowledgments**
- Thanks to all **healthcare professionals** who provided domain expertise. 🙏
- Special thanks to our **hackathon mentors** for their guidance. 🎯
- Appreciation for all **open-source libraries and tools** that made this project possible. 🚀

