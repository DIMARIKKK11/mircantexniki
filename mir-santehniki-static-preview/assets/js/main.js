document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => nav.classList.remove('is-open'));
        });
    }

    const video = document.querySelector('.hero__video');
    if (video) {
        video.muted = true;
        video.playsInline = true;
        video.removeAttribute('loop');
        video.playbackRate = 1;

        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                video.controls = false;
            });
        }

        video.addEventListener('ended', () => {
            video.classList.add('is-ended');
            video.playbackRate = 1;
            try {
                video.pause();
            } catch (e) {}
        });
    }

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const revealItems = document.querySelectorAll('.feature-card, .category-grid li, .contact__card');
    revealItems.forEach((item) => item.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
});
