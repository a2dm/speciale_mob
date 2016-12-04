angular.module('starter.services', ['ngResource'])

    .factory('LoginService', ['$http', '$q', LoginService])
    .factory('PedidoService', ['$http', '$q', PedidoService]);

    function LoginService($http, $q) {

        return {

            login: function(login, senha) {
                var request = {
                    method: 'POST',
                    url: '/speciale/LoginWS/login',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'login=' + login + '&senha=' + senha
                };

                return $http(request).then(function(response){
                    return response.data;
                });
            }
        }
    }

    function PedidoService($http, $q) {

        return {

            getPedido: function(dataPedido, idCliente) {

                var request = {
                    method: 'POST',
                    url: '/speciale/PedidoWS/getPedido',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'dataPedido=' + dataPedido + '&idCliente=' + idCliente
                };

                return $http(request).then(function(response) {
                    return response.data;
                });
            },

            getListaProdutoByCliente: function(idCliente) {

                var request = {
                    method: 'POST',
                    url: '/speciale/PedidoWS/getListaProdutoByCliente',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'idCliente=' + idCliente
                };

                return $http(request).then(function(response) {
                    return response.data;
                });
            },

            cadastrar: function(idCliente, idUsuario, data, observacao, listaProdutosAdicionados) {

                var request = {
                    method: 'POST',
                    url: '/speciale/PedidoWS/cadastrar',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'idCliente=' + idCliente 
                        + '&idUsuario=' + idUsuario
                        + '&data=' + data
                        + '&observacao=' + observacao
                        + '&produtosAdicionadosJson=' + angular.toJson(listaProdutosAdicionados)
                };

                return $http(request).then(function(response) {
                    return response.data;
                });
            }
        }
    }
