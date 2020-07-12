import crypto from "crypto-js";
import config from "../config/config";

export const decryptData = (data) => {
  let temp = crypto.AES.decrypt(data, config.responseKey).toString(
    crypto.enc.Utf8
  );
  return JSON.parse(temp);
};

export const encryptData = (data) => {
    return crypto.AES.encrypt(JSON.stringify(data), config.cipherKey).toString();
  };