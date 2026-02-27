let mediaRecorder;
let audioChunks = [];
let audioUrl = '';
let audioContext;
let analyser;
let dataArray;
let animationId;


const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const volumeBar = document.getElementById('volumeBar');
const downloadBtn = document.getElementById('download');
const playback = document.getElementById('audioPlayback');

startBtn.onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  downloadBtn.disabled = true;
  // --- KONFIGURACIJA VIZUALIZACIJE ---
  audioContext = new (window.AudioContext || window.AudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  analyser = audioContext.createAnalyser();
  
  // FFT (Fast Fourier Transform) veličina - što je manja, to je brže ali manje precizno
  analyser.fftSize = 256; 
  source.connect(analyser);
  
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  updateVolumeMeter(); // Pokreni crtanje
  // ------------------------------------

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);
  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
    document.getElementById('audioPlayback').src = URL.createObjectURL(audioBlob);
    audioUrl = URL.createObjectURL(audioBlob);
    downloadBtn.disabled = false;
    audioChunks = [];
  };

  mediaRecorder.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
};

function updateVolumeMeter() {
  // Dohvati podatke o amplitudi
  analyser.getByteFrequencyData(dataArray);
  
  // Izračunaj prosječnu glasnoću (average volume)
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  let average = sum / dataArray.length;
  
  // Pretvori prosjek u postotak (0-100)
  // Vrijednosti su obično do 255, pa ih skaliramo
  let volumePercentage = Math.min(100, (average / 128) * 100);
  
  // Ažuriraj CSS širinu bara
  volumeBar.style.width = volumePercentage + "%";

  // Boja se mijenja u crvenu ako je preglasno (opcionalno)
  volumeBar.style.backgroundColor = volumePercentage > 80 ? "#e74c3c" : "#2ecc71";

  // Nastavi petlju vizualizacije
  animationId = requestAnimationFrame(updateVolumeMeter);
}

stopBtn.onclick = () => {
  mediaRecorder.stop();
  cancelAnimationFrame(animationId); // Zaustavi vizualizaciju
  volumeBar.style.width = "0%"; // Resetiraj bar
  startBtn.disabled = false;
  stopBtn.disabled = true;
};


downloadBtn.onclick = () => {
    // Generiranje predloženog imena
    const defaultFileName = `snimka_${getTimestamp()}.wav`;
    
    // Prompt za korisnika
    let userFileName = prompt("Unesite ime datoteke:", defaultFileName);

    // Ako korisnik klikne "Cancel", prekidamo proces
    if (userFileName === null) return;

    // Provjera ekstenzije (ako korisnik obriše .wav)
    if (!userFileName.toLowerCase().endsWith('.wav')) {
        userFileName += '.wav';
    }

    // Kreiranje linka za preuzimanje
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = audioUrl;
    a.download = userFileName;
    document.body.appendChild(a);
    a.click();
    
    // Čišćenje
    setTimeout(() => {
        document.body.removeChild(a);
    }, 100);
};

// Funkcija za formatiranje datuma u yyyyMMddHHmmss
function getTimestamp() {
    const now = new Date();
    const pad = (num) => num.toString().padStart(2, '0');
    
    return now.getFullYear() +
           pad(now.getMonth() + 1) +
           pad(now.getDate()) +
           pad(now.getHours()) +
           pad(now.getMinutes()) +
           pad(now.getSeconds());
}