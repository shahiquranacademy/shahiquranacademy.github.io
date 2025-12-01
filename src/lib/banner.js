import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", () => {
    const slide = window.innerWidth < 512 ? '.mslide' : '.slide';
    const slides = gsap.utils.toArray(slide);
    const totalSlides = slides.length;
    let index = 0;

    // Set anchor point to the center
    gsap.set(slides, { xPercent: -50, yPercent: -50 });

    function layout() {
        slides.forEach((slide, i) => {
            const pos = (i - index + totalSlides) % totalSlides;

            if (pos === 0) {
                // Center
                gsap.to(slide, {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    zIndex: 10,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
            else if (pos === 1) {
                // Right
                gsap.to(slide, {
                    x: "55vw",
                    scale: 0.85,
                    opacity: 0.6,
                    zIndex: 5,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
            else if (pos === totalSlides - 1) {
                // Left
                gsap.to(slide, {
                    x: "-55vw",
                    scale: 0.85,
                    opacity: 0.6,
                    zIndex: 5,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
            else {
                // Hidden
                gsap.to(slide, {
                    x: 0,
                    scale: 0,
                    opacity: 0,
                    zIndex: 0,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }
        });
    }

    // Initial layout
    layout();

    // RequestAnimationFrame loop timer
    let lastTime = 0;
    const delay = 5000; // ms

    function raf(time) {
        if (time - lastTime >= delay) {
            lastTime = time;
            index = (index + 1) % totalSlides;
            layout();
        }
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});
