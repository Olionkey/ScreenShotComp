const auth      = require("./configuration/auth.json");
const config   = require("./configuration/config.json");

const Discord = require("discord.js");
const client    = new Discord.Client();

const child_process = require("child_process");

// Login to discord, and launch bot.
client.login(auth.token);
client.on("ready", () => {
    console.log("[[Bot has started]]");
});

// Set the status of the bot to DND if the bot crashes, and will automactially restart.
function workerProcessSpawn(){
    let workerProcess = child_process.spawn('node', ['./index.js'], {
        stdio: "inherit"
    });
    workerProcess.on('close', function(code) {
        console.log("Bot process exited with code "+ code);
        console.log("Bot offline, changing status");
        client.user.setStatus('dnd');
        client.user.setActivity("I have crashed, blame Olionkey");
    });
    return workerProcess;
};

var process = workerProcessSpawn();

// 167777692735766529
// Used for restarting the bot, and only restarting.
client.on("message", async  message => {
    if (message.content === `${config.prefix}r`) {

        if (message.author.id === config.developer){
            client.user.setStatus('idle');
            process.kill();
            process = workerProcessSpawn();
        }
    }
});