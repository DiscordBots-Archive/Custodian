const Moderation = require('../../base/Moderation.js');

class Hackban extends Moderation {
  constructor(client) {
    super(client, {
      name: 'hackban',
      description: 'Forcebans a user.',
      usage: 'hackban <member:user id> [reason:string]',
      category: 'Moderation',
      extended: 'This command bans a user not in the server.',
      aliases: ['forceban'],
      botPerms: ['SEND_MESSAGES', 'BAN_MEMBERS'],
      permLevel: 'Administrator'
    });
  }

  async run(message, args, level) {
    const { lang, prefix, modLogChannel } = this.client.settings.get(message.guild.id);
    
    const channel  = message.guild.channels.exists('name', modLogChannel);
    if (!channel)    throw `${message.author}, I cannot find the \`${modLogChannel}\` channel. Try running \`${prefix}set edit modLogChannel logs\`.`;
    const target   = args[0];
    if (!target)     return message.lang(message, lang, this.help.category, 'incorrectModCmdUsage');
    const modLevel = this.hackCheck(message, args[0], level);
    if (typeof modLevel === 'string') return message.reply(modLevel);
    const reason   = args.splice(1, args.length).join(' ');
    try {
      message.guild.ban(target, {reason: reason.length < 1 ? 'No reason supplied.': reason});
      await this.buildHackLog(this.client, message.guild, 'hb', target, message.author, reason);
      await message.channel.send('They were successfully banned.');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Hackban;