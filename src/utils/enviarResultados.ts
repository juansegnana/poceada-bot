/*
    Este script se activa cuando:
    * se encontraron resultados,
    * NO se cargaron resultados.
    Globalmente debe:
    - recibir un array de resultados,
    - consultar usuarios a notificar
    - enviar jugadas que hizo usuario.
    Si se encontraron debe:
    - preparar un "mensaje final",
    - enviar mensaje final a usuarios a notificar.
    - llamar función de enviarAciertos(), pasando array de resultados.
    Si NO se encontraron resultados debe:
    - enviar a usuarios que no se encontraron resultados
    - facilitar link del día para que revisen manualmente.
*/
import { getUsers } from "../../prisma/client";
import { sendMsg } from "../bot";
import MSG from "../constants/messages";
import { jugadaFinal } from "./getNumbers";
import obtenerAciertos from "./obtenerAciertos";

/**
 * Enviar resultados a usuarios que piden notificación.
 * @param {jugadaFinal} results Objeto con datos de búsqueda.
 * @returns {boolean} Indica si se envió correctamente.
*/
async function enviarResultados(results: jugadaFinal): Promise<Boolean> {
    
    console.log('Comenzando envío de resultados a users...');
    // Obtener usuarios a notificar.
    const usersToNotify = await getUsers();
    if (!usersToNotify) {
        console.log('No hay usuarios a enviar. volviendo.');
        return false;
    }

    const {
        success,
        linkDia,
        nroSorteo = '0',
        resultados = []
    } = results;

    let MSG_FINAL: string = '';

    if (!success) {
        console.log('No se encontraron jugadas. Notificando usuarios...');
        MSG_FINAL = `${MSG.noResults}\n🔗 ${linkDia}`;
    } else {
        MSG_FINAL = `${MSG.successNro} ${nroSorteo}\n${resultados?.join(', ')}`;
    }

    // Enviar mensajes a usaurios.
    console.log('Mensaje final a mandar:', MSG_FINAL);
    let usersSent = 0;
    usersToNotify.forEach(async ({ id }) => {
        await sendMsg(id, MSG_FINAL);
        usersSent++;
    });
    console.log('Total de usuarios notificados:', usersSent);

    await obtenerAciertos(resultados);
    console.log('Fin de envío de resultados generales.');
    return true;
}

export default enviarResultados;