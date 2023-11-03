
document.addEventListener("DOMContentLoaded", function () {
    var poblacionSelect = document.getElementById("poblacionSelect");
    var tablaPaises = document.getElementById("tablaPaises");

    function cargarPoblacion() {
        var url = "https://restcountries.com/v3.1/all";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(pais => {
                    var poblacion = pais.population;
                    if (poblacion > 0) {
                        var option = document.createElement("option");
                        option.value = poblacion;
                        option.textContent = poblacion.toLocaleString();
                        poblacionSelect.appendChild(option);
                    }
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function mostrarDatosPais() {
        var poblacionSeleccionada = parseInt(poblacionSelect.value);
        var paisesSeleccionados = [];

        if (poblacionSeleccionada > 0) {
            var url = "https://restcountries.com/v3.1/all";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    data.forEach(pais => {
                        if (pais.population >= poblacionSeleccionada) {
                            paisesSeleccionados.push(pais);
                        }
                    });
                    llenarTablaConDatos(paisesSeleccionados);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            tablaPaises.innerHTML = "";
        }
    }

    function llenarTablaConDatos(paises) {
        tablaPaises.innerHTML = "";

        var encabezados = ["Nombre", "Monedas", "Banderas", "Población", "Idiomas"];
        var filaEncabezados = tablaPaises.insertRow();
        encabezados.forEach(encabezado => {
            var col = filaEncabezados.insertCell();
            col.textContent = encabezado;
        });

        paises.forEach(pais => {
            var fila = tablaPaises.insertRow();
            var colNombre = fila.insertCell();
            var colMonedas = fila.insertCell();
            var colBanderas = fila.insertCell();
            var colPoblacion = fila.insertCell();
            var colIdiomas = fila.insertCell();

            colNombre.textContent = pais.name.common;
            colMonedas.textContent = obtenerNombresMonedas(pais.currencies);
            colBanderas.innerHTML = `<img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}" width="50">`;
            colPoblacion.textContent = pais.population.toLocaleString();
            colIdiomas.textContent = obtenerNombresIdiomas(pais.languages);
        });
    }

    function obtenerNombresMonedas(currencies) {
        const nombres = [];
        for (const codigoMoneda in currencies) {
            nombres.push(currencies[codigoMoneda].name);
        }
        return nombres.join(', ');
    }

    function obtenerNombresIdiomas(languages) {
        const nombres = [];
        for (const codigoIdioma in languages) {
            nombres.push(languages[codigoIdioma]);
        }
        return nombres.join(', ');
    }

    poblacionSelect.addEventListener("change", mostrarDatosPais);

    cargarPoblacion();
});





