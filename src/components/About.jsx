import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

// Registrando o ScrollTrigger do GSAP para animações baseadas em scroll
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    // Hook para inicializar animações com o GSAP
    useGSAP(() => {
        // Definindo a animação com timeline e ScrollTrigger
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",  // O elemento que dispara a animação
                start: "center center", // Início da animação quando o centro da tela atinge o centro do "clip"
                end: "+=800 center", // Fim da animação após 800px de scroll
                scrub: 0.5, // Sincroniza a animação com o scroll
                pin: true,  // Fixando o elemento durante o scroll
                pinSpacing: true, // Reserva o espaço enquanto o elemento está fixado
            },
        });

        // Expande a máscara até cobrir toda a tela
        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    Welcome to Zentry
                </p>

                <AnimatedTitle
                    title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
                    containerClass="mt-5 !text-black text-center"
                />

                <div className="about-subtext">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <p className="text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil error debitis expedita harum!
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img
                        src="img/about.webp"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;