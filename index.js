const express = require('express')
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    const jsonData = fs.readFileSync('./MyPkmData.json')
    res.send( JSON.parse(jsonData) )
})
app.get('/coin', function (req, res) {
    const jsonData = fs.readFileSync('./coinStorage.json')
    res.send( JSON.parse(jsonData) )
})


app.post('/addPokemon',function(req,res){
    //포켓몬 데이터는 누적되어야함
    const jsonData 
        = JSON.parse(fs.readFileSync( './MyPkmData.json' ));
    
    let newPokemonData = req.body;
    jsonData.push(newPokemonData);
    
    fs.writeFileSync('./MyPkmData.json', JSON.stringify(jsonData));
    
    res.send(jsonData);
})
app.post('/addCoin',function(req,res){
    const jsonData 
    = JSON.parse(fs.readFileSync( './coinStorage.json' ));

    let oldCoinAmount = parseInt(jsonData.coinAmount);
    let updateCoin = parseInt(req.body.coinAmount);

    let newCoinAmount = oldCoinAmount + updateCoin;

    jsonData.coinAmount = newCoinAmount;

    fs.writeFileSync('./coinStorage.json', JSON.stringify(jsonData));
    res.send(jsonData);
})
app.post('/useCoin',function(req,res){
    const jsonData 
    = JSON.parse(fs.readFileSync( './coinStorage.json' ));

    let oldCoinAmount = parseInt(jsonData.coinAmount);
    let updateCoin = parseInt(req.body.coinAmount);

    let newCoinAmount = oldCoinAmount - updateCoin;

    jsonData.coinAmount = newCoinAmount;

    fs.writeFileSync('./coinStorage.json', JSON.stringify(jsonData));
    res.send(jsonData);
})

app.listen(3000)
