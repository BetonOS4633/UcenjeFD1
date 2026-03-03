const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photoPreview = document.getElementById('photoPreview');
const placeholderText = document.getElementById('placeholderText');

const startBtn = document.getElementById('startCam');
const captureBtn = document.getElementById('capture');
const downloadBtn = document.getElementById('download');
const statusBadge = document.getElementById('status');

function getTimestamp() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) +
           pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
}

// 1. Pokretanje kamere
startBtn.onclick = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user" }, 
            audio: false 
        });
        video.srcObject = stream;
        
        startBtn.disabled = true;
        captureBtn.disabled = false;
        statusBadge.textContent = "Kamera aktivna";
        statusBadge.style.color = "#4ade80";
    } catch (err) {
        alert("Pristup kameri odbijen: " + err);
    }
};

// 2. Fotografiranje (Lijevo -> Desno)
captureBtn.onclick = () => {
    // Vizualni efekt bljeska
    video.style.opacity = "0.5";
    setTimeout(() => { video.style.opacity = "1"; }, 150);

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Ako želite da se i T-vodič vidi na slici, nacrtali bismo ga ovdje na canvas.
    // Ali obično se sprema samo čista fotografija:
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    photoPreview.src = dataUrl;
    
    placeholderText.style.display = 'none';
    photoPreview.style.display = 'block';
    downloadBtn.disabled = false;
    
    statusBadge.textContent = "Uspješno uslikano!";
    statusBadge.style.color = "#ec4899";
    setTimeout(() => { statusBadge.textContent = "Kamera aktivna"; statusBadge.style.color = "#4ade80"; }, 2000);
};

// 3. Download s promptom
downloadBtn.onclick = () => {
    const defaultName = `slika_${getTimestamp()}.png`;
    let fileName = prompt("Spremi kao:", defaultName);
    
    if (!fileName) return;
    if (!fileName.toLowerCase().endsWith('.png')) fileName += '.png';

    const link = document.createElement('a');
    link.href = photoPreview.src;
    link.download = fileName;
    link.click();
};