/*
    Este cronJob se debe ejecutar cuando se buscó una vez y no hubo exito.
    La página suele tener 5 o 15 minutos de retraso en caragar resultados.
    - Se debe reintentar búsqueda cada 1 minuto.
    - Con un máximo de 15 intentos.
*/
import { scheduleJob, Job } from 'node-schedule';
import enviarResultados from '../utils/enviarResultados';
import getNumbers from '../utils/getNumbers';


let taskCounter = 0;
const MAX_INTENTOS = 40;

const main = async () => {

    const EVERY_MINUTE = '*/30 * * * * *';
    console.log('Job se ejecuta cada 30 segundos...');
    
    const job: Job = scheduleJob(EVERY_MINUTE, async () => {

        taskCounter++;
        console.log('Ejecutando consulta. Nro:', taskCounter);

        const results = await getNumbers();

        // Se encontraron los resultados. Cancelar job.
        const case1 = results.success;
        // NO se encontraron los resultados, pero superó los intentos. Cancelar job.
        const case2 = taskCounter > MAX_INTENTOS;
        if (case1 || case2) {

            (case1)
                ? console.log('Se encontró resultados.')
                : console.log('Se superó maximo de intentos. Cancelando job.');
            console.log('Cancelando job.');

            // Enviar resultados a usuarios.
            enviarResultados(results);
            return job.cancel();
        };

        // NO se encontraron los resultados. Reintentar job.
        console.log('Todavía no se subieron las jugadas, intento:', taskCounter);

    });

}
export default main;
