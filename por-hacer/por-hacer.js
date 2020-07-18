const fs = require('fs');
const { array } = require('yargs');

let listadoPorHacer = [];

let guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err)

    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

let crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}

let getListado = () => {
    cargarDB();
    return listadoPorHacer;

}

let actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }
}

let borrar = (descripcion) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoNuevo === listadoPorHacer) {
        return false;
    } else {
        listadoPorHacer = listadoNuevo;
        guardarDb();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}