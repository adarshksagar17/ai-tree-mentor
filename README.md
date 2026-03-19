# 🌳 AI Tree Mentor (3D Full-Stack Project)

An interactive 3D web application where a "Spirit Tree" acts as an AI Mentor. Users can share problems, and the tree responds with mystical, nature-themed advice while physically reacting (changing color/lighting) based on the sentiment of the input.

## 🚀 Features
- **3D Interactive Environment:** Built with React-Three-Fiber and Three.js.
- **AI-Driven Wisdom:** Integrated with Llama 3 (via Groq) for real-time natural language processing.
- **Sentiment-Based Lighting:** The tree's ambient light and material color shift dynamically based on the AI's response.
- **Responsive Backend:** Built with FastAPI (Python) for high-performance asynchronous processing.

## 🛠️ Tech Stack
- **Frontend:** React, Three.js, React-Three-Fiber, GLTFLoader.
- **Backend:** Python, FastAPI, Pydantic, Uvicorn.
- **Inference Engine:** Groq Cloud API (Llama 3.3).

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js & npm

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash--
   cd backend
Install dependencies:

Bash--
pip install fastapi uvicorn groq requests python-dotenv
Add your API Key:

Create a .env file or update main.py with your gsk_... key from Groq Console.

Start the server:

Bash--
uvicorn main:app --reload
3. Frontend Setup
Navigate to the frontend directory:

Bash--
cd frontend
Install dependencies:

Bash--
npm install
Start the application:

Bash--
npm start
Architectural Decisions
Model Normalization: The 3D GLB model was scaled and translated within the React-Three-Fiber primitive to ensure it fits the camera's frustum across different viewports.

Structured JSON Output: The backend enforces a specific JSON schema from the LLM to ensure the frontend receives both the advice text and the tree_reaction hex code without formatting errors.

Loading UX: Implemented an accelerated autoRotate state during fetch operations to provide visual feedback while the AI "thinks."