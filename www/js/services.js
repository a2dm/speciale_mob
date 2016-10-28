angular.module('starter.services', ['ngResource'])

    .factory('LoginService', ['$http', '$q', LoginService])
    .factory('PedidoService', ['$http', '$q', PedidoService]);

    function LoginService ($http, $q) {

        return {

            login: function (login, senha) {
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

    function PedidoService ($http, $q) {

        return {

            getPedido: function (dataPedido, idCliente) {

                var request = {
                    method: 'POST',
                    url: '/speciale/PedidoWS/getPedido',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: 'dataPedido=' + dataPedido + '&idCliente=' + idCliente
                };

                return $http(request).then(function(response){
                    return response.data;
                });
            }
        }
    }
