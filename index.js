import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';

// 初始化機器人
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 💡 在這裡製作你的指令：名稱叫做 ping，敘述是測試機器人
const pingCommand = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('測試機器人的回應與延遲');

const commands = [pingCommand.toJSON()];

// 當機器人啟動時，自動把上面的指令與 Discord 綁定
client.once('ready', async () => {
    console.log(`🤖 機器人 ${client.user.tag} 已成功連線！`);
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        console.log('🔄 開始同步並綁定斜線指令...');
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('✅ 指令已成功綁定至 Discord！');
    } catch (error) {
        console.error('❌ 綁定失敗:', error);
    }
});

// 當有人在 Discord 輸入 /ping 時的反應
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'ping') {
        await interaction.reply('🏓 Pong! 機器人收到指令了！');
    }
});

client.login(process.env.DISCORD_TOKEN);
