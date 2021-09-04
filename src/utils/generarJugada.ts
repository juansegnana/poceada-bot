export default function ():number[] {
    const min = 0;
    const max = 99;
    const cantJugadas = 5;
    const jugadasGeneradas:number[] = [];
    
    for (let i = 0; i < cantJugadas; i++) {
        const randomNumber = Math.floor(Math.random()*(max-min+1)+1);
        jugadasGeneradas.push(randomNumber);
    }
    
    return jugadasGeneradas;
};