export const mask = ( value : string , pattern : string ) => {
    let count = 0;
    return pattern.replace( /\*/g , () => value[ count++ ] || '' )
}
