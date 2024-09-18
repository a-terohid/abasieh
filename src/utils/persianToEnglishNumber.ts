export const persianToEnglishNumber = (persianNumber : string) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return persianNumber.split('').map(char => {
        const index = persianDigits.indexOf(char);
        return index === -1 ? char : englishDigits[index];
    }).join('');
}