const utils = {};

utils.ordenarItemsParaMostrar = (listaItems) => {
    let arrayFinal = [];

    const agrupados = listaItems.reduce((group, product) => {
        const { nombreEnFactura } = product;
        group[nombreEnFactura] = group[nombreEnFactura] ?? [];
        group[nombreEnFactura].push(product);
        return group;
    }, {});
    //console.log("lista", listaItems);

    const keys = Object.keys(agrupados).sort();
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        arrayFinal.push({
            nombreItem: keys[i],
            cantidad: agrupados[keys[i]].length,
        });
    }

    return arrayFinal;
};

utils.ordenarSubCuentasPorIdCuenta = (cuentas) => {
    console.log("cuentas", cuentas);

    let arrayFinal = [];

    const agrupados = cuentas.reduce((group, product) => {
        const { billId } = product;
        group[billId] = group[billId] ?? [];
        group[billId].push(product);
        return group;
    }, {});
    console.log("lista", agrupados);

    const keys = Object.keys(agrupados).sort();
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        arrayFinal.push({

            billId: keys[i],
            mesas: agrupados[keys[i]][0].bill.mesasLabel,
            subCuentas: agrupados[keys[i]],
        });
    }

    return arrayFinal;
};

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
};

export default utils;
