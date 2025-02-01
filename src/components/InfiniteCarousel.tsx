import React, { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface Skill {
  name: string;
  icon: string;
}

interface InfiniteCarouselProps {
  skills: Skill[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ skills }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 1;
      if (position <= -carousel.scrollWidth / 2) {
        position = 0;
      }
      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={carouselRef}
        className="flex space-x-8 py-4"
        style={{ width: `${skills.length * 200}px` }}
      >
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-lg shadow-md flex-shrink-0"
          >
            <Icon icon={skill.icon} className="w-12 h-12 mb-2" />
            <span className="text-sm text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;

