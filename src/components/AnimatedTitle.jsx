import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Registrando o ScrollTrigger do GSAP para animações baseadas em scroll
gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    // Referência para o container do título
    const containerRef = useRef(null);

    useEffect(() => {
        // Usando gsap.context para escopo da animação
        const ctx = gsap.context(() => {
            // Criando uma linha do tempo para a animação com ScrollTrigger
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current, // Elemento a ser monitorado
                    start: "100 bottom", // Quando o topo do elemento atinge o final da tela
                    end: "center bottom", // Quando o centro do elemento atinge o fundo da tela
                    toggleActions: "play none none reverse", // Inicia e reverte a animação
                },
            });

            // Anima a opacidade e a transformação dos elementos com a classe .animated-word
            titleAnimation.to(
                ".animated-word",
                {
                    opacity: 1, // Torna visível
                    transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)", // Reseta a transformação
                    ease: "power2.inOut", // Transição suave
                    stagger: 0.02, // Adiciona um pequeno atraso entre as palavras
                },
                0 // Começa no início da animação
            );
        }, containerRef); // Limita a animação ao escopo do container

        // Limpeza do efeito ao desmontar o componente
        return () => ctx.revert();
    }, []); // A animação roda uma vez quando o componente é montado

    return (
        <div ref={containerRef} className={clsx("animated-title", containerClass)}>
            {/* Quebra o título em linhas usando <br /> */}
            {title.split("<br />").map((line, index) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {/* Quebra cada linha em palavras e aplica a animação nelas */}
                    {line.split(" ").map((word, idx) => (
                        <span
                            key={idx}
                            className="animated-word"
                            dangerouslySetInnerHTML={{ __html: word }} // Insere a palavra com html
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;