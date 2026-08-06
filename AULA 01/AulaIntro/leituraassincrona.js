const fs = require('fs');


fs.readFile('./nomes.txt', (err, contents) => {
    console.log(err, String(contents))
})

const readFile = file => new Promise ((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
        if (err){
            reject(err)
        }
        else
            resolve(String(contents))
    })
})

readFile('./nomes.txt').then(contents => {
    console.log(String(contents))
})

const leitura = async () => {
    const contents = await readFile('./nomes.txt');
    console.log(String(contents));
}

leitura();