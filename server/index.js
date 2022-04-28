const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const port = 7000
const fs = require("fs");
app.use(bodyParser.urlencoded());
// have to set big limit to transfer image
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.post('/saveimage', (req, res) => { 
    const dataJ = require('./data.json');
    let name = req.body.name;
    let image = req.body.image;
    let categories = req.body.categories
    let longitude = req.body.longitude;
    let latitude = req.body.latitude;
    let private = req.body.privateBool;

    image = image.split(';base64,').pop();
    fs.writeFile(__dirname + '/images/' + `${name}.png`, image, { flag: 'a+', encoding: 'base64' }, (err) => {
        console.log('file created');
    })
    let data = {
        name: name,
        categories: categories,
        latitude: latitude,
        longitude: longitude,
        isFavorit: false,
        isPrivet: private
    }
    dataJ.push(data);
    fs.writeFile(__dirname + `/data.json`, JSON.stringify(dataJ), (err) => {
        console.log('data added');
    })
    res.send(req.body)
})

app.get('/getimages', (req, res) => {
    const dataJ = require('./data.json');
    let folderPath = __dirname + '/images';
    // let dataPath = __dirname + '/imagesData.txt';
    let images = [];

    var folder = fs.readdirSync(folderPath)
    dataJ.forEach(d => {
        folder.forEach(f => {
            if (f === d.name + '.png') {
                let image = {
                    name: f.replace('.png', ''),
                    base64: fs.readFileSync(folderPath + '/' + f, { encoding: 'base64' }),
                    categories: d.categories,
                    latitude: d.latitude,
                    longitude: d.longitude,
                    isFavorit: d.isFavorit,
                    isPrivet: d.isPrivet
                };
                images.push(image);
            } 
        })
    })
    //return images;
    res.send(images);
})

app.post('/setimagetofavorit', (req, res) => {
    const dataJ = require('./data.json');
    let name = req.body.name;
    const newData = [];

    dataJ.forEach(d => {
        if(name === d.name){
            d.isFavorit = true;
            newData.push(d);
        }
        else {
            newData.push(d);
        }
    })
    fs.writeFile(__dirname + `/data.json`, JSON.stringify(newData), (err) => {
        console.log('data updated');
    })
    res.send(req.body)
})

app.post('/setimagetounfavorite', (req, res) => {
    const dataJ = require('./data.json');
    let name = req.body.name;
    const newData = [];

    dataJ.forEach(d => {
        if(name === d.name){
            d.isFavorit = false;
            newData.push(d);
        }
        else {
            newData.push(d);
        }
    })
    fs.writeFile(__dirname + `/data.json`, JSON.stringify(newData), (err) => {
        console.log('data updated');
    })
    res.send(req.body)
})


app.listen(port, () => {
    console.log(`app is run on ->  http://localhost:${port}`);
})