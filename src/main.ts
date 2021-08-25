import { scheduleJob, RecurrenceRule } from 'node-schedule';
import hacerBusqueda from './jobs/hacerBusqueda';

const main = async (): Promise<void> => {
    await require('./bot');
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