import { deleteJugadas, getJugadas, updateState } from "../../prisma/client";
import { sendMsg } from "../bot";

interface mandarAcierto {
    /**
     * Chat id del usuario en Telegram.
    */
    chatId: number;
    jugadaId: string;
    /**
     * 5 jugadas de 2 digitos cada uno (hasta el 99). Separado por un espacio.
     * Ejemplo: "22 35 64 15 55".
    */
    jugada: string;
    /**
     * Cantidad de aciertos que tuvo con su jugada.
    */
    cantidadAciertos: number;
};

/**
 * Enviar aciertos a usuarios que cargaron jugadas.
*/
async function obtenerAciertos(resultados:number[]):Promise<boolean> {
    
    console.log('Comenzando envío de aciertos a users...');
    // Obtener aciertos desde DB.
    const jugadas = await getJugadas();
    const arrToSend:mandarAcierto[] = [];

    if (!jugadas || jugadas.length < 1) {
        console.log('No se encontraron jugadas de ningún usuario.');
        return false;
    }
    for (const jug of jugadas) {

        const { id, chatId, jugada } = jug;
        
        let cantidadAciertos = 0;
        const arrJugada:number[] = jugada.split(' ').map(num => parseInt(num));
        
        if (resultados.length !== 0) {
            resultados.forEach(num => {
                if (arrJugada.includes(num)) {
                    cantidadAciertos++;
                };
            });
            return true;
        }

        arrToSend.push({
            chatId,
            jugadaId: id,
            jugada,
            cantidadAciertos
        });

    };

    console.log('Cantidad de aciertos a mandar:', arrToSend.length);
    for (const user of arrToSend) {
        const { jugadaId, chatId, jugada, cantidadAciertos } = user;
        const MSG_FINAL = `Tu jugada: ${jugada}\nTuvo: ${cantidadAciertos} acierto${cantidadAciertos!==1 && 's'}.`;
        // Mandar a telegram.
        await sendMsg(chatId, MSG_FINAL);
        await updateState(jugadaId);
    };
    
    console.log('Se enviaron los aciertos.');

    // Borrar jugada de DB.
    console.log('Borrando jugadas guardadas...');
    await deleteJugadas();
    
    console.log('Fin de envío de aciertos.');
    return true;
}

export default obtenerAciertos;