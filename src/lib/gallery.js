import { gsap } from 'gsap';

export function initGallery() {
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const images = gallery.children;
    const totalImages = images.length;
    let currentIndex = 0;

    function updateGallery() {
      for (let i = 0; i < totalImages; i++) {
        const diff = (i - currentIndex + totalImages) % totalImages;
        if (diff === 0) {
          // Center
          gsap.to(images[i], {
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '300px',
            zIndex: 2,
            opacity: 1,
            display: 'block',
            duration: 1,
            ease: 'power2.out'
          });
        } else if (diff === 1) {
          // Right
          gsap.to(images[i], {
            left: 'auto',
            right: '0',
            width: '30px',
            height: '30px',
            zIndex: 1,
            opacity: 0.5,
            display: 'block',
            duration: 1,
            ease: 'power2.out'
          });
        } else if (diff === 3) {
          // Left
          gsap.to(images[i], {
            left: '0',
            right: 'auto',
            width: '30px',
            height: '30px',
            zIndex: 1,
            opacity: 0.5,
            display: 'block',
            duration: 1,
            ease: 'power2.out'
          });
        } else {
          // Hidden
          gsap.to(images[i], {
            display: 'none',
            duration: 1,
            ease: 'power2.out'
          });
        }
      }
    }

    updateGallery();

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalImages;
      updateGallery();
    }, 3000);
  }
}
