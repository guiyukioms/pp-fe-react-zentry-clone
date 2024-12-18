import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Popup from "./components/Popup";

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  // Função que é chamada quando o áudio é iniciado no Popup
  const handleAudioStart = () => {
      console.log("Áudio ativado!");
      setIsPopupVisible(false); // Fecha o Popup após o áudio ser iniciado
  };

  return (
      <main className="relative min-h-screen w-screen overflow-x-hidden">
          {/* Passando a prop audioTrigger para o Navbar */}
          {/* O Navbar agora recebe a prop audioTrigger, que indica se o popup foi fechado (se o áudio foi ativado) */}
          <Navbar audioTrigger={!isPopupVisible} />
          
          {/* O Popup é mostrado enquanto isPopupVisible for true */}
          {isPopupVisible && <Popup onAudioStart={handleAudioStart} />}
          
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
      </main>
  );
}

export default App;