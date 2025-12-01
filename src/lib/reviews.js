import { gsap } from 'gsap';

export function initReviews() {
    // Testimonials Auto Scroll
    const track = document.getElementById('reviews-track');
    if (track) {
        const cardWidth = 320; // 300 + 20 margin
        const totalCards = 6;
        const totalWidth = cardWidth * totalCards;

        function scrollReviews() {
            gsap.to(track, {
                x: -totalWidth,
                duration: 20,
                ease: 'none',
                onComplete: () => {
                    gsap.set(track, { x: 0 });
                    scrollReviews();
                },
            });
        }

        scrollReviews();
    }

    // Fetch Google Reviews
    const apiKey = 'YOUR_GOOGLE_PLACES_API_KEY'; // Replace with your key
    const placeId = 'YOUR_PLACE_ID'; // Replace with your place ID

    async function fetchReviews() {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
            );
            const data = await response.json();
            if (data.result && data.result.reviews) {
                const reviews = data.result.reviews.slice(0, 6); // Take first 6
                const track = document.getElementById('reviews-track');
                if (track) {
                    track.innerHTML = '';
                    // @ts-ignore
                    reviews.forEach((review) => {
                        const card = document.createElement('div');
                        card.className = 'flex-none w-80 bg-gray-100 p-5 rounded-lg shadow-md mr-5 text-left';
                        const stars =
                            '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                        const text = review.text
                            ? `"${review.text}"`
                            : '"No review text"';
                        const author = `- ${review.author_name}`;
                        card.innerHTML = `
              <div class="text-yellow-500 text-xl">${stars}</div>
              <p class="mb-2.5">${text}</p>
              <div class="font-bold">${author}</div>
            `;
                        track.appendChild(card);
                    });
                    // Duplicate for infinite scroll
                    // @ts-ignore
                    reviews.forEach((review) => {
                        const card = document.createElement('div');
                        card.className = 'flex-none w-80 bg-gray-100 p-5 rounded-lg shadow-md mr-5 text-left';
                        const stars =
                            '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                        const text = review.text
                            ? `"${review.text}"`
                            : '"No review text"';
                        const author = `- ${review.author_name}`;
                        card.innerHTML = `
              <div class="text-yellow-500 text-xl">${stars}</div>
              <p class="mb-2.5">${text}</p>
              <div class="font-bold">${author}</div>
            `;
                        track.appendChild(card);
                    });
                    // Update track width
                    const totalCards = reviews.length * 2;
                    const cardWidth = 320;
                    const totalWidth = cardWidth * totalCards;
                    track.style.width = `${totalWidth}px`;
                }
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    fetchReviews();
}
