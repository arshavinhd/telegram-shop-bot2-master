const request = require('request');
const cheerio = require('cheerio');

function getAllProducts(url ,done){
    let products= [];
    request(url, (err, resp, body) => {
        let $ = cheerio.load(body);
        let elements= $('.product-item');
        for(let i=0; i<elements.length; i++){
            let productObj= {};
            productObj.photo = 'https://mafia.ua' + elements.eq(i).find('.product-img img').attr('src');
            productObj.name = elements.eq(i).find('.product-title a').text().trim();
            productObj.weigth = elements.eq(i).find('.product-weight').text().trim();
            productObj.description = elements.eq(i).find('.product-description').text().trim().slice(0, 150)+'...';
            productObj.price = elements.eq(i).find('.price-gift .price').text().trim();
            products.push(productObj);
        }
        done(products);
    });
}

module.exports= {
    getAllProducts
}