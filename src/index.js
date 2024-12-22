const { Client, ActivityType, GatewayIntentBits, Partials } = require('discord.js');
const { CommandKit } = require('commandkit');
const { joinVoiceChannel } = require('@discordjs/voice');
const VOICE_CHANNEL_ID = '1156719959519547462'; 

require('dotenv/config');

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  partials: [Partials.Channel],
});
exports.client = client;

new CommandKit({
  client,
  commandsPath: `${__dirname}/commands`,
  eventsPath: `${__dirname}/events`,
  bulkRegister: true,
});

client.once('ready', () => {
  const voiceChannel = client.channels.cache.get(VOICE_CHANNEL_ID);
  
  // Voice Channels Type is (2)

  if (!voiceChannel || voiceChannel.type !== 2) { 
    console.error('The Channel is not Voice channel pls check the id.');
    return;
  }

  joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  });

  console.log(`Joined : ${voiceChannel.name} Voice Channel.`);

});


client.login(process.env.TOKEN);
