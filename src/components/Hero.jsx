import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1); // Estado para o índice do vídeo atual
    const [hasClicked, setHasClicked] = useState(false); // Estado para verificar se o botão foi clicado

    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos vídeos
    const [loadedVideos, setLoadedVideos] = useState(0); // Estado para contar os vídeos carregados

    const totalVideos = 4; // Número total de vídeos
    const nextVdRef = useRef(null); // Referência para o próximo vídeo

    // Função para atualizar o contador de vídeos carregados
    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    // Efeito para alterar o estado de 'loading' quando todos os vídeos estiverem carregados
    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setLoading(false); // Atualiza o estado para "não carregando"
        }
    }, [loadedVideos]);

    // Função para lidar com o clique no vídeo miniatura
    const handleMiniVdClick = () => {
        setHasClicked(true);

        // Atualiza o índice do vídeo atual
        setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
    };

    // Animação GSAP para exibir o próximo vídeo com efeitos de transição
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" }); // Torna o próximo vídeo visível
                gsap.to("#next-video", {
                    transformOrigin: "center center", // Define a origem da transformação
                    scale: 1,
                    width: "100%", // Ajusta o tamanho
                    height: "100%",
                    duration: 1, // Duração da animação
                    ease: "power1.inOut", // Efeito de transição
                    onStart: () => nextVdRef.current.play(), // Inicia a reprodução do vídeo
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0, // Começa com escala 0
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [currentIndex], // Dependência de atualização do índice
            revertOnUpdate: true, // Reverte animação quando há atualização
        }
    );

    // Animação GSAP para o efeito de borda e clip-path no quadro do vídeo ao rolar
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)", // Define o formato da borda inicial
            borderRadius: "0% 0% 40% 10%", // Define o raio da borda
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Transição do clip-path
            borderRadius: "0% 0% 0% 0%", // Transição do raio da borda
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame", // Elemento que aciona o gatilho de rolagem
                start: "center center", // Início da animação
                end: "bottom center", // Fim da animação
                scrub: true, // Sincroniza animação com rolagem
            },
        });
    });

    // Função para obter o caminho do vídeo com base no índice
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="relative h-dvh w-screen overflow-x-hidden">
            {/* Se os vídeos ainda estiverem carregando, exibe uma animação de carregamento */}
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    {/* Animação de carregamento que usa o efeito "three-body" enquanto espera os vídeos */}
                    {/* https://uiverse.io/G4b413l/tidy-walrus-92 */ }
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            {/* Contêiner para o vídeo e aplica a máscara onde os vídeos serão renderizados */}
            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    {/* Máscara de clip-path que esconde as bordas do vídeo e permite interação ao clicar */}
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <VideoPreview>
                            <div
                                onClick={handleMiniVdClick} // Ao clicar no vídeo, troca o conteúdo
                                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                            >
                                {/* Exibe o vídeo em uma escala pequena e invisível inicialmente aumentando no hover */}
                                <video
                                    ref={nextVdRef}
                                    src={getVideoSrc((currentIndex % totalVideos) + 1)} // Usa o índice para escolher o vídeo correto
                                    loop
                                    muted
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                    onLoadedData={handleVideoLoad} // Atualiza o contador de vídeos carregados
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    {/* Vídeo invisível que será exibido após o clique */}
                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)} // Carrega o vídeo baseado no índice atual
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad} // Atualiza o contador de vídeos carregados
                    />

                    {/* Vídeo de fundo fica em loop para criar uma sensação de continuidade */}
                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex // Garante a rotação infinita entre os vídeos
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad} // Atualiza o contador de vídeos carregados
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    G<b>A</b>MING
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Watch trailer"
                            leftIcon={<TiLocationArrow />} // Ícone para mostrar que é uma ação de navegação
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
                G<b>A</b>MING
            </h1>
        </div>
    );
};

export default Hero;