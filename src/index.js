const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');

const app = express();
const api = require('./api/routes');
const test = require('./test');
const env = require('./configs/environment');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    if(env){
        req.env=env;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});
app.use('/image', express.static(path.join(__dirname, 'images')));
// express.static('images'))
// app.use('/images',(req,res,next)=>{
//     console.log('okk')
//     next();
// })
app.use('/static', express.static('public/static'))
app.use('/api', api);
//test
if (env === 'dev') {
    app.use('/test', test);
}
//test
app.all('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
    res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
})
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
