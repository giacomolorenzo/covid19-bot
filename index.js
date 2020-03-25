const TelegramBot = require('node-telegram-bot-api');
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request');
var app = express()
 //place the value below with the Telegram token you receive from @BotFather
const token = '1135678876:<your-key>'; //don't worry the key is not valid
const bot = new TelegramBot(token, {
    polling: true
  });
bot.onText(/\/regione (.+)/, (msg, match) => {
    console.log("sono dentro regione")
    getFiles("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json").then(result=>{
        result.forEach(element => {
       if(element.denominazione_regione.toLowerCase().indexOf(match[1].toLowerCase()) !== -1){
        var string = "data: <b>"+element.data +"</b> \n"
        + "Regione: <b>"+element.denominazione_regione+"</b> \n"
        + "Ricoverati con sintomi: <b>"+element.ricoverati_con_sintomi+"</b> \n"
        + "Terapia intesiva: <b>"+element.terapia_intensiva+"</b> \n"
        + "Isolamento domiciliare: <b>"+element.isolamento_domiciliare+"</b> \n"
        + "Totale attualmente positivi: <b>"+element.totale_attualmente_positivi+"</b> \n"
        + "Nuovi attualmente positivi: <b>"+element.nuovi_attualmente_positivi+"</b> \n"
        + "Dimessi guariti: <b>"+element.dimessi_guariti+"</b> \n"
        + "Deceduti: <b>"+element.deceduti+"</b> \n"
        + "Totale casi: <b>"+element.totale_casi+"</b> \n"
        + "Tamponi: <b>"+element.tamponi+"</b> \n"
        var option = {
            "parse_mode": "HTML",
        };
        bot.sendMessage(msg.chat.id,string,option )

       }
   });
}).catch(e =>{console.log(e)});

});

bot.onText(/\/italia/, (msg, match) => {
    console.log("sono dentro regione")
    getFiles("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json").then(result=>{
        result.forEach(element => {
       
        var string = "data: <b>"+element.data +"</b> \n"
        + "Ricoverati con sintomi: <b>"+element.ricoverati_con_sintomi+"</b> \n"
        + "Terapia intesiva: <b>"+element.terapia_intensiva+"</b> \n"
        + "Totale ospedalizzati: <b>"+element.totale_ospedalizzati+"</b> \n"
        + "Isolamento domiciliare: <b>"+element.isolamento_domiciliare+"</b> \n"
        + "Totale attualmente positivi: <b>"+element.totale_attualmente_positivi+"</b> \n"
        + "Nuovi attualmente positivi: <b>"+element.nuovi_attualmente_positivi+"</b> \n"
        + "Dimessi guariti: <b>"+element.dimessi_guariti+"</b> \n"
        + "Deceduti: <b>"+element.deceduti+"</b> \n"
        + "Totale casi: <b>"+element.totale_casi+"</b> \n"
        + "Tamponi: <b>"+element.tamponi+"</b> \n"
        var option = {
            "parse_mode": "HTML",
        };
        bot.sendMessage(msg.chat.id,string,option )

       
   });
}).catch(e =>{console.log(e)});

});

bot.onText(/\/provincia (.+)/, (msg, match) => {
    console.log("sono dentro regione")
    getFiles("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province-latest.json").then(result=>{
        result.forEach(element => {
       if(element.denominazione_provincia.toLowerCase().indexOf(match[1].toLowerCase()) !== -1){
        var string = "data: "+element.data +"\n"
        + "totale_casi: "+ element.totale_casi
        bot.sendMessage(msg.chat.id,string )

       }
   });
}).catch(e =>{console.log(e)});
    
});
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {

    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    const request = require("request");
    
       
  
  });
async function getFiles(url){
   return new Promise(function (resolve, reject) {
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           var importedJSON = JSON.parse(body);
           console.log(importedJSON);
           resolve(importedJSON);
        }
      });
   }); 
}
app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
  });
  