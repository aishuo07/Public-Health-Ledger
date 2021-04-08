// import { ec as EC } from 'elliptic';
import pkg from 'elliptic';
const { ec: EC } = pkg;
const ec = new EC('secp256k1');

const key =  ec.genKeyPair();
const privateKey =key.getPrivate('hex');
const publicKey = key.getPublic('hex');

console.log("public Key:"+ publicKey + "\n Private Key: "+ privateKey);