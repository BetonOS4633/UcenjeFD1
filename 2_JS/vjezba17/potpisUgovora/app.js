const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const printBtn = document.getElementById('print-btn');
const clearBtn = document.getElementById('clear-btn');
const statusText = document.getElementById('status');
const dateSpan = document.getElementById('current-date');

// Postavi današnji datum
dateSpan.textContent = new Date().toLocaleDateString('hr-HR');

let isDrawing = false;

// Funkcije za crtanje
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
    checkSignatureCoverage(); // Provjeri popunjenost nakon svakog poteza
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    // Pozicioniranje ovisno o mišu ili dodiru
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.moveTo(x, y);
}

// Algoritam za provjeru 2% popunjenosti
function checkSignatureCoverage() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let nonBlankPixels = 0;

    // Prolazimo kroz pixele (svaki pixel ima 4 vrijednosti: R, G, B, A)
    // Gledamo Alpha kanal (indeks + 3)
    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] > 0) {
            nonBlankPixels++;
        }
    }

    const totalPixels = canvas.width * canvas.height;
    const percentage = (nonBlankPixels / totalPixels) * 100;

    statusText.textContent = `Potpisano: ${percentage.toFixed(1)}%`;

    // Ako je potpisano više od 2%, prikaži gumb
    if (percentage >= 2) {
        printBtn.style.display = 'inline-block';
        statusText.style.color = '#27ae60';
    } else {
        printBtn.style.display = 'none';
        statusText.style.color = '#7f8c8d';
    }
}

// Event listeneri
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);

// Podrška za mobitele (Touch)
canvas.addEventListener('touchstart', (e) => { e.preventDefault(); startDrawing(e); });
canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(e); });
canvas.addEventListener('touchend', stopDrawing);

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkSignatureCoverage();
});

printBtn.addEventListener('click', () => {
    window.print();
});