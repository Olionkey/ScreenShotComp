const auth       = require("./configuration/auth.json");
const Discord    = require("discord.js");
const client     = new Discord.client();
const prefix     = require("./configuration/config.json");

var currentTheme = 'Bullshit'; // temp.

//Start the bot.
client.login(auth.token);
client.on("ready", () => {
    console.log("Bot has started");
    client.user.setActivity(`Screenshot Competition in prograss this months theme is: ${currentTheme}`);
})

client.on ("message", async message => {
    
})