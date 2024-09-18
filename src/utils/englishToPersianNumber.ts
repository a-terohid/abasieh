export const englishToPersianNumber = (englishNumber : string) => {
    const englishDigits = '0123456789';
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    return englishNumber.split('').map(char => {
        const index = englishDigits.indexOf(char);
        return index === -1 ? char : persianDigits[index];
    }).join(''); 
}