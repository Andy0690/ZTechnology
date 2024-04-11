// helpers.js
const calcularNumeroNoches = (fechaInicio, fechaFin) => {
    const fechaInicioObj = new Date(fechaInicio);
    const fechaFinObj = new Date(fechaFin);
    
    const diferenciaTiempo = fechaFinObj.getTime() - fechaInicioObj.getTime();
    const numeroNoches = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));

    return numeroNoches;
};

export { calcularNumeroNoches };
