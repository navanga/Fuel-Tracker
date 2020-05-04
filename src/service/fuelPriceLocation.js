const request = require('request')

const fuelPrices = (access_token, postCode, callback) => {

    const url = 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/location';

    var options = {
        'method': 'POST',
        'url': 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v1/fuel/prices/location',
        'headers': {
            'Authorization': 'Bearer ' + access_token,
            'apikey': 'zAe8LH7APwOo3jOT5On0hs77Sqs00lUk',
            'requesttimestamp': '30/04/2020 11:55:00 PM',
            'Content-Type': 'application/json; charset=utf-8',
            'transactionid': '1'
        },
        body: JSON.stringify({ "fueltype": "E10", "namedlocation": postCode, "sortby": "price", "sortascending": "true" })

    };

//"brand": ["Caltex", "Shell", "BP", "Coles Express"],s

    request(options, function (error, response) {
        if (error) {
            callback(error);
        } else {
            // console.log(response.body);
            const data = JSON.parse(response.body)
            debugger
            var stationArray = [];
            for(i=0; i<data.stations.length; i++) {
                stationArray.push(data.stations[i])
            } 
            var priceArray = [];
            for(i=0; i<data.prices.length; i++) {
                priceArray.push(data.prices[i])
            } 

            callback(undefined, {

                

                stations: stationArray,
                prices: priceArray
            })

        }

    });


}

module.exports = fuelPrices