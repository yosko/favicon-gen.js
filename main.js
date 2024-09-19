// Importation des paramètres
import { availableFonts, defaultFileName, availableUnicodeRanges } from './config.js';

// Obtenir les éléments HTML
const bgColorInput = document.getElementById('bgColor');
const textColorInput = document.getElementById('textColor');
const textInput = document.getElementById('textInput');
const fontSizeInput = document.getElementById('fontSize');
const fontSelect = document.getElementById('fontSelect');
const offsetXInput = document.getElementById('offsetX');
const offsetYInput = document.getElementById('offsetY');
const faviconCanvas = document.getElementById('faviconCanvas');
const zoomedCanvas = document.getElementById('zoomedCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const unicodeRangeSelect = document.getElementById('unicodeRangeSelect');
const unicodeSelect = document.getElementById('unicodeSelect');
const boldBox = document.getElementById('boldBox');
const italicBox = document.getElementById('italicBox');

// Initialisation de la liste des polices
function initFonts() {
    availableFonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.text = font;
        fontSelect.appendChild(option);
    });
}

// Initialisation de la liste des plages de caractères Unicode
function initUnicodeRanges() {
    for (let i in availableUnicodeRanges) {
        const range = availableUnicodeRanges[i];
        const option = document.createElement('option');
        option.value = i;
        option.text = range.name;
        unicodeRangeSelect.appendChild(option);
    }
}

// Conversion d'une valeur hexadécimale en caractère Unicode
function hexToUnicode(hex) {
    return String.fromCodePoint(parseInt(hex, 16));
}

// Remplir la liste de caractères Unicode
function populateUnicodeSelect(startHex, endHex) {

    // première option vide
    const emptyOption = document.createElement('option');
    unicodeSelect.appendChild(emptyOption);

    for (let hex = parseInt(startHex, 16); hex <= parseInt(endHex, 16); hex++) {
        const hexaCode = hex.toString(16).toUpperCase().padStart(4, '0');
        const character = hexToUnicode(hexaCode);
        const option = document.createElement('option');
        option.value = hexaCode;
        option.text = character;
        unicodeSelect.appendChild(option);
    }
}

// Détection du choix d'une plage de caractères Unicode
function applySelectedUnicodeRange(event) {
    // réinitialiser la liste
    // unicodeSelect.options.length = 0;
    unicodeSelect.innerHTML = '';

    const i = event.target.value;
    if (i !== '') {
        const range = availableUnicodeRanges[i];
        populateUnicodeSelect(range.from, range.to);
    }
    
    unicodeSelect.dispatchEvent(new Event('change'));
}

// Dessiner le favicon
function drawFavicon() {
    const faviconCtx = faviconCanvas.getContext('2d');
    const zoomedCtx = zoomedCanvas.getContext('2d');

    // Effacer les canvas
    faviconCtx.clearRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Appliquer la couleur de fond
    faviconCtx.fillStyle = bgColorInput.value;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Configurer le texte
    const textColor = textColorInput.value;
    const text = unicodeSelect.value ? hexToUnicode(unicodeSelect.value) : textInput.value;
    const font = unicodeSelect.value ? 'sans-serif' : fontSelect.value;
    const fontSize = parseInt(fontSizeInput.value, 10);
    const offsetX = parseInt(offsetXInput.value, 10);
    const offsetY = parseInt(offsetYInput.value, 10);
    
    // Appliquer les options de style de police
    let fontStyle = '';
    if (!unicodeSelect.value) {
        if (boldBox.checked) fontStyle += 'bold ';
        if (italicBox.checked) fontStyle += 'italic ';
    }

    faviconCtx.font = `${fontStyle} ${fontSize}px ${font}`;
    faviconCtx.fillStyle = textColor;
    faviconCtx.textAlign = 'center';
    faviconCtx.textBaseline = 'middle';

    // Dessiner le texte
    const centerX = faviconCanvas.width / 2 + offsetX;
    const centerY = faviconCanvas.height / 2 + offsetY;
    faviconCtx.fillText(text, centerX, centerY);

    // Copier l'image sur le canvas zoomé
    zoomedCtx.imageSmoothingEnabled = false;
    zoomedCtx.drawImage(faviconCanvas, 0, 0, zoomedCanvas.width, zoomedCanvas.height);
}

// Initialisation des évènements
function setupEventListeners() {
    // Mettre à jour le dessin en temps réel
    bgColorInput.addEventListener('input', drawFavicon);
    textColorInput.addEventListener('input', drawFavicon);
    textInput.addEventListener('input', drawFavicon);
    fontSizeInput.addEventListener('input', drawFavicon);
    fontSelect.addEventListener('change', drawFavicon);
    offsetXInput.addEventListener('input', drawFavicon);
    offsetYInput.addEventListener('input', drawFavicon);
    unicodeSelect.addEventListener('change', drawFavicon);
    boldBox.addEventListener('change', drawFavicon);
    italicBox.addEventListener('change', drawFavicon);

    // Mettre à jour la liste des Emojis
    unicodeRangeSelect.addEventListener('change', applySelectedUnicodeRange);

    // Télécharger l'image
    downloadBtn.addEventListener('click', downloadFavicon);
}

// Fonction pour télécharger le favicon en PNG
function downloadFavicon() {
    const link = document.createElement('a');
    link.download = defaultFileName;
    link.href = faviconCanvas.toDataURL('image/png');
    link.click();
}

initFonts();
initUnicodeRanges();
setupEventListeners();
drawFavicon(); // Dessin initial
