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

	// PAUSE SLIDESHOW (save CPU)
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) stopSlideshow();
		else startSlideshow();
	});

	// Init
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
	const modal = document.getElementById('project-modal');
	const closeBtn = modal.querySelector('.modal-close');

	const modalImg = document.getElementById('modal-img');
	const modalTitle = document.getElementById('modal-title');
	const modalDesc = document.getElementById('modal-desc');
	const modalGithub = document.getElementById('modal-github');
	const modalDemo = document.getElementById('modal-demo');

	const openBtns = document.querySelectorAll('.open-modal');

	// DATA PROJECTS
	const projectData = {
		1: {
			title: 'Dev & HR Coordinator - Data Warehouse',
			desc: 'Phát triển UI và phối hợp nhân sự trong hệ thống Data Warehouse.',
			img: 'src/assets/main_avt.jpg',
			github: 'https://github.com/Shu2301',
			demo: 'https://example.com/demo1',
		},
		2: {
			title: 'Dev & Design - Data Warehouse',
			desc: 'Thiết kế UI/UX và phát triển giao diện với HTML, CSS, Figma.',
			img: 'src/assets/main_avt.jpg',
			github: 'https://github.com/Shu2301',
			demo: 'https://example.com/demo2',
		},
	};

	// OPEN MODAL
	openBtns.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			const id = btn.dataset.project;
			const data = projectData[id];

			modalTitle.textContent = data.title;
			modalDesc.textContent = data.desc;
			modalImg.src = data.img;
			modalGithub.href = data.github;
			modalDemo.href = data.demo;

			modal.style.display = 'flex';
		});
	});

	const cvModal = document.getElementById('cv-modal');
	const cvOpenBtn = document.querySelector('.open-cv');
	const cvCloseBtn = cvModal.querySelector('.modal-close');
	// CLOSE MODAL
	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
		}
	});

	// OPEN MODAL CV
	cvOpenBtn.addEventListener('click', (e) => {
		e.preventDefault();
		cvModal.style.display = 'flex';
	});

	// CLOSE MODAL CV
	cvCloseBtn.addEventListener('click', () => {
		cvModal.style.display = 'none';
	});
	window.addEventListener('click', (e) => {
		if (e.target === cvModal) {
			cvModal.style.display = 'none';
		}
	});
});
