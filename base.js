//Welcome to my code! Wondering where to start coding? Check out YouTube, there are some great tutorials!
//Looking for the token? Not so fast. It's hidden somewhere else.

const Discord = require('discord.js');
const client = new Discord.Client();

//Holds the prefix and token
const config = require("./config.json");
//Motivates me when turning bot on I guess
client.on('ready', () => {
    console.log('go. destroy. create.');
});

//Greetings!
client.on('guildMemberAdd', member => {
  let guild = member.guild;
  guild.defaultChannel.send(`oi ${member.user}! be sure to check out the rules! c:`);
});

//Notifies when a guild is added in cmd.
client.on("guildCreate", guild => {
  console.log(`new server added, woop woop!
    name: ${guild.name}
    owner: ${guild.owner.user.username}
    keep on working! c:`);
});

client.on('message', message => {
  const ergs = message.content.split(" ").slice(1);
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
//Prefix stuff
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);


//Math + command
  if (command === 'add') {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    message.channel.send(total);
  }

  //Echo command
  if (command === 'say') {
    message.channel.send(args.join(" "));
  }

//<3
    if (command === 'ping') {
        message.channel.send('pong! c;');
    }
    if (command === 'pong') {
      message.channel.send('ping.', `you're not that funny.`)
    }

    //Mod only easter-egg.
    if (command === `super`) {
let modRole = message.guild.roles.find('name', 'moddi');
      if(message.member.roles.has(modRole.id)) {
        message.channel.send('secret c;');
      } else {
        message.reply(`bwahahaha you cant access the secrets of the ocean! ;p `);
      }
    }

//Kick members.
    if (command === 'kick') {
      let modRole = message.guild.roles.find("name", "moddi", "Mod");
      if (!message.member.roles.has(modRole.id)) {
        message.channel.send(`sorry, you don't have permission to do that.`);
      }
      if (message.mentions.users.size === 0) {
        return message.channel.send(`don't forget to mention the user you want to kick!`);
      }
      let kickMember = message.guild.member(message.mentions.users.first());
      if(!kickMember) {
        return message.channel.send('wait, who? try retyping the username.');
      }
      if(!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) {
        return message.channel.send(`i don't have the permission to do that. go into server settings > roles > reBot and give me the "Kick Members" permission. then, drag me over the user you'd like to kick. c:`)
      }
      kickMember.kick();
    }

  //Ban members.
    if (command === `ban`) {
      let modRole = message.guild.roles.find("name", "moddi", "Mod");
      if (!message.member.roles.has(modRole.id)) {
        message.channel.send(`sorry, you don't have permission to do that.`);
      }
      if (message.mentions.users.size === 0) {
        return message.channel.send(`don't forget to mention the user you want to ban!`);
      }
      let banMember = message.guild.member(message.mentions.users.first());
      if(!banMember) {
        return message.channel.send('wait, who? try retyping the username.');
      }
      if(!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) {
        return message.channel.send(`i don't have the permission to do that. go into server settings > roles > reBot and give me the "Ban Members" permission. then, drag me over the user you'd like to ban. c:`)
      }
      banMember.ban();
    }

 //VERY simple roleme, temporary solution!
 let role = message.guild.roles.find("name", "Updates");
let member = message.member;
member.addRole(role) 

member.removeRole(role)


//The one and powerful eval command.
    if (command === 'eval') {
      if (message.author.id !== '271443182066204673') return;
      try {
        const code = args.join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
      }


});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace (/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else {
      return text;
  }
}

//Told you so.
client.login(config.token)
