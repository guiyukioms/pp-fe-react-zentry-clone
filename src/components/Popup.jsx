import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

import Button from "./Button";

const Popup = ({ onAudioStart }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200 bg-opacity-50">
            <div className="bg-blue-500 text-black p-6 rounded-lg flex flex-col gap-4 items-center max-w-md w-full md:mx-10">
                <h2 className="bento-title special-font">A<b>v</b>iso!</h2>
                <p className="font-circular-web text-lg text-white-50 opacity-80">
                Este site não é oficial. O design foi inspirado em um conceito original, mas todos os créditos são para os criadores. 

                <span  className="mt-1 block">
                Você pode conferir a página oficial <a href="https://zentry.com" target="_blank" rel="noopener noreferrer" className="text-yellow-900 underline transition-colors duration-300 ease-in-out hover:text-white">aqui</a>.</span>

                <span className="mt-1 block">Para mais detalhes, acesse o <a href="https://github.com/guiyukioms/pp-fe-react-zentry-clone" target="_blank" rel="noopener noreferrer" className="text-yellow-900 underline transition-colors duration-300 ease-in-out hover:text-white">repositório do projeto no GitHub</a>.</span>
                </p>
                <div className="flex gap-8">
                    <div onClick={() => {
                        onAudioStart(); // Ativa o áudio da Navbar
                        handleClose(); // Fecha o popup
                    }}>
                        <Button
                            id="play-popup-btn"
                            title="Iniciar com áudio"
                            rightIcon={<FaCheck />}
                            containerClass="bg-yellow-300 mt-5 flex-center gap-1"
                        />
                    </div>
                    <div onClick={handleClose}>
                        <Button
                            id="close-popup-btn"
                            title="Iniciar sem áudio"
                            rightIcon={<FaTimes />}
                            containerClass="mt-5 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
        </div>,
        document.body // Renderiza o Popup fora da estrutura da Navbar
    );
};

export default Popup;