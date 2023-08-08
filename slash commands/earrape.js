const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
 
module.exports = {
  data: {
    name: 'earrape',
    description: 'Sets EarRape Filter.',
    options: [
      {
        name: 'input',
        description: 'The Filters input (on or off).',
        type: 'STRING',
        required: true,
        choices: [
          {
            name: 'on',
            value: 'on',
          },
          {
            name: 'off',
            value: 'off',
          },
        ],
      },
    ],
  },
 
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  execute: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });
 
    const input = interaction.options.getString('input');
    const player = client.manager.players.get(interaction.guild.id);
 
    if (!player?.queue?.current) {
      const thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**${client.emoji.dj} Sorry, currently there is no player in this server!\n${client.emoji.blank}${client.emoji.play} Use \`/play\` to start player for this server**`);
      return interaction.editReply({ embeds: [thing] });
    }
 
    const emojiequalizer = interaction.client.emoji.filter;
 
    if (input === 'off') {
      await player.shoukaku.clearFilters();
      const response = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**${client.emoji.dj} Successfully removed the filter in the music!\n${client.emoji.blank}${client.emoji.mode} Filter: EarRape Mode (OFF)**`);
      return interaction.editReply({ embeds: [response] });
    } else if (input === 'on') {
      await player.shoukaku.setFilters({
        op: 'filters',
        guildId: interaction.guild.id,
        equalizer: [
          { band: 0, gain: 0.25 },
          { band: 1, gain: 0.5 },
          { band: 2, gain: -0.5 },
          { band: 3, gain: -0.25 },
          { band: 4, gain: 0 },
          { band: 6, gain: -0.025 },
          { band: 7, gain: -0.0175 },
          { band: 8, gain: 0 },
          { band: 9, gain: 0 },
          { band: 10, gain: 0.0125 },
          { band: 11, gain: 0.025 },
          { band: 12, gain: 0.375 },
          { band: 13, gain: 0.125 },
          { band: 14, gain: 0.125 },
        ],
      });
 
      const response = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`**${client.emoji.dj} Successfully applied the filter in the music!\n${client.emoji.blank}${client.emoji.mode} Filter: EarRape Mode (ON)**`);
      return interaction.editReply({ embeds: [response] });
    }
  },
};