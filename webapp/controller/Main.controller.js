sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                //Modelo
                let dadosGerais = {
                    rodada : '11ª',
                    campeonato: 'Brasileirão 2023 do Canal FioriNET'
                }

                let dadosModel = new JSONModel()
                dadosModel.setData(dadosGerais);
                let view = this.getView()
                view.setModel(dadosModel, "ModeloDadosGerais")

            }
        });
    });
