import { gsap } from 'gsap';

export function initAboutAnimation() {
    const paragraphs = document.querySelectorAll('#about-text p');
    if (paragraphs.length) {
        gsap.from(paragraphs, { opacity: 0, y: 20, duration: 0.8, stagger: 0.2, ease: 'power2.out' });
    }
}