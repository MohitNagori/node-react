export const genCharArray = (charA: string, charZ: string) =>  {
    var alphabets = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        alphabets.push(String.fromCharCode(i));
    }
    return alphabets;
}