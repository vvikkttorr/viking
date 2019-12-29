const discord = require("discord.js");
 
module.exports.run = async (bot, message, args) => {

    if(!args[0]) return message.channel.send("Gebruik : !sps <steen, papier, schaar>");

    var options = ["steen", "papier", "schaar"];

    var result = options[Math.floor(Math.random() * options.length)];

   if(args[0] == "steen"){

        if(result == "schaar"){
            message.channel.send(`Ik heb ${result} :scissors:, Ik win`);
        }else if(result == "papier"){
            message.channel.send(`Ik heb ${result} :newspaper:, jij wint`);
        }else if(result == "steen"){
            message.channel.send(`Ik heb ${result} :moyai:, het is gelijk spel`);
        }
    }
    else if(args[0] == "papier"){

        if(result == "steen"){
            message.channel.send(`Ik heb ${result} :moyai:, jij wint`);
        }else if(result == "schaar"){
            message.channel.send(`Ik heb ${result} :scissors:, ik win`);
        }else if(result == "papier"){
            message.channel.send(`Ik heb ${result} :newspaper:, het is gelijk spel`);
        }
    }
    else if(args[0] == "schaar"){

        if(result == "papier"){
            message.channel.send(`Ik heb ${result} :newspaper:, Ik win`);
        }else if(result == "steen"){
            message.channel.send(`Ik heb ${result} :moyai:, Jij wint`);
        }else if(result == "schaar"){
            message.channel.send(`Ik heb ${result} :scissors:, het is gelijk spel`);
        }
    }


}
module.exports.help = {
    name: "sps",
    description: "Speel een spel"
}  