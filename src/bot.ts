import { Telegraf } from "telegraf";
import { config } from "dotenv";
import { createJugada, createUser, deleteUser, deleteUserJugadas, getUser, getUserJugadas } from "../prisma/client";
import generarJugada from './utils/generarJugada';

config();

// https://telegraf.js.org/#shorthand-methods
const bot = new Telegraf(`${process.env.BOT_TOKEN}`);

bot.command('start', async(ctx) => {

    console.log('Creando usuario...');
    const chatId = ctx.message.chat.id;
    const userResult = await getUser(chatId);

    if (userResult) {
        return ctx.reply('Ya estás registrado para notificaciones');
    }

    await createUser(chatId);
    return ctx.reply('Listo!')

});

bot.command('stop', async(ctx) => {

    console.log('Borrando usuario...');
    const chatId = ctx.message.chat.id;

    const userResult = await getUser(chatId);

    if (!userResult) {
        return ctx.reply('No estás registrado para notificaciones');
    }

    await deleteUser(chatId);
    return ctx.reply('Listo!')

});

bot.command('misjugadas', async(ctx) => {

    const chatId = ctx.message.chat.id;
    const jugadasUser = await getUserJugadas(chatId);
    if (!jugadasUser || jugadasUser.length < 1) return ctx.reply('No se encontraron jugadas guardadas');
    
    let msgJugadas:string[] = [];
    jugadasUser.forEach(({ jugada }, index) => {
        // TODO - Get random emoji.
        const emoji = (index % 2 === 0) ? '🍀' : '🤞';
        msgJugadas.push(`${emoji} Jugada nro. ${index+1}:\n${jugada.split(' ').join(', ')}.`)
    });
    return ctx.reply(`${msgJugadas.join('\n')}`);

});

bot.command('borrarjugadas', async(ctx) => {

    const chatId = ctx.message.chat.id;
    const jugadasUser = await getUserJugadas(chatId);

    if (!jugadasUser) return ctx.reply('No se encontraron jugadas guardadas.');
    
    await deleteUserJugadas(chatId);
    console.log('Se borraron jugadas del usuario');
    return ctx.reply('Se borraron tus jugadas guardadas.');

});

bot.command('generarjugada', async(ctx) => {
    const numbers = generarJugada();
    ctx.reply(`🍀 Jugada al azar:\n ${numbers.join(', ')}.`);
});


bot.on('text', async(ctx) => {

    const chatId = ctx.message.chat.id;
    const userResult = await getUser(chatId);
    const text = ctx.message.text;

    console.log(`Log: ${ctx.message.from.first_name} dijo: "${text}".`);

    if (!userResult) return ctx.reply('Presioná /start');
    
    const JUG_EXP = /^(\d{1,2}\W+){4}(\d{1,2}\W?)$/;
    
    if (!JUG_EXP.test(text)) return ctx.reply('🚧 Jugada no válida');
    
    console.log('Jugada válida.');

    const jugadaToSave = text.trim();
    const result = await createJugada(chatId, jugadaToSave);
    console.log(result);
    console.log('Jugada guardada.');
    return ctx.reply('Se cargó tu jugada, se notificará en el próximo sorteo.');

});

console.log('Bot listo.');
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

/**
 * Enviar un mensaje a un usuario específico.
 * @param {string} chatId Chat ID del usuario.
 * @param {string} text Texto a mandarle.
*/
const sendMsg = async (chatId: number, text: string) => {
    return await bot.telegram.sendMessage(chatId, text);
};

export { sendMsg };