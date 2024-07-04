import CryptoJS from "crypto-js";

const {SECRET_PASSWORD_ENCRYPT} = process.env;



export function encryptDataIv(data){
    const iv = CryptoJS.lib.WordArray.random(16); // Genera un IV aleatorio
    const dataEncrypted = CryptoJS.AES.encrypt(data, SECRET_PASSWORD_ENCRYPT, { iv }).toString();
    return dataEncrypted
}

export function descryptDataIv(hash){
    const bytes = CryptoJS.AES.decrypt(hash, SECRET_PASSWORD_ENCRYPT);
    const dataDescrypted = bytes.toString(CryptoJS.enc.Utf8);
    return dataDescrypted;
}