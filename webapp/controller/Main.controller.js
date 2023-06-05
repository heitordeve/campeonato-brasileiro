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

                //Objetos
                let dadosGerais = {};
                let classificacao = {};
                let partidas = {};

                //Modelos
                let dadosModel = new JSONModel(dadosGerais);
                let classificacaoModel = new JSONModel(classificacao);
                let partidasModel = new JSONModel(partidas);

                //Atribuindo 3 modelos à tela
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                
                this.buscarClassificacao();
                                
            },
            buscarDadosGerais: function() {
                //Obter model a ser atualizado
                let dadosModel2 = this.getView().getModel("ModeloDadosGerais");
                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_0df587005f2b131f4b57053031b41a"
                        // "Authorization" : "Bearer test_e33881f6dec637a257822b620480a9",
                    }
                }
    
                //Fazendo a chamada para API
                $.ajax(configuracoes)
                .done(function(res){
                    dadosModel2.setData(res);  
                    this.buscarPartidas(res.rodada_atual.rodada)             
                    
                }.bind(this) )//sucesso
    
                .fail(function(erro){
                    
                }) //erro);        
            },
            buscarClassificacao: function(){
                //obter o model a ser atualizado
                var classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_de2df8548f6cf6ed2cdcf421348881",
                    }
                };

                //fazemos a chamada à API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(res){
                    
                    classificacaoModel2.setData({"Classificacao":res});
                
                })

                //erro
                .fail(function(erro){
                debugger
                })
                ;
     

            },
            buscarPartidas: function(rodada){
                //obter o model a ser atualizado
                var partidasModel2 = this.getView().getModel("ModeloPartidas");

                const configuracoes = {
                    url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method : "GET",
                    async : true,
                    crossDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_de2df8548f6cf6ed2cdcf421348881",
                    }
                };

                //fazemos a chamada à API
                $.ajax(configuracoes)
                
                //sucesso
                .done(function(resposta){
                    debugger
                    partidasModel2.setData(resposta);
                
                })

                //erro
                .fail(function(erro){
                debugger
                })
            }   
        });
    });
