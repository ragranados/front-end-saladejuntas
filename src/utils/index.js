const utils = {}

utils.ordenarItemsParaMostrar = (listaItems) => {

    let arrayFinal = [];

    const agrupados = listaItems.reduce((group, product) => {
        const { nombre } = product;
        group[nombre] = group[nombre] ?? [];
        group[nombre].push(product);
        return group;
    }, {});
    //console.log("lista", listaItems);

    const keys = Object.keys(agrupados).sort();
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        arrayFinal.push({ nombreItem: keys[i], cantidad: agrupados[keys[i]].length });
    }


    return arrayFinal;
}

utils.ordenarPorNombre = (arr) => {

    return arr.sort((a, b) => {
        if (a.nombre > b.nombre) {
            return 1;
        }
        if (a.nombre < b.nombre) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
}

export default utils;