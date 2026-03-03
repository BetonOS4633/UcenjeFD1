let mediaRecorder;
let recordedChunks = [];
let stream;

const videoLive = document.getElementById('videoLive');
const videoPlayback = document.getElementById('videoPlayback');
const placeholderText = document.getElementById('placeholderText');
const startCamBtn = document.getElementById('startCam');
const startRecordBtn = document.getElementById('startRecord');
const stopRecordBtn = document.getElementById('stopRecord');
const downloadBtn = document.getElementById('download');
const statusBadge = document.getElementById('status');

function getTimestamp() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) +
           pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
}

// 1. Pokretanje kamere
startCamBtn.onclick = async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 1280, height: 720 }, 
            audio: true 
        });
        videoLive.srcObject = stream;
        
        startCamBtn.disabled = true;
        startRecordBtn.disabled = false;
        statusBadge.textContent = "Kamera spremna";
    } catch (err) {
        alert("Greška: " + err);
    }
};

// 2. Početak snimanja
startRecordBtn.onclick = () => {
    recordedChunks = [];
    // Postavke snimanja (VP9 ili H264 ovisno o pregledniku)
    const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm';
    }

    mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Prikaži snimku na desnoj strani
        videoPlayback.src = url;
        videoPlayback.style.display = 'block';
        placeholderText.style.display = 'none';
        
        downloadBtn.disabled = false;
        window.currentVideoBlob = blob;
    };

    mediaRecorder.start();
    
    // UI promjene
    startRecordBtn.disabled = true;
    stopRecordBtn.disabled = false;
    statusBadge.textContent = "SNIMANJE U TIJEKU...";
    statusBadge.classList.add('recording-now');
};

// 3. Zaustavljanje snimanja
stopRecordBtn.onclick = () => {
    mediaRecorder.stop();
    stopRecordBtn.disabled = true;
    startRecordBtn.disabled = false;
    statusBadge.textContent = "Snimka završena";
    statusBadge.classList.remove('recording-now');
};

// 4. Download
downloadBtn.onclick = () => {
    if (!window.currentVideoBlob) return;
    
    const defaultName = `video_${getTimestamp()}.webm`;
    let fileName = prompt("Spremi video kao:", defaultName);
    
    if (!fileName) return;
    if (!fileName.toLowerCase().endsWith('.webm')) fileName += '.webm';

    const a = document.createElement('a');
    a.href = URL.createObjectURL(window.currentVideoBlob);
    a.download = fileName;
    a.click();
};