
DOSEWISE
AI-Powered Prescription Scanner & Generic Medicine Recommender
DOSEWISE is an innovative healthcare platform that leverages machine learning, natural language processing, and computer vision to make healthcare more accessible and affordable. Our solution helps users identify cost-effective generic alternatives to brand-name medications while providing access to healthcare professionals through an integrated appointment system.
Features
1. Prescription Scanner & Generic Alternative Finder 💊

Accepts prescriptions in multiple languages as PDF or image
Uses computer vision and OCR for text extraction
Leverages LLMs to identify medicine names
Employs RAG model to search vector database for affordable generic alternatives
Provides up to 5 substitute options for each medicine

2. Healthcare Professional Connect 👨‍⚕️

View doctor availability through interactive scheduling interface
In-app messaging system to contact healthcare providers
Integrated video calling for remote consultations
Real-time expert medical advice

Project Setup
Prerequisites

Node.js (v16.x or higher)
npm (v8.x or higher)
MongoDB (local or Atlas)
Python 3.8+ (for ML components)

Installation

Clone the repository

bashCopygit clone https://github.com/yourusername/dosewise.git
cd dosewise

Install backend dependencies

bashCopynpm install

Set up Python environment and install ML dependencies

bashCopy# Create and activate virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

Set up environment variables
Create a .env file in the root directory and add:

CopyPORT=3000
MONGODB_URI=mongodb://localhost:27017/dosewise
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

Start the development server

bashCopynpm run dev
The application should now be running at http://localhost:3000
Usage
Prescription Scanning

Navigate to the "Scan Prescription" section
Upload your prescription (PDF or image)
Wait for the system to process the prescription
Review the identified medications and their generic alternatives
Save or export your results

Doctor Consultation

Browse available healthcare providers
Check their schedule and available time slots
Book an appointment for a video consultation
Use the in-app messaging to communicate with healthcare providers

Technology Stack
Frontend

React.js
Tailwind CSS
Axios

Backend

Node.js
Express.js
MongoDB
Socket.io (for real-time communication)

Machine Learning

TensorFlow/PyTorch
OpenAI API
Langchain
OCR (Tesseract)
Vector database (Pinecone/Milvus)

Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

Thanks to all healthcare professionals who provided domain expertise
Special thanks to our hackathon mentors
All open-source libraries and tools that made this project possible
