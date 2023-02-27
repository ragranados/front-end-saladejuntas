const utils = {}

utils.ordenarItemsParaMostrar = (listaItems) => {

    const arrayFinal = [];

    const agrupados = listaItems.reduce((group, product) => {
        const { nombre } = product;
        group[nombre] = group[nombre] ?? [];
        group[nombre].push(product);
        return group;
    }, {});
    //console.log("lista", listaItems);

    const keys = Object.keys(agrupados);
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        arrayFinal.push({ nombreItem: keys[i], cantidad: agrupados[keys[i]].length });
    }

    return arrayFinal;
}

export default utils;