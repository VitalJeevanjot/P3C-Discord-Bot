const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios')
const Config = require('./config.json');

client.login(Config.token);
client.on('guildMemberAdd', member => {
   member.send({embed: {
     color: 0x49b86e,
     title: "Welcome to the server!",
     description: "Here are some of the important links to start using P3C, Send `help` to know more commands",
     fields: [{
       name: "P3C.io",
       value: "https://p3c.io/"
     },
     {
       name: "P3C.trade",
       value: "http://p3c.trade/"
     },
     {
       name: "Livestreaming P3C (P3C.tv)",
       value: "https://p3c.tv/"
     },
     {
       name: "Use P3C in Mobile",
       value: "https://forum.saturn.network/t/tutorial-how-to-recieve-a-p3c-io-airdrop-on-your-phone-5-minute-tutorial/4144"
     }]
   }
   }).catch(err => {
     console.log(err);
   });
});

client.on('message', (message) => {
  if(message.author.bot)
  return;
  if(message.channel.name === 'p3cbot') {
    let args = message.content.split(/[\s!]+/)
    if(args[0] === 'info') {
      axios.get('https://api.p3c.io/chart/info').then(res => {
        if(res.data) {
        message.channel.send({embed: {
          color: 0x49b86e,
          title: "Info Command",
          description: "This returns the current supply of P3C, the USD Price, the ETC Price, the ETC Market cap, the ETC market cap, and ETC price in USD.",
          fields: [{
            name: "Price ETC",
            value: res.data.PriceETC.toString()
          },
          {
            name: "Price USD",
            value: '$' + res.data.PriceUSD.toString()
          },
          {
            name: "Size ETC",
            value: res.data.SizeETC.toString()
          },
          {
            name: "Size USD",
            value: res.data.SizeUSD.toString()
          },
          {
            name: "P3C Supply",
            value: res.data.P3CSupply.toString()
          },
          {
            name: "ETC Price USD",
            value: '$' + res.data.ETCPriceUSD.toString()
          }]
        }
        }).catch(err => {
          console.log(err);
        });
      }}
      )
    }
    if(args[0] === 'crop') {
      if(args[1] && args[1] !== '') {
        axios.get('https://api.p3c.io/price/crop/' + args[1]).then((res) => {
          if(res.data) {
          message.channel.send({embed: {
            color: 0x49b86e,
            title: "Crop Command",
            description: "Can be called on any crop. Returns the growth in ETC/USD over a 1 day, 7 day, and 30 day period.",
            fields: [{
              name: "ETC 1",
              value: res.data.etc1.toString()
            },
            {
              name: "USD 1",
              value: '$' + res.data.usd1.toString()
            },
            {
              name: "ETC 7",
              value: res.data.etc7.toString()
            },
            {
              name: "USD 7",
              value: '$' + res.data.usd7.toString()
            },
            {
              name: "ETC 30",
              value: res.data.etc30.toString()
            },
            {
              name: "USD 30",
              value: '$' + res.data.usd30.toString()
            }]
          }
          }).catch(err => {
            console.log(err);
          });
        }})
      } else {
        message.channel.send('You can see more commands by sending `help` to channel');
      }
    }
    if(args[0] === 'help') {
      message.channel.send({embed: {
        color: 0x49b86e,
        title: "Help Command",
        description: "This can be called to know the list of available comands",
        fields: [{
          name: "info",
          value: "`info` returns the current supply of P3C, the USD Price, the ETC Price, the ETC Market cap, the ETC market cap, and ETC price in USD"
        },
        {
          name: "crop <address>",
          value: "example: `crop 0xB751eb15542D3fba12065A63f87E0b059c04091C`, Can be called on any crop. Returns the growth in ETC/USD over a 1 day, 7 day, and 30 day period."
        }]
      }}).catch(err => {
        console.log(err);
      });
    }
  } else {
    return;
  }
});
