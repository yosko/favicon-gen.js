// Import settings
import { availableFonts, defaultFileName, availableUnicodeRanges } from './config.js';

// Get HTML elements
const form = document.getElementById('favForm');
const unicodeRadioButtons = document.getElementById('unicodeRadioButtons');
const bgCanvas = document.getElementById('bgCanvas');
const bgZoomedCanvas = document.getElementById('bgZoomedCanvas');
const faviconCanvas = document.getElementById('faviconCanvas');
const zoomedCanvas = document.getElementById('zoomedCanvas');


// Initialize font list
function initFonts() {
    availableFonts.forEach(font => {
        const option = document.createElement('option');
        option.value = font;
        option.text = font;
        form.elements['fontSelect'].appendChild(option);
    });
}

// Initialize checkerbord background to better visualize transparency
function initCheckerboard(canvas, size) {
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

// Initialize Unicode range list
function initUnicodeRanges() {
    for (let i in availableUnicodeRanges) {
        const range = availableUnicodeRanges[i];
        const option = document.createElement('option');
        option.value = i;
        option.text = range.name;
        form.elements['unicodeRangeSelect'].appendChild(option);
    }
}

function addRadioButton(container, character, text = '') {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'unicodeRadio';
    radio.value = character;

    const label = document.createElement('label');
    label.textContent = character;
    if (text)
        label.title = text;

    label.appendChild(radio);

    container.appendChild(label);
}

// Fill Unicode characters list
function populateUnicodeRadios(range) {
    if (range.hasOwnProperty('list')) {
        for (let item of range.list) {
            const character = item.codes.map(code => String.fromCodePoint(code)).join('');
            addRadioButton(unicodeRadioButtons, character, item.text);
        }
    } else {
        for (let value = range.from; value <= range.to; value++) {
            const character = String.fromCodePoint(value);
            addRadioButton(unicodeRadioButtons, character, value);
        }
    }
}

// Detect Unicode range choice
function applySelectedUnicodeRange(event) {
    // Reset the characters list
    unicodeRadioButtons.innerHTML = '';

    const i = event.target.value;
    if (i !== '') {
        const range = availableUnicodeRanges[i];
        populateUnicodeRadios(range);
    }
}

// Draw the favicon
function drawFavicon() {
    const faviconCtx = faviconCanvas.getContext('2d');

    // Clear canvas
    faviconCtx.clearRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Apply background color
    faviconCtx.globalAlpha = form.elements['opacityRange'].value / 100;
    faviconCtx.fillStyle = form.elements['bgColor'].value;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Appliquer une ombre radiale
    const shadowStrength = form.elements['shadowRange'].value / 100;
    const shadowColor = form.elements['shadowColor'].value;

    const radius = faviconCanvas.width / 2;
    const gradient = faviconCtx.createRadialGradient(radius, radius, 0, radius, radius, radius * 1.5);
    gradient.addColorStop(0, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(.5, `rgba(0, 0, 0, 0)`);
    gradient.addColorStop(1, `rgba(${parseInt(shadowColor.slice(1, 3), 16)}, ${parseInt(shadowColor.slice(3, 5), 16)}, ${parseInt(shadowColor.slice(5, 7), 16)}, ${shadowStrength})`);

    faviconCtx.fillStyle = gradient;
    faviconCtx.fillRect(0, 0, faviconCanvas.width, faviconCanvas.height);

    // Configure text
    faviconCtx.globalAlpha = 1;
    const textColor = form.elements['textColor'].value;
    const unicodeChar = form.elements['unicodeRadio'] ? form.elements['unicodeRadio'].value : null;
    const text = unicodeChar ?? form.elements['textInput'].value;
    const font = unicodeChar ? 'sans-serif' : form.elements['fontSelect'].value;
    const fontSize = parseInt(form.elements['fontSize'].value, 10);
    const offsetX = parseInt(form.elements['offsetX'].value, 10);
    const offsetY = parseInt(form.elements['offsetY'].value, 10);
    
    // Apply font style options
    let fontStyle = '';
    if (!unicodeChar) {
        if (form.elements['boldBox'].checked) fontStyle += 'bold ';
        if (form.elements['italicBox'].checked) fontStyle += 'italic ';
    }

    faviconCtx.font = `${fontStyle} ${fontSize}px ${font}`;
    faviconCtx.fillStyle = textColor;
    faviconCtx.textAlign = 'center';
    faviconCtx.textBaseline = 'middle';

    // Draw the text
    const centerX = faviconCanvas.width / 2 + offsetX;
    const centerY = faviconCanvas.height / 2 + offsetY;
    faviconCtx.fillText(text, centerX, centerY);
}

function drawZoomedFavicon() {
    // Copy image onto the zoomed canvas
    const zoomedCtx = zoomedCanvas.getContext('2d');
    zoomedCtx.clearRect(0, 0, zoomedCanvas.width, zoomedCanvas.height);
    zoomedCtx.imageSmoothingEnabled = false;
    zoomedCtx.drawImage(faviconCanvas, 0, 0, zoomedCanvas.width, zoomedCanvas.height);
}

function updatePageFavicon() {
    let faviconLink = document.querySelector('link[rel="icon"]');
    faviconLink.href = faviconCanvas.toDataURL('image/png');
}

function refresh() {
    drawFavicon();
    drawZoomedFavicon();
    updatePageFavicon();
}

// Initialize events
function setupEventListeners() {
    // Update drawings in real time
    form.addEventListener('change', refresh);

    form.elements['textInput'].addEventListener('input', refresh);
    form.elements['opacityRange'].addEventListener('input', refresh);
    form.elements['shadowRange'].addEventListener('input', refresh);

    // Update list of Emojis
    form.elements['unicodeRangeSelect'].addEventListener('change', applySelectedUnicodeRange);

    // Download image
    document.getElementById('downloadBtn').addEventListener('click', downloadFavicon);
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
initCheckerboard(bgCanvas, faviconCanvas.width);
initCheckerboard(bgZoomedCanvas, zoomedCanvas.width);
setupEventListeners();
refresh(); // Initial drawing