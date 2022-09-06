var axios = require('axios');

var config = {
  method: 'post',
  url: 'https://knzjekzfi2.execute-api.us-west-1.amazonaws.com/default/DiscordSmashBot',
  headers: { 
    'Content-Type': 'application/json', 
    'x-signature-ed25519': '250a1ecc2f25b48f7c7f2d05d8e08ab53dee819a16585740444c16218aadbe81fa849f2fb611e7171da61c7b39f16f37651de96321cac990666943b3bb32f706', 
    'x-signature-timestamp': ''
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});