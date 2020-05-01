const request = require('request')

const authCode = (callback) => {

    const url = 'https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials';
    
    const options = {
        url: url,
        headers: {
            'Authorization': 'Basic ekFlOExIN0FQd09vM2pPVDVPbjBoczc3U3FzMDBsVWs6TzdyV2tTUTNyZUZJb3hrNg==',
            'dataType': 'json'
        }
      };

    request(options, (error, response) => {
        if(error) {
            callback(error);
        } else {
           
           let resp =  JSON.parse(response.body)
        //    console.log(resp)
           callback(undefined, resp.access_token)
        }
    })


}

module.exports = authCode