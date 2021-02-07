const fs = require('fs');

//Create a function to write README file
const writeToFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            // if there's an error, reject the promise and send the error to the promises catch method
            if (err) {
                reject(err);
                // return out of the function
                return;
            }

            // if everything went well, resolve the promise and send data to the then method
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

module.exports = writeToFile;