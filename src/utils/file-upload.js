const multer = require('multer')
const fs = require('fs');
const path = require('path');

let upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let type, dest, pathExt;
            
            type = req.baseUrl.split('/')[3];
            if(type === 'categories'){
                pathExt = 'category'
            } else if(type === 'products'){
                pathExt = 'products'
            }  else if(req.baseUrl === '/api/user/auth'){
                pathExt = 'user'
            } else{
                pathExt = ''
            }
            
            if (type)
                dest = path.join(__dirname, '../', `/images/${pathExt}`);
            else
                dest = path.join(__dirname, '../', `/images`);
            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            callback(null, dest);
            // fs.mkdir(dest, function (err) {
            //     if (err) {
            //         return console.error(err);
            //     }
            //     callback(null, dest);
            // });
            // fs.mkdirsSync(path);
        },
        filename: (req, file, callback) => {
            //originalname is the uploaded file's name with extn
            callback(null, new Date().getTime() + file.originalname);
        }
    })
});

module.exports = upload;