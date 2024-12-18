import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
    const frameRef = useRef(null);

    // Aplica rotação à imagem com base na posição do cursor
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = frameRef.current;

        if (!element) return;

        // Obtém as dimensões e posição do elemento na tela
        const rect = element.getBoundingClientRect();
        const xPos = clientX - rect.left; // Posição horizontal do mouse dentro do elemento
        const yPos = clientY - rect.top; // Posição vertical do mouse dentro do elemento

        // Calculo do centro do elemento para definir os ângulos de rotação
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Define os ângulos de rotação com base na posição do mouse
        const rotateX = ((yPos - centerY) / centerY) * -10; // Inclinação no eixo X
        const rotateY = ((xPos - centerX) / centerX) * 10;  // Inclinação no eixo Y

        // Aplica a rotação na imagem
        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500, // Adiciona perspectiva 3D
            ease: "power1.inOut", // Facilita a animação
        });
    };

    // Redefine a rotação da imagem ao sair do elemento
    const handleMouseLeave = () => {
        const element = frameRef.current;

        if (element) {
            gsap.to(element, {
                duration: 0.3,
                rotateX: 0, // Remove inclinação no eixo X
                rotateY: 0, // Remove inclinação no eixo Y
                ease: "power1.inOut", // Animação suave ao resetar
            });
        }
    };

    return (
        <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
            <div className="flex size-full flex-col items-center py-10 pb-24">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    the multiversal ip world
                </p>

                <div className="relative size-full">
                    <AnimatedTitle
                        title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />

                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content">
                                <img
                                    ref={frameRef}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    src="/img/entrance.webp"
                                    alt="entrance.webp"
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Definições SVG para cantos arredondados*/}
                        <svg
                            className="invisible absolute size-0"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                <filter id="flt_tag">
                                    <feGaussianBlur
                                        in="SourceGraphic"
                                        stdDeviation="8"
                                        result="blur"
                                    />
                                    <feColorMatrix
                                        in="blur"
                                        mode="matrix"
                                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                        result="flt_tag"
                                    />
                                    <feComposite
                                        in="SourceGraphic"
                                        in2="flt_tag"
                                        operator="atop"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum doloribus saepe alias voluptates facere reiciendis quas libero! Repellat magni commodi ratione sint, placeat repudiandae minus esse sit inventore, rem voluptatem!
                        </p>

                        <Button
                            id="realm-btn"
                            title="discover prologue"
                            containerClass="mt-5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingImage;