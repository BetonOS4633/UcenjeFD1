document.addEventListener('DOMContentLoaded', function () {
    const studentGrid = document.querySelector('.student-grid');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Dinamičko stvaranje kartica polaznika
    polaznici.forEach(polaznik => {
        const card = document.createElement('div');
        card.className = 'student-card';

        const img = document.createElement('img');
        img.src = polaznik.slika;
        img.alt = `${polaznik.ime} ${polaznik.prezime}`;
        img.className = 'student-image';

        const info = document.createElement('div');
        info.className = 'student-info';

        const nameLink = document.createElement('a');
        nameLink.href = polaznik.url;
        nameLink.target = '_blank'; // Otvara u novom tabu

        const name = document.createElement('h3');
        name.textContent = `${polaznik.prezime} ${polaznik.ime}`;
        
        nameLink.appendChild(name);
        info.appendChild(nameLink);
        card.appendChild(img);
        card.appendChild(info);
        studentGrid.appendChild(card);
    });

    const studentImages = document.querySelectorAll('.student-image');
    const images = polaznici.map(p => p.slika);
    const names = polaznici.map(p => `${p.prezime} ${p.ime}`);
    const urls = polaznici.map(p => p.url);
    let currentIndex;

    studentImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            currentIndex = index;
            openModal(images[currentIndex], names[currentIndex], urls[currentIndex]);
        });
    });

    function openModal(src, name, url) {
        modal.style.display = 'block';
        modalImg.src = src;
        modalCaption.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        setTimeout(() => modal.classList.add('show'), 10);
    }

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex];
        modalCaption.innerHTML = `<a href="${urls[currentIndex]}" target="_blank">${names[currentIndex]}</a>`;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex];
        modalCaption.innerHTML = `<a href="${urls[currentIndex]}" target="_blank">${names[currentIndex]}</a>`;
    }

    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
});
