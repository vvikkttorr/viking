const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {

    
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " is gekicked :point_right: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("neen");
        });
    }







module.exports.help = {
    name: "kick",
    description: "kick een persoon"
}