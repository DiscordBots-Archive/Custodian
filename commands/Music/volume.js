const Command = require('../../base/Command.js');

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      description: 'Sets the volume for the bot.',
      category: 'Music',
      guildOnly: 'true',
      usage: 'volume [value]',
      permLevel: 'User'
    });
  }

  async run(message, args, level) {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
    if (!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
      message.reply('Please join a voice channel first.');
    }
    
    const vol = args.join(' ');
    if (!vol) return message.channel.send(`Current volume is set at ${this.client.playlists.get(message.guild.id).disapatcher.volume * 100}%`);
    if (vol < 0 || vol > 100) return message.reply('Volume must be a value between 0% and 100%.');

    message.channel.send(`Setting volume to ${vol}%`).then(() => {
      message.guild.voiceConnection.volume = vol / 100;
      this.client.playlists.get(message.guild.id).dispatcher.setVolume(vol / 100);
    });
  }
}

module.exports = Volume;