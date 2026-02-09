'use client';

import { useEffect, useState } from 'react';

interface Cube {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

export default function CubeGrid() {
  const [cubes, setCubes] = useState<Cube[]>([]);

  useEffect(() => {
    // Generate random cubes
    const colors = ['#9333EA', '#3B82F6', '#06B6D4'];
    const newCubes: Cube[] = [];
    
    for (let i = 0; i < 30; i++) {
      newCubes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    setCubes(newCubes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {cubes.map((cube) => (
        <div
          key={cube.id}
          className="absolute cube-float"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            animationDelay: `${cube.delay}s`,
            animationDuration: `${cube.duration}s`,
          }}
        >
          <div className="cube-container">
            <div 
              className="cube-face cube-face-front"
              style={{ 
                backgroundColor: cube.color,
                boxShadow: `0 0 20px ${cube.color}80, 0 0 40px ${cube.color}40`,
              }}
            />
            <div 
              className="cube-face cube-face-back"
              style={{ backgroundColor: cube.color }}
            />
            <div 
              className="cube-face cube-face-right"
              style={{ backgroundColor: cube.color }}
            />
            <div 
              className="cube-face cube-face-left"
              style={{ backgroundColor: cube.color }}
            />
            <div 
              className="cube-face cube-face-top"
              style={{ backgroundColor: cube.color }}
            />
            <div 
              className="cube-face cube-face-bottom"
              style={{ backgroundColor: cube.color }}
            />
          </div>
        </div>
      ))}

      <style jsx>{`
        .cube-float {
          width: 30px;
          height: 30px;
          animation: float infinite ease-in-out;
          opacity: 0.3;
        }

        .cube-container {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 20s infinite linear;
        }

        .cube-face {
          position: absolute;
          width: 30px;
          height: 30px;
          opacity: 0.6;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cube-face-front  { transform: translateZ(15px); }
        .cube-face-back   { transform: translateZ(-15px) rotateY(180deg); }
        .cube-face-right  { transform: rotateY(90deg) translateZ(15px); }
        .cube-face-left   { transform: rotateY(-90deg) translateZ(15px); }
        .cube-face-top    { transform: rotateX(90deg) translateZ(15px); }
        .cube-face-bottom { transform: rotateX(-90deg) translateZ(15px); }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }

        @keyframes rotate {
          from {
            transform: rotateX(0deg) rotateY(0deg);
          }
          to {
            transform: rotateX(360deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
