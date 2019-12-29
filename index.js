const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("Darknetwork", { type: "PLAYING" });

});

// Geef role aan speler als ie joint

bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Player");

    if (!role) return;

    member.addRole(role);

})

bot.on("guildMemberAdd", member => {
   
    const channel = member.guild.channels.find("name", "welkom");
    if(!channel) console.log("Kan kanaal niet vinden");

    var joinMessage = new discord.RichEmbed()
     .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
     .setDescription(`Hey ${member.user.username}, **Welkom in de server**, Ik wens je nog veel geluk`)
     .setColor("#00ff00")
     .setTimestamp()
     .setFooter("Gebruiker gejoined");

     channel.send(joinMessage);
});

bot.on("guildMemberRemove", member => {
   
    const channel = member.guild.channels.find("name", "welkom");
    if(!channel) console.log("Kan kanaal niet vinden");

    var joinMessage = new discord.RichEmbed()
     .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
     .setColor("#ff0000")
     .setTimestamp()
     .setFooter("Gebruiker geleaved");

     channel.send(joinMessage);
});


bot.on("message", async message => {

    // Als bot bericht stuurt, stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, arguments);

});

bot.login(process.env.token);