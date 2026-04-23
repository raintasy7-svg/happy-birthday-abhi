document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createFloatingHearts();
    initPhotos();

    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });
});

function createStars() {
    for (let i = 1; i <= 5; i++) {
        const container = document.getElementById('stars' + i);
        if (!container) continue;
        for (let j = 0; j < 80; j++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            star.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(star);
        }
    }
}

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = ['💙', '🤍', '💜', '✨', '⭐', '🦋'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.setProperty('--duration', (Math.random() * 10 + 8) + 's');
        heart.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(heart);
    }
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const password = input.value.toLowerCase().trim();

    if (password === 'varun') {
        document.getElementById('lockIcon').textContent = '🔓';
        document.getElementById('errorMsg').textContent = '';
        launchConfetti();

        setTimeout(function() {
            goToPage(2);
        }, 1000);
    } else {
        document.getElementById('errorMsg').textContent = '🚫 Wrong password! Think harder 😜';
        input.classList.add('shake');
        setTimeout(function() {
            input.classList.remove('shake');
        }, 500);
    }
}

function togglePassword() {
    const input = document.getElementById('passwordInput');
    const btn = document.getElementById('eyeBtn');
    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '🙈';
    } else {
        input.type = 'password';
        btn.textContent = '👁️';
    }
}

function goToPage(pageNum) {
    const pages = document.querySelectorAll('.page');

    pages.forEach(function(page) {
        if (page.classList.contains('active')) {
            page.classList.add('page-exit');
            setTimeout(function() {
                page.classList.remove('active', 'page-exit');
                page.style.display = 'none';
            }, 500);
        }
    });

    setTimeout(function() {
        const target = document.getElementById('page' + pageNum);
        target.style.display = 'flex';
        target.classList.add('active', 'page-enter');

        setTimeout(function() {
            target.classList.remove('page-enter');
        }, 800);

        if (pageNum === 2) {
            candlesBlown = 0;
            for (let i = 0; i < 5; i++) {
                const flame = document.getElementById('flame' + i);
                if (flame) flame.classList.remove('blown');
            }
            document.getElementById('wishPrompt').style.display = 'none';
            document.getElementById('blowText').style.display = 'block';
        }

        if (pageNum === 4) {
            document.getElementById('giftWrapper').style.display = 'block';
            document.getElementById('giftReveal').style.display = 'none';
            const lid = document.getElementById('giftLid');
            if (lid) lid.classList.remove('opened');
        }
    }, 500);
}

let candlesBlown = 0;

function blowCandle(candle, index) {
    const flame = document.getElementById('flame' + index);
    if (flame.classList.contains('blown')) return;

    flame.classList.add('blown');
    candlesBlown++;

    if (candlesBlown >= 5) {
        setTimeout(function() {
            document.getElementById('blowText').textContent = '🎉 All candles blown! 🎉';
            document.getElementById('wishPrompt').style.display = 'block';
            launchConfetti();
        }, 500);
    }
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const flap = envelope.querySelector('.envelope-flap');

    flap.style.transform = 'rotateX(180deg)';

    setTimeout(function() {
        envelope.style.display = 'none';
        document.getElementById('letterContent').style.display = 'block';
    }, 600);
}

function openGift() {
    const lid = document.getElementById('giftLid');
    lid.classList.add('opened');

    setTimeout(function() {
        document.getElementById('giftWrapper').style.display = 'none';
        document.getElementById('giftReveal').style.display = 'block';
        launchConfetti();
    }, 800);
}

const photoData = [
    {
        src: 'photo1.jpg.jpg',
        caption: 'Where it all started 💙'
    },
    {
        src: 'photo3.jpg.jpg',
        caption: 'Our crazy adventures 😂'
    },
    {
        src: 'photo4.jpg.jpg',
        caption: 'Best memories ever ✨'
    },
    {
        src: 'photo5.jpg.jpg',
        caption: 'Distance means nothing 🌍💙'
    },
    {
        src: 'photo6.jpg.jpg',
        caption: 'Forever & always 🤍'
    }
];

let currentPhoto = 0;

function initPhotos() {
    if (photoData.length > 0) {
        updatePhoto();
    }
}

function updatePhoto() {
    const img = document.getElementById('slideshowImg');
    const caption = document.getElementById('photoCaption');
    const counter = document.getElementById('photoCounter');

    img.style.opacity = 0;
    setTimeout(function() {
        img.src = photoData[currentPhoto].src;
        caption.textContent = photoData[currentPhoto].caption;
        counter.textContent = (currentPhoto + 1) + ' / ' + photoData.length;
        img.style.opacity = 1;
    }, 300);
}

function nextPhoto() {
    currentPhoto = (currentPhoto + 1) % photoData.length;
    updatePhoto();
}

function prevPhoto() {
    currentPhoto = (currentPhoto - 1 + photoData.length) % photoData.length;
    updatePhoto();
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#7c3aed', '#a78bfa', '#fbbf24', '#f59e0b', '#ff6ba8',
                    '#ff9fce', '#60a5fa', '#34d399', '#f472b6', '#e879f9',
                    '#ffffff', '#c4b5fd'];

    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 12 + 5,
            h: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 0.2 - 0.1,
            drift: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.5
        });
    }

    let frames = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiPieces.forEach(function(piece) {
            ctx.save();
            ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
            ctx.rotate(piece.angle * Math.PI / 180);
            ctx.globalAlpha = piece.opacity;
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();

            piece.y += piece.speed;
            piece.x += piece.drift;
            piece.angle += piece.spin * 10;
            piece.opacity -= 0.002;
        });

        frames++;
        if (frames < 300) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}

window.addEventListener('resize', function() {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
