const MSG = {
    /**
     * No se subieron los resultados, se manda link para que consulte.
    */
    noResults: '🔍 Todavía no se subieron las jugadas a la web. Visita la página más tarde para consultar los resultados:',
    /**
     * Se encontraró resultados, se envia nro de sorteo.
    */
    successNro: '🔔 Resultados de:',
    /**
     * Si no hay resultados, pero cargó jugadas, se le recuerda sus jugadas.
    */
    jugadasNoResults: '🔔 Recordá que tus jugadas fueron:',
    /**
     * Si hay resultados y cargó jugadas, se le recuerda sus jugadas con la cantidad de aciertos.
    */
    jugadasResults: '🍀 Tus jugadas y aciertos son:',
    /**
     * Cuando el usuario carga su jugada y ésta no es válida.
    */
    jugadaInvalid: '❌ Esa jugada no es válida. Recordá que deben ser 5 números de 2 dígitos cada uno y separados por un espacio. Por ejemplo: 23 06 19 12 54',
    /**
     * Cuando el usuario carga una jugada válida y se guarda para noticicar.
    */
    jugadaSaved: '👌🍀 Tu jugada fue guardada!',
}

export default MSG;