// Fichier config.js

// Liste des polices disponibles
export const availableFonts = [
    'Arial',
    'Courier New',
    'DejaVu Sans',
    'Times New Roman',
    'Verdana',
    'Georgia',
    'Trebuchet MS',
    'Comic Sans MS' // Ajout d'exemples de polices web classiques
];

// Nom de fichier par défaut pour le téléchargement
export const defaultFileName = 'favicon.png';

// Caractères Unicode proposés (à la place du texte)
export const availableUnicodeRanges = [
    {name: 'Emojis & Emotions', from: '1F600', to: '1F64F'},
    {name: 'People & Body', from: '1F466', to: '1F487'},
    {name: 'Animals & Nature', from: '1F400', to: '1F4D3'},
    {name: 'Food & Drink', from: '1F34F', to: '1F37F'},
    {name: 'Activities', from: '1F3A0', to: '1F3FF'},
    {name: 'Travel & Places', from: '1F680', to: '1F6FF'},
    {name: 'Objects', from: '1F4A0', to: '1F4FF'},
    {name: 'Symbols', from: '1F500', to: '1F5FF'},
    {name: 'Flags', from: '1F1E6', to: '1F1FF'},
    {name: 'Supplemental Symbols', from: '1F900', to: '1F9FF'},
    {name: 'Extended Emoticons', from: '1F9B0', to: '1F9C0'},
    
    {name: 'Miscellaneous Symbols', from: '2600', to: '26FF'},
    {name: 'Dingbats', from: '2700', to: '27BF'},

    // {name: 'Transport & Places Emojis', from: '1F680', to: '1F6FF'},
    // {name: 'Games Symbols', from: '1F000', to: '1F02F'},
];
