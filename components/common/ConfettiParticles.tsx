import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationX: number;
  rotationY: number;
  rotationSpeed: number;
  rotationXSpeed: number;
  rotationYSpeed: number;
  color: string;
  width: number;
  height: number;
  opacity: number;
}

interface ConfettiParticlesProps {
  active: boolean;
  particleCount?: number;
}

const colors = ["#00a758", "#00753e", "#16a34a", "#ffd700", "#ff6b6b", "#4ecdc4", "#ffe66d", "#a8e6cf"];

export default function ConfettiParticles({ active, particleCount = 75 }: ConfettiParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      // Sử dụng setTimeout để tránh setState đồng bộ trong effect
      const timer = setTimeout(() => {
        setParticles([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    // Tạo particles mới khi active
    const newParticles: Particle[] = [];
    const centerX = window.innerWidth / 2;
    const startY = window.innerHeight * 0.8; // Bắt đầu từ 80% chiều cao màn hình (dưới lên)

    for (let i = 0; i < particleCount; i++) {
      // Góc quạt từ -45 đến 45 độ (90 độ tổng)
      const angle = (Math.random() * 90 - 45) * (Math.PI / 180); // -45° đến 45°
      const speed = 5 + Math.random() * 10; // Tốc độ từ 5-10 (giảm để bắn thấp hơn)
      const vx = Math.sin(angle) * speed;
      const vy = -Math.cos(angle) * speed - 2; // Hướng lên trên, giảm lực đẩy

      // Kích thước hình chữ nhật (width và height khác nhau)
      const width = 4 + Math.random() * 10; // 4-10px
      const height = 2 + Math.random() * 6; // 2-6px (nhỏ hơn width để tạo hình chữ nhật)

      newParticles.push({
        id: i,
        x: centerX + (Math.random() - 0.5) * 100, // Rải rộng một chút ở điểm xuất phát
        y: startY,
        vx,
        vy,
        rotation: Math.random() * 360,
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        rotationXSpeed: (Math.random() - 0.5) * 8,
        rotationYSpeed: (Math.random() - 0.5) * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        width,
        height,
        opacity: 0.8 + Math.random() * 0.2,
      });
    }

    // Sử dụng setTimeout để tránh setState đồng bộ trong effect
    const initTimer = setTimeout(() => {
      setParticles(newParticles);
    }, 0);

    // Animation loop
    const interval = setInterval(() => {
      setParticles((prev) => {
        return prev
          .map((particle) => {
            const newX = particle.x + particle.vx;
            const newY = particle.y + particle.vy;
            const newVy = particle.vy + 0.2; // Trọng lực (tăng để rơi nhanh hơn, bắn thấp hơn)
            const newRotation = particle.rotation + particle.rotationSpeed;
            const newRotationX = particle.rotationX + particle.rotationXSpeed;
            const newRotationY = particle.rotationY + particle.rotationYSpeed;
            const newOpacity = particle.opacity - 0.008; // Fade out dần (chậm hơn để thấy rõ hơn)

            // Loại bỏ particles đã ra khỏi màn hình hoặc opacity quá thấp
            if (
              newY < -50 ||
              newY > window.innerHeight + 50 ||
              newX < -50 ||
              newX > window.innerWidth + 50 ||
              newOpacity < 0
            ) {
              return null;
            }

            return {
              ...particle,
              x: newX,
              y: newY,
              vy: newVy,
              rotation: newRotation,
              rotationX: newRotationX,
              rotationY: newRotationY,
              opacity: newOpacity,
            };
          })
          .filter((p): p is Particle => p !== null);
      });
    }, 16); // ~60fps

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, [active, particleCount]);

  if (!active || particles.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {particles.map((particle) => {
        // Tạo màu gradient cho hiệu ứng 3D
        const baseColor = particle.color;
        // Chuyển đổi hex sang rgb để tạo gradient
        const hexToRgb = (hex: string) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
              }
            : { r: 0, g: 167, b: 88 };
        };

        const rgb = hexToRgb(baseColor);
        const lighterRgb = {
          r: Math.min(255, rgb.r + 40),
          g: Math.min(255, rgb.g + 40),
          b: Math.min(255, rgb.b + 40),
        };
        const darkerRgb = {
          r: Math.max(0, rgb.r - 30),
          g: Math.max(0, rgb.g - 30),
          b: Math.max(0, rgb.b - 30),
        };

        const gradient = `linear-gradient(135deg, 
          rgba(${lighterRgb.r}, ${lighterRgb.g}, ${lighterRgb.b}, 1) 0%,
          rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1) 50%,
          rgba(${darkerRgb.r}, ${darkerRgb.g}, ${darkerRgb.b}, 1) 100%
        )`;

        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              background: gradient,
              transform: `translate(-50%, -50%) rotateZ(${particle.rotation}deg) rotateX(${particle.rotationX}deg) rotateY(${particle.rotationY}deg)`,
              transformStyle: "preserve-3d",
              perspective: "1000px",
              opacity: particle.opacity,
              boxShadow: `
                0 0 ${particle.width / 2}px ${baseColor}60,
                inset 0 1px 2px rgba(255, 255, 255, 0.3),
                inset 0 -1px 2px rgba(0, 0, 0, 0.3),
                0 2px 4px rgba(0, 0, 0, 0.2)
              `,
              borderRadius: "2px",
            }}
          />
        );
      })}
    </div>
  );
}
