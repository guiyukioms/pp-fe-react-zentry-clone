import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

// Componente que aplica efeito de inclinação com base na posição do mouse
export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState(""); // Estado para armazenar o estilo de transformação
    const itemRef = useRef(null); // Referência ao elemento para obter dimensões e posição

    // Manipula o movimento do mouse para calcular a inclinação
    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        // Obtém as dimensões e posição do elemento
        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        // Calcula a posição relativa do mouse dentro do elemento
        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        // Define os ângulos de inclinação com base na posição do mouse
        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        // Gera o estilo de transformação para aplicar o efeito
        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    // Reseta o estilo de transformação quando o mouse sai do elemento
    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }} // Aplica o estilo calculado
        >
            {children} {/* Renderiza os elementos filhos */}
        </div>
    );
};

// Componente do card com vídeo e informações adicionais
export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Estado para a posição do cursor NO botão
    const [hoverOpacity, setHoverOpacity] = useState(0); // Estado para controlar a opacidade do efeito de hover
    const hoverButtonRef = useRef(null); // Referência ao botão para calcular a posição do cursor

    // Atualiza a posição do cursor ao mover o mouse DENTRO do botão
    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    // Mostra o efeito de hover ao passar o mouse
    const handleMouseEnter = () => setHoverOpacity(1);

    // Esconde o efeito de hover ao sair do botão
    const handleMouseLeave = () => setHoverOpacity(0);

    return (
        <div className="relative size-full">
            {/* Vídeo de fundo com reprodução automática */}
            <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            {/* Conteúdo do card sobreposto ao vídeo */}
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    {/* Título e descrição do card */}
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {/* Botão "Coming Soon" com efeito visual */}
                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        {/* Camada para o gradiente radial do hover */}
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity, // Controla a opacidade do gradiente
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`, // Gradiente posicionado no cursor
                            }}
                        />
                        {/* Ícone e texto do botão */}
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <section className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32">
                <p className="font-circular-web text-lg text-blue-50">
                    Into the Metagame Layer
                </p>
                <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quaerat quidem culpa illo magni commodi ut perferendis? Quis nemo tenetur quae, vitae dignissimos eligendi laudantium consectetur tempore ad? Provident, debitis!
                </p>
            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="videos/feature-1.mp4"
                    title={
                        <>
                            radia<b>n</b>t
                        </>
                    }
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo maxime nostrum impedit dolore error repudiandae harum beatae!"
                    isComingSoon
                />
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src="videos/feature-2.mp4"
                        title={
                            <>
                                zig<b>m</b>a
                            </>
                        }
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quo maxime nostrum impedit dolore error repudiandae harum beatae!"
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard
                        src="videos/feature-3.mp4"
                        title={
                            <>
                                n<b>e</b>xus
                            </>
                        }
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nihil quisquam vero labore amet? Nemo cum ratione eum!"
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard
                        src="videos/feature-4.mp4"
                        title={
                            <>
                                az<b>u</b>l
                            </>
                        }
                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
                        isComingSoon
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                        <h1 className="bento-title special-font max-w-64 text-black">
                            M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                        </h1>

                        <TiLocationArrow className="m-5 scale-[5] self-end" />
                    </div>
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <video
                        src="videos/feature-5.mp4"
                        loop
                        muted
                        autoPlay
                        className="size-full object-cover object-center"
                    />
                </BentoTilt>
            </div>
        </div>
    </section>
);

export default Features;