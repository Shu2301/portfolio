// Slideshow
const slides = document.querySelectorAll('.hero-slideshow .slide');
let current = 0;
setInterval(() => {
	slides[current].classList.remove('active');
	current = (current + 1) % slides.length;
	slides[current].classList.add('active');
}, 4000);

// Scroll animation
const sections = document.querySelectorAll('.fade-in');
const revealOnScroll = () => {
	const triggerBottom = window.innerHeight * 0.85;
	sections.forEach((sec) => {
		const rect = sec.getBoundingClientRect();
		if (rect.top < triggerBottom) {
			sec.classList.add('visible');
		}
	});
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Dark mode toggle
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	toggleBtn.textContent = document.body.classList.contains('dark')
		? '☀️'
		: '🌙';
});
