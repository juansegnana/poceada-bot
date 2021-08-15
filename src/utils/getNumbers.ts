import cheerio from 'cheerio';
import request from 'request-promise';

export interface jugadaFinal {
    /**
     * Se encontraron o no resultados
    */
    success: boolean;
    /**
     * Link donde se consultan los resultados
    */
    linkDia: string;
    /**
     * Nro. de sorteo. Disponible si se encontraron resultados.
    */
    nroSorteo?: string;
    /**
     * Resultados. Disponible si se encontraron resultados.
    */
    resultados?: number[];
}

async function getNumbers(): Promise<jugadaFinal> {

    let now = new Date();
    // En caso que se ejecute en un servidor con timeZone diferente, se parsea a horario local.
    now = new Date( now.toLocaleString("en-US", {timeZone: 'America/Argentina/Buenos_Aires'}) );
    const day = now.getDate();
    const month = now.getMonth()+1;
    const year = now.getFullYear();

    const URL_DIA = `https://loteria.chaco.gov.ar/ver_extracto/${day}-${month}-${year}/10`;

    const $ = await request({
        uri: URL_DIA,
        transform: (body:string) => cheerio.load(body)
    });

    // El string será: "N° Sorteo: X"
    const nroSorteo:string = $('.card-header h5').text().trim();

    const resultNumbers:number[] = [];
    const resultados = $('.results-list__item p').each( (i:number, el:string) => {
        
        const text = $(el).text().trim();
        if ( i > 1 && i < 22 ) {
            // Se obvia columna "ubicación", por lo que
            // se agarran solo impares.
            ((i % 2) !== 0) && resultNumbers.push(Number(text))
        }

    });
    
    if (resultados.length === 2) {
        // Si entra acá es porque los resultados están vacíos todavía.
        // Se chequeará nuevamente, cada minuto, 15 veces más. (Job externo)
        return { success: false, linkDia:URL_DIA };
    }
    
    const jugadaFinal:jugadaFinal = {
        success: true,
        linkDia: URL_DIA,
        nroSorteo: nroSorteo,
        resultados: resultNumbers
    }

    return jugadaFinal;

}

export default getNumbers;