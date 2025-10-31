function playVideo() {
            alert('Video oynatılıyor... (Demo amaçlı)');
        }

        function toggleWatched() {
            const btn = document.getElementById('watchedBtn');
            const isWatched = btn.classList.contains('watched');
            
            if (isWatched) {
                btn.classList.remove('watched');
                btn.innerHTML = '✓ İzledim';
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
            } else {
                btn.classList.add('watched');
                btn.innerHTML = '★ İzlendi';
                btn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 150);
                
                // Küçük bir confetti efekti simülasyonu
                btn.style.boxShadow = '0 0 20px #4caf50';
                setTimeout(() => {
                    btn.style.boxShadow = '';
                }, 600);
            }
        }

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2').forEach(el => {
            observer.observe(el);
        });

        // Enhanced interactions
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.poster-container');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                card.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-10px)`;
            });
        });

        document.addEventListener('mouseleave', () => {
            const cards = document.querySelectorAll('.poster-container');
            cards.forEach(card => {
                card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
            });
        });