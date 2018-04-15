const pemtools=require('pemtools');
const fs=require('fs');

const buf=fs.readFileSync(__dirname+'/key.pem',{encoding:'utf8'});
const pem=pemtools(buf);


module.exports=pem.buf.toString('base64');