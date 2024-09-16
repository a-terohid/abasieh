export const  persianToFinglish = (persianStr: string): string => {
    const conversionTable: { [key: string]: string } = {
        'ا': 'a',
        'آ': 'aa',  // اضافه کردن "آ"
        'ب': 'b',
        'پ': 'p',
        'ت': 't',
        'ث': 's',
        'ج': 'j',
        'چ': 'ch',
        'ح': 'h',
        'خ': 'kh',
        'د': 'd',
        'ذ': 'z',
        'ر': 'r',
        'ز': 'z',
        'ژ': 'zh',
        'س': 's',
        'ش': 'sh',
        'ص': 's',
        'ض': 'z',
        'ط': 't',
        'ظ': 'z',
        'ع': 'a',
        'غ': 'gh',
        'ف': 'f',
        'ق': 'gh',
        'ک': 'k',
        'گ': 'g',
        'ل': 'l',
        'م': 'm',
        'ن': 'n',
        'و': 'v',
        'ه': 'h',
        'ی': 'y',
        'ء': 'a',
        ' ': ' ', // فضای خالی
        '،': ',',  // کاما
        '.': '.',  // نقطه
        '؟': '?'   // علامت سوال
    };

    return persianStr.split('').map(char => conversionTable[char] || char).join('');
}

