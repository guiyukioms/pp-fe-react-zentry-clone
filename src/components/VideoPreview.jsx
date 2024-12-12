import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null); // Referência para a seção do contêiner
  const contentRef = useRef(null); // Referência para o conteúdo interno

  // Manipula o movimento do mouse sobre o contêiner
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // Obter as dimensões do contêiner

    const xOffset = clientX - (rect.left + rect.width / 2); // Calcular o deslocamento em X
    const yOffset = clientY - (rect.top + rect.height / 2); // Calcular o deslocamento em Y

    if (isHovering) {
      // Move o container levemente na direçao do cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2, // Adiciona efeito de rotação 3D
        rotationX: -yOffset / 2,
        transformPerspective: 500, // Perspectiva para efeito 3D realista
        duration: 1,
        ease: "power1.out",
      });

      // Move o conteúdo interno na direção oposta para um efeito parallax
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
   // Reinicia a posição do conteúdo quando o 'hover' termina
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px",
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;