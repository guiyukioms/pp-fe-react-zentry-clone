import React, { useState, useEffect } from 'react';
import { FaTimes } from "react-icons/fa";
import Button from "./Button";

const Popup = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        // Esse useEffect faz o popup aparecer ao carregar a página
        setIsVisible(true);
    }, []);

    if (!isVisible) return null; // Não renderiza o componente se estiver fechado

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-blue-500 text-black p-6 rounded-lg flex flex-col gap-4 items-center max-w-md w-full md:mx-10">
                <h2 className="bento-title special-font"
                >A<b>v</b>iso!</h2>
                <p className="font-circular-web text-lg text-white-50 opacity-80"
                >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div onClick={handleClose}>
                    <Button
                        id="alert-btn"
                        title="Fechar"
                        rightIcon={<FaTimes />}
                        containerClass="mt-5 flex-center gap-1"
                    />
                </div>
            </div>
        </div>
    );
};

export default Popup;