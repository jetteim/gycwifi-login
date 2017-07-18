module.exports = (httpRequest) => {
  return {
    index: (request, response, next) => {
      var test = {
        "style": {
          "title": "Бесплатный WiFI",
          "background": "https://api.gycwifi.com/images/location_background/ce30395e-3071-487e-abbe-4282c1b9678a.png",
          "promo_text": "Спасибо за то, что выбрали наш сервис!",
          "social_networks": {
            "twitter": false,
            "google": true,
            "vk": true,
            "instagram": true,
            "facebook": true,
            "password": true,
            "without": true
          },
          "logo": "https://api.gycwifi.com/images/location_logo/ea5ed321-96c0-40cf-a261-823d5bae6d30.png"
        },
        "router": {
          "url": "http://gycwifi.com/",
          "username": "d30ce391a63781a1",
          "password": "223f577cde3c9e41"
        },
        "css": {},
        "targeting_info": {
          "lat": 55.7756053,
          "lng": 37.7331449,
          "city": "Moskva",
          "country": "Russia",
          "zip": "105118"
        },
        "submitURL": "http://enter.gycwifi.com/login",
        "next_step": "providers"
      };

      var options = {
        //uri: config.get('apiUrl') + '/receive_data_from_router',
        uri: 'https://api2.gycwifi.com' + '/receive_data_from_router',
        method: 'POST',
        json: test
      };

      httpRequest(options, function(error, res, body) {
        if (!error && res.statusCode == 200) {
          response.cookie('params', JSON.stringify(body), {
            maxAge: 900000
          });
          response.render('index');
        } else {
          // response.send('api gycwifi error');
        }
      });
    }
  };
};
