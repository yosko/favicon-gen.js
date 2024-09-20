// Import settings
import { availableFonts, defaultFileName, availableUnicodeRanges } from './config.js';

// Get HTML elements
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
const opacityRange = document.getElementById('opacityRange');
const shadowRange = document.getElementById('shadowRange');
const shadowColorInput = document.getElementById('shadowColor');
const bgCanvas = document.getElementById('bgCanvas');
const bgZoomedCanvas = document.getElementById('bgZoomedCanvas');


// Initialize font list
function initFonts() {
    availableFonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.text = font;
        fontSelect.appendChild(option);
    });
}

// Initialize Unicode range list
function initUnicodeRanges() {
    for (let i in availableUnicodeRanges) {
        const range = availableUnicodeRanges[i];
        const option = document.createElement('option');
        option.value = i;
        option.text = range.name;
        unicodeRangeSelect.appendChild(option);
    }
}

// Convert hexa value to Unicode character
function hexToUnicode(hex) {
    return String.fromCodePoint(parseInt(hex, 16));
}

// Fill Unicode characters list
function populateUnicodeSelect(startHex, endHex) {

    // First option is empty
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

// Detect Unicode range choice
function applySelectedUnicodeRange(event) {
    // Reset the characters list
    // unicodeSelect.options.length = 0;
    unicodeSelect.innerHTML = '';

    const i = event.target.value;
    if (i !== '') {
        const range = availableUnicodeRanges[i];
        populateUnicodeSelect(range.from, range.to);
    }
    
    unicodeSelect.dispatchEvent(new Event('change'));
}

// Draw the favicon
function drawFavicon() {
    const faviconCtx = faviconCanvas.getContext('2d');
    const zoomedCtx = zoomedCanvas.getContext('2d');

    // Clear canvas
    faviconCtx.clearRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Apply background color
    faviconCtx.globalAlpha = opacityRange.value / 100;
    faviconCtx.fillStyle = bgColorInput.value;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Appliquer une ombre radiale
    const shadowStrength = shadowRange.value / 100;
    const shadowColor = shadowColorInput.value;

    const radius = faviconCanvas.width / 2;
    const gradient = faviconCtx.createRadialGradient(radius, radius, 0, radius, radius, radius * 1.5);
    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(.5, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(1, `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowStrength})`);

    faviconCtx.fillStyle = gradient;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Configure text
    faviconCtx.globalAlpha = 1;
    const textColor = textColorInput.value;
    const text = unicodeSelect.value ? hexToUnicode(unicodeSelect.value) : textInput.value;
    const font = unicodeSelect.value ? 'sans-serif' : fontSelect.value;
    const fontSize = parseInt(fontSizeInput.value, 10);
    const offsetX = parseInt(offsetXInput.value, 10);
    const offsetY = parseInt(offsetYInput.value, 10);
    
    // Apply font style options
    let fontStyle = '';
    if (!unicodeSelect.value) {
        if (boldBox.checked) fontStyle += 'bold ';
        if (italicBox.checked) fontStyle += 'italic ';
    }

    faviconCtx.font = `${fontStyle} ${fontSize}px ${font}`;
    faviconCtx.fillStyle = textColor;
    faviconCtx.textAlign = 'center';
    faviconCtx.textBaseline = 'middle';

    // Draw the text
    const centerX = faviconCanvas.width / 2 + offsetX;
    const centerY = faviconCanvas.height / 2 + offsetY;
    faviconCtx.fillText(text, centerX, centerY);

    // Copy image onto the zoomed canvas
    zoomedCtx.clearRect(0, 0, zoomedCanvas.width, zoomedCanvas.height);
    zoomedCtx.imageSmoothingEnabled = false;
    zoomedCtx.drawImage(faviconCanvas, 0, 0, zoomedCanvas.width, zoomedCanvas.height);
}

function drawCheckerboard(canvas, size) {
    const ctx = canvas.getContext('2d');
    const squareSize = Math.max(size / 8, 4); // Ajuster le nombre de carrés

    // Redimensionner le canvas de fond à la taille du canvas de dessin
    canvas.width = size;
    canvas.height = size;

    // Dessiner le fond quadrillé
    for (let y = 0; y < canvas.height; y += squareSize) {
        for (let x = 0; x < canvas.width; x += squareSize) {
            ctx.fillStyle = ((x / squareSize + y / squareSize) % 2 == 0) ? '#ddd' : '#fff';
            ctx.fillRect(x, y, squareSize, squareSize);
        }
    }
}

// Initialize events
function setupEventListeners() {
    // Update drawings in real time
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
    opacityRange.addEventListener('input', drawFavicon);
    shadowRange.addEventListener('input', drawFavicon);
    shadowColorInput.addEventListener('input', drawFavicon);


    // Update list of Emojis
    unicodeRangeSelect.addEventListener('change', applySelectedUnicodeRange);

    // Download image
    downloadBtn.addEventListener('click', downloadFavicon);
}

// Download favicon in PNG format
function downloadFavicon() {
    const link = document.createElement('a');
    link.download = defaultFileName;
    link.href = faviconCanvas.toDataURL('image/png');
    link.click();
}

initFonts();
initUnicodeRanges();
setupEventListeners();
drawFavicon(); // Initial drawing
drawCheckerboard(bgCanvas, faviconCanvas.width);
drawCheckerboard(bgZoomedCanvas, zoomedCanvas.width);