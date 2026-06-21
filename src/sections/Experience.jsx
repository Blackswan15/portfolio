import { useState } from 'react';
import { workExperiences } from '../constants/index.js';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - card.left;
    const mouseY = e.clientY - card.top;
    const x = (mouseX / card.width) * 2 - 1;
    const y = (mouseY / card.height) * 2 - 1;

    setRotate({ x: x * 15, y: y * -15 });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
    setAnimationName('idle');
  };
  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p className="head-text">My Works</p>

        <div className="work-container">
          <div className="work-canvas flex items-center justify-center bg-black-200 rounded-lg border border-black-300 overflow-hidden p-4">
            <div
              className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ease-out shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg) scale(${isHovering ? 1.02 : 1})`,
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(79,70,229,0.05) 100%)',
                border: isHovering ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid rgba(255,255,255,0.05)',
                boxShadow: isHovering 
                  ? '0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 15px rgba(6, 182, 212, 0.1)' 
                  : '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))]" 
                style={{ backgroundSize: '100% 4px, 6px 100%' }}
              />

              <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent -translate-y-full animate-[scan_3s_linear_infinite]" />

              <img
                src="/assets/abi.png"
                alt="Abishek Ramaswami Cutout"
                className="w-full h-full object-cover select-none pointer-events-none mix-blend-lighten transition-transform duration-200 ease-out"
                style={{
                  transform: `translate3d(${rotate.x * 0.3}px, ${rotate.y * -0.3}px, 0px) scale(1.05)`,
                  filter: isHovering || animationName !== 'idle'
                    ? 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6)) brightness(1.1)' 
                    : 'brightness(0.85) contrast(1.05)',
                }}
              />

              <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-cyan-400/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-cyan-400/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-cyan-400/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-cyan-400/40 pointer-events-none" />
            </div>
          </div>
          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOut={() => setAnimationName('idle')}
                  className="work-content_container group"
                >
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-5">{item.pos}</p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;