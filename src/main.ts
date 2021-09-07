import { scheduleJob, RecurrenceRule } from 'node-schedule';
import { prisma } from '../prisma/client';
import hacerBusqueda from './jobs/hacerBusqueda';

const main = async (): Promise<void> => {
    await require('./bot');
    // En caso de no tener Replit premium, iniciar server y mandar ping cada X minutos.
    // await require('./server');
    // Debe iniciar a las 22:05, los martes, jueves y sábados.
    const rule = new RecurrenceRule();
    rule.hour = 22;
    rule.minute = 5;
    rule.dayOfWeek = [2,4,6];
    rule.tz = 'America/Argentina/Buenos_Aires';
    // const CRON_JOB = '5 22 * * 2,4,6';
    scheduleJob(rule, () => {
        console.log('Empezando búsqueda...');
        hacerBusqueda();
    });
    console.log('Job iniciado.');
};

main();

// Closing events
// https://stackoverflow.com/a/14032965/9603894
async function exitHandler() {
    console.log('Desconectando DB...')
    await prisma.$disconnect();
    console.log('Listo!')
    process.exit();
}

//do something when app is closing
process.on('exit', exitHandler);

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);