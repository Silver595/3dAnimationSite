import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react'
import gsap from 'gsap';

const AnimatedTitle = ({title,containerClass}) => {
  const containerRef = useRef(null)

    useEffect(() => {
    const ctx = gsap.context(() => {
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'center bottom',
            toggleActions: 'play none none reverse',
          },
        });
        titleAnimation.fromTo(
          '.animated-word',
          {
            opacity: 0,
            transform: 'translate3d(0, 40px, 0) rotateX(-25deg)',
          },
          {
            opacity: 1,
            transform: 'translate3d(0, 0, 0) rotateX(0deg)',
            ease: 'power2.out',
            stagger: 0.04,
            duration: 0.8,
          }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass}`}
    >
      {title.split('<br />').map((line, index) => (
        <div key={index} className="flex-center max-w-full flex-wrap gap-x-4 md:gap-x-6 gap-y-2 px-2">
          {line.split(' ').map((word, i) => (
            <span
              key={i}
              className="animated-word inline-block will-change-transform"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
AnimatedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired
}
export default AnimatedTitle
