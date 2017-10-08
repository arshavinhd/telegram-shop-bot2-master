const TeleBot = require('telebot');
const {getActualMonths, getAllDaysForMonth} = require('./date.js');
const {getAllProducts} = require('./getData.js');
const TOKEN= '432228449:AAGJVVjO614XYCysGkajiRjNtqgsjXPqSKM';
const reservingMonths= getActualMonths();
console.log(reservingMonths);
const bot = new TeleBot({
   token: TOKEN,
   polling: {  
   },
   usePlugins: ['askUser']
});
console.log(bot);

bot.on([/\/start/i, /hello/i, /Головне меню/i], msg => {
    console.log(msg);
    let replyMarkup = bot.keyboard([
        ["Меню"],
        ["Доставка"],
        ["Резерв столика"]
    ], {resize: false, once: true});
    return bot.sendMessage(msg.from.id, 'Виберіть необхідний Вам пункт меню', {replyMarkup});
});

bot.on([/Меню/i, /Menu/i], msg => {
    console.log('Menu');
    let replyMarkup = bot.keyboard([
        ["Піца", "Суші"],
        ["Салати", "Супи"],
        ["Гарячі страви", "Десерти"],
        ["Напої","Головне меню"]
    ], {resize: false});
    return bot.sendMessage(msg.from.id, 'Виберіть необхідний Вам пункт меню', {replyMarkup});
});

bot.on([/Піца/i, /Суші/i, /Салати/i, /Супи/i, /Гарячі страви/i, /Десерти/i, /Напої/i], msg => {
    let url;
    switch(msg.text){
        case 'Піца':
            url = 'https://mafia.ua/kiev/menu-dostavki/pizza';
        break;
        case 'Суші':
            url = 'https://mafia.ua/kiev/menu-dostavki/sushi';
        break;
        case 'Салати':
            url = 'https://mafia.ua/kiev/menu-dostavki/salaty';
        break;
        case 'Супи':
            url = 'https://mafia.ua/kiev/menu-dostavki/supy';
        break;
        case 'Гарячі блюда':
            url = 'https://mafia.ua/kiev/menu-dostavki/goryachie-blyuda';
        break;
        case 'Десерти':
            url = 'https://mafia.ua/kiev/menu-dostavki/deserty';
        break;
        case 'Напої':
            url = 'https://mafia.ua/kiev/menu-dostavki/napitki';
        break;
    }
    getAllProducts(url, pizzas => {
        for(let i=0; i< pizzas.length; i++){
            bot.sendPhoto(msg.from.id, pizzas[i].photo, {caption: `${pizzas[i].name} \n ${pizzas[i].description} \n ${pizzas[i].weigth} \n ${pizzas[i].price}`, notification: false});
        }
        bot.sendMessage(msg.from.id, 'Введіть назву необхідного продукту');
    });
});

bot.on(/Резерв столика/i, msg => {
    let replyMarkup = bot.keyboard([...reservingMonths], {resize: false, once: true});
    return bot.sendMessage(msg.from.id, 'Виберіть місяць резерву столика');
});

bot.start();