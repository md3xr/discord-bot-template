const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Check the bot\'s latency and statistics'),
    async execute(interaction, client) {
        const ping = client.ws.ping;
        const uptime = Math.floor(client.uptime / 1000);
        const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        const cpuUsage = os.loadavg()[0];
        const serverCount = client.guilds.cache.size;
        const userCount = client.users.cache.size - 1; // Subtracting 1 to exclude the bot itself

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Statistics')
            .addFields(
                { name: '🏓 Ping', value: `${ping}ms`, inline: true },
                { name: '⏱️ Uptime', value: `${uptime}s`, inline: true },
                { name: '💾 Memory Usage', value: `${memoryUsage.toFixed(2)} MB`, inline: true },
                { name: '🖥️ CPU Usage', value: `${cpuUsage.toFixed(2)}%`, inline: true },
                { name: '🌐 Servers', value: serverCount.toString(), inline: true },
                { name: '👥 Users', value: userCount.toString(), inline: true }
            )

        await interaction.reply({ embeds: [embed] });
    },
};
