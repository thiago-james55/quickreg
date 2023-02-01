var valveNumbers;

const minManualEscape = document.getElementById("minManualEscape");

const maxManualEscape = document.getElementById("maxManualEscape");

const minManualAdmissao = document.getElementById("minManualAdmissao");

const maxManualAdmissao = document.getElementById("maxManualAdmissao");

function addListeners() {
    minManualEscape.addEventListener("keyup", function () {
        checkRegulation();
    });
    minManualEscape.addEventListener("change", function () {
        checkRegulation();
    });

    maxManualEscape.addEventListener("keyup", function () {
        checkRegulation();
    });
    maxManualEscape.addEventListener("change", function () {
        checkRegulation();
    });

    minManualAdmissao.addEventListener("keyup", function () {
        checkRegulation();
    });
    minManualAdmissao.addEventListener("change", function () {
        checkRegulation();
    });

    maxManualAdmissao.addEventListener("keyup", function () {
        checkRegulation();
    });
    maxManualAdmissao.addEventListener("change", function () {
        checkRegulation();
    });
}

function mountGridValues() {
    valveNumbers = 8;

    let grid = document.getElementById("grid" + valveNumbers);

    for (let i = 0; i < valveNumbers; i++) {
        let position = "(" + (i + 1) + ") ";
        let pPosition = document.createElement("p");
        pPosition.innerText = position;

        let gridChildDiv = document.createElement("div");

        let spanActual = document.createElement("span");
        spanActual.innerText = "Pastilha Atual:";

        let inputActual = document.createElement("input");
        inputActual.type = "number";
        inputActual.addEventListener("keyup", function () {
            checkRegulation();
        });
        inputActual.addEventListener("change", function () {
            checkRegulation();
        });

        let spanCalibre = document.createElement("span");
        spanCalibre.innerText = "Calibre Máximo:";

        let inputCalibre = document.createElement("input");
        inputCalibre.type = "number";
        inputCalibre.addEventListener("keyup", function () {
            checkRegulation();
        });
        inputCalibre.addEventListener("change", function () {
            checkRegulation();
        });

        let spanRegulated = document.createElement("span");
        spanRegulated.innerText = "Pastilha Regulada:";

        let inputRegulated = document.createElement("input");
        inputRegulated.type = "number";
        inputRegulated.disabled = true;

        gridChildDiv.id = "divPastilha" + i;
        inputActual.id = "pastilhaAtual" + i;
        inputCalibre.id = "calibre" + i;
        inputRegulated.id = "pastilhaRegulada" + i;
        inputRegulated.classList.add("inputRegulated");

        gridChildDiv.appendChild(pPosition);
        gridChildDiv.appendChild(spanActual);
        gridChildDiv.appendChild(inputActual);
        gridChildDiv.appendChild(document.createElement("hr"));
        gridChildDiv.appendChild(spanCalibre);
        gridChildDiv.appendChild(inputCalibre);
        gridChildDiv.appendChild(document.createElement("hr"));
        gridChildDiv.appendChild(spanRegulated);
        gridChildDiv.appendChild(inputRegulated);

        grid.appendChild(gridChildDiv);
    }
}

function checkRegulation() {
    if (maxManualEscape.value > 0 && maxManualAdmissao.value > 0) {
        for (let i = 0; i < valveNumbers; i++) {
            let inputActual = document.getElementById("pastilhaAtual" + i);
            let inputCalibre = document.getElementById("calibre" + i);
            let inputRegulated = document.getElementById("pastilhaRegulada" + i);

            if (inputActual == null || inputCalibre == null) {
                continue;
            }

            if (inputActual.value > 0 && inputCalibre.value > 0) {
                if (i >= valveNumbers / 2) {
                    changeRegulated(
                        inputRegulated,
                        inputActual.value,
                        inputCalibre.value,
                        minManualAdmissao.value,
                        maxManualAdmissao.value
                    );
                    console.log("Admissão")
                } else {
                    changeRegulated(
                        inputRegulated,
                        inputActual.value,
                        inputCalibre.value,
                        minManualEscape.value,
                        maxManualEscape.value
                    );
                    console.log("Escape")
                }
            }
        }
    }
}

function changeRegulated(
    inputRegulated,
    inputActualValue,
    inputCalibreValue,
    minManualValue,
    MaxManualValue
) {
    let valueOfRegulation = inputCalibreValue - MaxManualValue;

    console.log(valueOfRegulation);

    if (valueOfRegulation > 0) {
        inputRegulated.value = inputActualValue - valueOfRegulation;
    } else if (valueOfRegulation < 0) {
        inputRegulated.value =
            parseInt(inputActualValue) + Math.abs(valueOfRegulation);
    } else {
        inputRegulated.value = 0;
    }
}

mountGridValues();
