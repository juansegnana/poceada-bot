import { scheduleJob, Job } from 'node-schedule';
import hacerBusqueda from './hacerBusqueda';

// Debe iniciar a las 22:05, los martes, jueves y sábados.
const CRON_JOB = '5 22 * * 2,4,6';

const main = ():void => {

    scheduleJob(CRON_JOB, () => {
        hacerBusqueda();
    });

}

export default main;