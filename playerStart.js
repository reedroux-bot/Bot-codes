const { MessageEmbed, MessageActionRow, MessageAttachment, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont("RR.otf", { family: 'TT' });
const { MessageButton} = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 * @param {KazagumoTrack} track 
	 */


	run: async (client, player, track, interaction) => {

		let guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;

		let channel = guild.channels.cache.get(player.textId);
		if (!channel) return;
		
		let data = await db.findOne({ Guild: guild.id });

		if (data && data.Channel) {
			let textChannel = guild.channels.cache.get(data.Channel);
			const id = data.Message;
			if (channel === textChannel) {
				return await trackStartEventHandler(id, textChannel, player, track, client);
			} else {
				await trackStartEventHandler(id, textChannel, player, track, client);
			};
		}
		const emojiplay = client.emoji.play;

const img = await canvas.loadImage(`bg.png`);

    const nail = `${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`}`

  const titlee = track.title
 let namees = titlee.toString().split(' ').slice(0, 4).join(` `);
     const imgge = await canvas.loadImage(nail);
const dur = `${track.isStream ? '◉ LIVE' : convertTime(player.queue.current.length)}`

 let imagee = new Canvas(854, 215)
    .printImage(img, 0, 0, 854, 215)
    .setColor(client.embedColor)
      .setTextFont('18px TT')
    .printWrappedText(namees, 407, 62)
      .printWrappedText(track.author, 388, 98)
    // .printRectangle(81, 26,208, 116)
    .printImage(imgge, 52, 48, 195, 120)
      .printWrappedText(dur, 404, 133)
   .printWrappedText(`${track.requester.username ? track.requester.username : `${client.user.username}`}`, 440, 168)
    // .setColor("#000000")
    .toBuffer();
const imgg = new MessageAttachment(imagee, 'playing.png');
    


    
const bplay = new MessageButton().setCustomId(`play`).setEmoji(`1119915811415539722`).setStyle('SECONDARY').setDisabled(false)
        const bpause = new MessageButton().setCustomId(`pause`).setEmoji(`1125337550651924550`).setStyle('SECONDARY').setDisabled(false)
    const bprev = new MessageButton().setCustomId(`prev`).setEmoji(`1125337562429522000`).setStyle('SECONDARY').setDisabled(false)
    const bnext = new MessageButton().setCustomId(`next`).setEmoji(`1125337537666355200`).setStyle('SECONDARY').setDisabled(false)
    const blike = new MessageButton().setCustomId(`like`).setEmoji(`1125337577709387808`).setStyle('SECONDARY').setDisabled(false)
    
const row = new MessageActionRow().addComponents(bprev, bplay, bnext, blike);
 const prow = new MessageActionRow().addComponents(bprev, bpause, bnext, blike);  
		const main = new MessageEmbed()
			.setTitle(`${emojiplay} Now Playing`)
			.setDescription(`[${track.title.split(' ').slice(0, 7).join(' ')}](${track.uri})`)
			.setColor(client.embedColor)
			.setTimestamp()
			.setThumbnail(`${track.thumbnail ? track.thumbnail : `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`}`)
			.addFields([
				{
				  name: 'Duration',
				  value: `\`${track.isStream ? '◉ LIVE' : convertTime(player.queue.current.length)}\``,
				  inline: true,
				},
				{
				  name: 'Author',
				  value: `${track.author}`,
				  inline: true,
				},
				{
				  name: 'Requested by',
				  value: `${track.requester ? track.requester : `<@${client.user.id}>`}`,
				  inline: true,
				},
			  ])
			
// 	let m = await	client.channels.cache.get(player.textId)?.send({
//   files: [imgg]
// }).then(x => player.data.set("message", x));



    

		await player.data.set("autoplaySystem", track.identifier);
	}
};
