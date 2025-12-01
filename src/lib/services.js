import { gsap } from "gsap";

export function animateServices() {
    const cards = document.querySelectorAll("[data-service-card]");
    if (!cards.length) return;

    // Respect prefers-reduced-motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Get center of viewport for stacked start position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Set initial stacked state
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offsetX = centerX - (rect.left + rect.width / 2);
        const offsetY = centerY - (rect.top + rect.height / 2);

        gsap.set(card, {
            x: offsetX,
            y: offsetY,
            opacity: 0,
            rotate: gsap.utils.random(-10, 10),
            scale: 0.8,
        });
    });

    // Animate cards to their final positions
    gsap.to(cards, {
        x: 0,
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15,
    });
}
