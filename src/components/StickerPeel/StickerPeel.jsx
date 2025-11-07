import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './StickerPeel.css';

gsap.registerPlugin(Draggable);

const StickerPeel = ({ imageSrc, name }) => {
    const containerRef = useRef(null);
    const dragTargetRef = useRef(null);
    const pointLightRef = useRef(null);
    const pointLightFlippedRef = useRef(null);
    const draggableInstanceRef = useRef(null);

    // Random initial position
    useEffect(() => {
        const target = dragTargetRef.current;
        if (!target) return;

        const randomX = Math.random() * 1000;
        const randomY = Math.random() * 370;
        const randomRot = Math.random() * 40 - 20; // -20deg to 20deg

        gsap.set(target, {
            xPercent: randomX,
            yPercent: randomY,
            rotation: randomRot
        });
    }, []);

    // Draggable setup
    useEffect(() => {
        const target = dragTargetRef.current;
        const boundsEl = target.parentNode;

        draggableInstanceRef.current = Draggable.create(target, {
            type: 'x,y',
            bounds: boundsEl,
            inertia: true,
            onDrag() {
                const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
                gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });
            },
            onDragEnd() {
                gsap.to(target, { rotation: 0, duration: 0.8, ease: 'power2.out' });
            }
        })[0];

        return () => {
            if (draggableInstanceRef.current) {
                draggableInstanceRef.current.kill();
            }
        };
    }, []);

    // Lighting effect
    useEffect(() => {
        const updateLight = e => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(pointLightRef.current, { attr: { x, y } });
            gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', updateLight);
            return () => container.removeEventListener('mousemove', updateLight);
        }
    }, []);

    // Touch handling
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = () => container.classList.add('touch-active');
        const handleTouchEnd = () => container.classList.remove('touch-active');

        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, []);

    return (
        <div className="draggable" ref={dragTargetRef}>
            <svg width="0" height="0">
                <defs>
                    <filter id={`pointLight-${name}`}>
                        <feGaussianBlur stdDeviation="1" result="blur" />
                        <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant="0.1" lightingColor="white">
                            <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
                        </feSpecularLighting>
                        <feComposite in="spec" in2="SourceGraphic" result="lit" />
                        <feComposite in="lit" in2="SourceAlpha" operator="in" />
                    </filter>

                    <filter id={`pointLightFlipped-${name}`}>
                        <feGaussianBlur stdDeviation="10" result="blur" />
                        <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant="0.7" lightingColor="white">
                            <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
                        </feSpecularLighting>
                        <feComposite in="spec" in2="SourceGraphic" result="lit" />
                        <feComposite in="lit" in2="SourceAlpha" operator="in" />
                    </filter>

                    <filter id={`dropShadow-${name}`}>
                        <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="black" floodOpacity="0.5" />
                    </filter>

                    <filter id={`expandAndFill-${name}`}>
                        <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
                        <feFlood floodColor="rgb(179,179,179)" result="flood" />
                        <feComposite operator="in" in="flood" in2="shape" />
                    </filter>
                </defs>
            </svg>

            <div className="sticker-container" ref={containerRef}>
                <div className="sticker-main" style={{ filter: `url(#dropShadow-${name})` }}>
                    <div className="sticker-lighting" style={{ filter: `url(#pointLight-${name})` }}>
                        <img src={imageSrc} alt={name} className="sticker-image" draggable="false" />
                    </div>
                </div>

                <div className="flap">
                    <div className="flap-lighting" style={{ filter: `url(#pointLightFlipped-${name})` }}>
                        <img src={imageSrc} alt={name} className="flap-image" style={{ filter: `url(#expandAndFill-${name})` }} draggable="false" />
                    </div>
                </div>

                <div className="sticker-name">{name}</div>
            </div>
        </div>
    );
};

export default StickerPeel;