const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Remove song from the queue',
  args: true,
  usage: '<Number of song in queue>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

     if (!player.queue.current){
     let thing = new MessageEmbed().setColor(client.embedColor).setDescription(`**${client.emoji.dj} Sorry, currently there is no player in this server!\n${client.emoji.blank}${client.emoji.play} Use \`/play\` to start player for this server**`);

      return message.reply({ embeds: [thing] });
  }

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
         .setDescription(`**${client.emoji.music} No songs at number ${number} there are total ${player.queue.length} songs**`);
      return message.reply({ embeds: [thing] });
    }

    const song = player.queue[position];

    await player.queue.splice(position, 1);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`**${client.emoji.next} Removed: [${song.title.split(' ').slice(0, 7).join(' ')}](${song.uri})**`);
    return message.reply({ embeds: [thing] });
  },
};
