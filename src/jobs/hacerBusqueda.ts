/*
    Este cronJob se debe ejecutar cuando se buscó una vez y no hubo exito.
    La página suele tener 5 o 15 minutos de retraso en caragar resultados.
    - Se debe reintentar búsqueda cada 1 minuto.
    - Con un máximo de 15 intentos.
*/
import { scheduleJob, Job } from 'node-schedule';
import getNumbers, { jugadaFinal } from '../utils/getNumbers';

 
let taskCounter = 0;
const MAX_INTENTOS = 1;

const main = async() => {

    const EVERY_MINUTE = '*/5 * * * * *';

    const job:Job = scheduleJob(EVERY_MINUTE, async() => {
        taskCounter++;
        console.log('Ejecutando consulta. Nro:', taskCounter);
        
        const results = await getNumbers();
        
        if (results.success) {
            console.log('Se encontró resultados. Cancelando job.');
            return job.cancel();
        };

        if (taskCounter > MAX_INTENTOS) {
            console.log('Se superó maximo de intentos. Cancelando job.');
            return job.cancel();
        }

    });

}
export default main;
