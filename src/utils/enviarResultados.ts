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
import MSG from "../constants/messages";
import { jugadaFinal } from "./getNumbers";

/**
 * Enviar resultados a usuarios que piden notificación.
 * @param {jugadaFinal} results Objeto con datos de búsqueda.
 * @returns {void}
*/
async function enviarResultados(results:jugadaFinal):Promise<void> {

    // TODO: Obtener usuarios a notificar.

    // ----

    const { success, linkDia } = results;

    if (!success) {
        console.log('No se encontraron jugadas. Notificando usuarios...');
        // TODO: Enviar usuarios.
        const MSG_FINAL = `${MSG.noResults}\n🔗 ${linkDia}`;

        return;
    }

}

export default enviarResultados;