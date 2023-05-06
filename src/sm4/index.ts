/* eslint-disable */
import base64js from "base64-js";
import { Context, sm4_crypt_ecb, sm4_setkey_enc, sm4_setkey_dec } from "./sm4";
import { stringToByte, byteToString } from "./utils";
import Statuses from "../statuses/Statuses";

type SM4Type = {
  seckey: string;
  encryptData_ECB: (plainText: string) => string;
  decryptData_ECB: (plainText: string) => string;
  status: string;
};

function JSSM4(this: SM4Type, key) {
  // this.hexString = false;
  const encryptData_ECB = (plainText) => {
    var ctx = new Context();

    ctx.isPadding = true;
    ctx.mode = 1;
    var keyBytes;
    try {
      if (this.seckey == null) {
        throw "key";
      }
      keyBytes = stringToByte(this.seckey);
      Statuses.setStatus("Преобразуем ключ в байты", keyBytes.join(" "));
    } catch (e) {
      Error((e as Error).message);
    }
    // alert("key"+keyBytes.length)
    sm4_setkey_enc(ctx, keyBytes);
    var encrypted = sm4_crypt_ecb(ctx, stringToByte(plainText));
    Statuses.setStatus("Зашифрованное сообщение", encrypted.join(" "));
    var cipherText = base64js.fromByteArray(encrypted);
    Statuses.setStatus("Преобразуем набор байт в текст", cipherText);
    if (cipherText != null && cipherText.trim().length > 0) {
      cipherText.replace(/(\s*|\t|\r|\n)/g, "");
    }
    // alert(cipherText);
    return cipherText;
  };

  const decryptData_ECB = (cipherText) => {
    try {
      var ctx = new Context();
      ctx.isPadding = true;
      ctx.mode = 0;

      var keyBytes = stringToByte(this.seckey);
      Statuses.setStatus("Преобразуем ключ в байты", keyBytes.join(" "));
      sm4_setkey_dec(ctx, keyBytes);
      var decrypted = sm4_crypt_ecb(ctx, base64js.toByteArray(cipherText));
      Statuses.setStatus("Расшифрованное сообщение", decrypted.join(" "));
      const decryptedString = byteToString(decrypted);
      Statuses.setStatus("преобразуем байты в строку", decryptedString);
      return decryptedString;
    } catch (e) {
      Error((e as Error).message);
      return null;
    }
  };

  this.seckey = key;
  this.encryptData_ECB = encryptData_ECB;
  this.decryptData_ECB = decryptData_ECB;
}

export default JSSM4;
