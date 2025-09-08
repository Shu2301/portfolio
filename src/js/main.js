document.addEventListener('DOMContentLoaded', () => {
	// SLIDESHOW
	const slides = Array.from(
		document.querySelectorAll('.header-slideshow .slide')
	);
	let current = 0;
	let slideInterval = null;

	const showSlide = (idx) => {
		slides.forEach((s, i) => s.classList.toggle('active', i === idx));
	};

	const startSlideshow = () => {
		if (slideInterval || slides.length <= 1) return;
		slideInterval = setInterval(() => {
			current = (current + 1) % slides.length;
			showSlide(current);
		}, 4000);
	};

	const stopSlideshow = () => {
		if (slideInterval) {
			clearInterval(slideInterval);
			slideInterval = null;
		}
	};

	// Pause slideshow when tab not visible (save CPU)
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopSlideshow();
		else startSlideshow();
	});

	// init
	showSlide(0);
	startSlideshow();

	// SCROLL ANIMATION (simple, keep same behavior)
	const sections = document.querySelectorAll('.fade-in');
	const revealOnScroll = () => {
		const triggerBottom = window.innerHeight * 0.85;
		sections.forEach((sec) => {
			const rect = sec.getBoundingClientRect();
			if (rect.top < triggerBottom) sec.classList.add('visible');
		});
	};
	window.addEventListener('scroll', revealOnScroll, { passive: true });
	revealOnScroll();

	// THEME TOGGLE
	const toggleBtn = document.getElementById('themeToggle');
	if (toggleBtn) {
		toggleBtn.addEventListener('click', () => {
			document.body.classList.toggle('dark');
			toggleBtn.textContent = document.body.classList.contains('dark')
				? '☀️'
				: '🌙';
		});
	}
});
