import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';

// This component loads your 3D Tree file
function TreeModel() {
  const { scene } = useGLTF('/Tree.glb'); 
  return (
    <primitive 
      object={scene} 
      scale={0.5}           // <--- Try 0.3 first
      position={[0, -2.9, 0]}  // <--- Lowers the tree so the trunk sits on the "floor"
    />
  );
}

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({ 
    advice: "The forest is quiet. Ask your question...", 
    tree_reaction: "#228B22" // Default Forest Green
  });
  const [loading, setLoading] = useState(false);

  const askMentor = async () => {
    if (!input) return;
    setLoading(true);
    try {
      // This connects to your Python Uvicorn server on Port 8000
      const response = await fetch("http://localhost:8000/ask-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Backend not reached. Is Uvicorn running?", error);
      setData({ advice: "The connection to the mentor was lost...", tree_reaction: "#ff4444" });
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#050505", color: "white", fontFamily: "sans-serif" }}>
      {/* 3D Scene Section */}
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        {/* This light changes color based on the AI's sentiment! */}
        <pointLight position={[2, 3, 2]} color={data.tree_reaction} intensity={2} />
        <Suspense fallback={null}>
          <TreeModel />
          <Environment preset="forest" />
          <ContactShadows opacity={0.4} scale={10} blur={2.4} far={10} />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate={loading} />
      </Canvas>

      {/* UI Overlay Section */}
      <div style={{ position: "absolute", bottom: "40px", width: "100%", textAlign: "center" }}>
        <div style={{ 
          background: "rgba(20, 20, 20, 0.9)", 
          padding: "30px", 
          borderRadius: "20px", 
          border: `2px solid ${data.tree_reaction}`,
          display: "inline-block",
          maxWidth: "500px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)"
        }}>
          <h3 style={{ color: data.tree_reaction, marginTop: 0 }}>AI Tree Mentor</h3>
          <p style={{ fontSize: "1.1rem", fontStyle: "italic" }}>
  {loading ? "The leaves are rustling in thought..." : `"${data.advice}"`}</p>
          <div style={{ marginTop: "20px" }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)} 
              style={{ padding: "12px", width: "250px", borderRadius: "5px", border: "none" }} 
              placeholder="Seek wisdom from the tree..." 
            />
            <button 
              onClick={askMentor} 
              style={{ 
                marginLeft: "10px", 
                padding: "12px 20px", 
                cursor: "pointer",
                background: data.tree_reaction,
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontWeight: "bold"
              }}>
              Seek Wisdom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;