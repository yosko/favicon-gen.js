// List of available fonts
export const availableFonts = [
    'Arial',
    'Courier New',
    'DejaVu Sans',
    'Times New Roman',
    'Verdana',
    'Georgia',
    'Trebuchet MS',
    'Comic Sans MS'
];

// Default file name when downloading
export const defaultFileName = 'favicon.png';

// Suggested Unicode characters (replaces the text)
export const availableUnicodeRanges = [
    {name: 'Emojis & Emotions', from: 0x1F600, to: 0x1F64F},
    {name: 'People & Body', from: 0x1F466, to: 0x1F487},
    {name: 'Animals & Nature', from: 0x1F400, to: 0x1F4D3},
    {name: 'Food & Drink', from: 0x1F34F, to: 0x1F37F},
    {name: 'Activities', from: 0x1F3A0, to: 0x1F3FF},
    {name: 'Travel & Places', from: 0x1F680, to: 0x1F6FF},
    {name: 'Objects', from: 0x1F4A0, to: 0x1F4FF},
    {name: 'Symbols', from: 0x1F500, to: 0x1F5FF},
    {name: 'Letters', from: 0x1F1E6, to: 0x1F1FF},
    {name: 'Flags', list: [
        { text: 'Argentina', codes: [0x1F1E6, 0x1F1F7] }, // 🇦🇷
        { text: 'Australia', codes: [0x1F1E6, 0x1F1FA] }, // 🇦🇺
        { text: 'Brazil', codes: [0x1F1E7, 0x1F1F7] }, // 🇧🇷
        { text: 'Canada', codes: [0x1F1E8, 0x1F1E6] }, // 🇨🇦
        { text: 'China', codes: [0x1F1E8, 0x1F1F3] }, // 🇨🇳
        { text: 'France', codes: [0x1F1EB, 0x1F1F7] }, // 🇫🇷
        { text: 'Germany', codes: [0x1F1E9, 0x1F1EA] }, // 🇩🇪
        { text: 'India', codes: [0x1F1EE, 0x1F1F3] }, // 🇮🇳
        { text: 'Italy', codes: [0x1F1EE, 0x1F1F9] }, // 🇮🇹
        { text: 'Japan', codes: [0x1F1EF, 0x1F1F5] }, // 🇯🇵
        { text: 'Mexico', codes: [0x1F1F2, 0x1F1E6] }, // 🇲🇽
        { text: 'Russia', codes: [0x1F1F7, 0x1F1FA] }, // 🇷🇺
        { text: 'South Africa', codes: [0x1F1FF, 0x1F1E6] }, // 🇿🇦
        { text: 'Spain', codes: [0x1F1E8, 0x1F1F1] }, // 🇪🇸
        { text: 'United Kingdom', codes: [0x1F1EC, 0x1F1E7] }, // 🇬🇧
        { text: 'United States', codes: [0x1F1FA, 0x1F1F8] }, // 🇺🇸
        // Add other country flags here if need be
    ]},
    {name: 'Supplemental Symbols', from: 0x1F900, to: 0x1F9FF},
    {name: 'Extended Emoticons', from: 0x1F9B0, to: 0x1F9C0},
    {name: 'Miscellaneous Symbols', from: 0x2600, to: 0x26FF},
    {name: 'Dingbats', from: 0x2700, to: 0x27BF},
];
