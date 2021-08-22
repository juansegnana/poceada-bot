import { scheduleJob } from 'node-schedule';
import hacerBusqueda from './jobs/hacerBusqueda';

const main = async (): Promise<void> => {
    await require('./bot');
    // await require('./server');
    // Debe iniciar a las 22:05, los martes, jueves y sábados.
    const CRON_JOB = '5 22 * * 2,4,6';
    scheduleJob(CRON_JOB, () => {
        console.log('Empezando búsqueda...');
        hacerBusqueda();
    });
    console.log('Job iniciado.');
};

main();