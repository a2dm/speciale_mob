angular.module('starter.controllers', [])

    .controller('AppController', function($scope) {

    })

    .controller('LoginController', function($scope, $ionicPopup, $state, LoginService) {
        $scope.login = function () {
            var login = document.getElementById('login').value.toUpperCase();
            var senha = calcMD5(document.getElementById('senha').value.toUpperCase());

            if(login == '' || senha == ''){
                showAlert('Os campos Login e Senha são obrigatórios.');
                return;
            }else{
                var onSuccess = function (data) {
                    if(data.nome != null && data.nome != ''
                        && data.login != null && data.login != ''
                        && data.idCliente != null && data.idCliente != null){
                        $state.go('app.pedido-list');
                    }else{
                        showAlert('Os dados informados não representa um cliente do nosso sistema.');
                    }
                };

                var onError = function () {
                    showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
                };

                LoginService.login(login, senha)
                    .then(onSuccess, onError);
            }
        }

        showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Validação de Login',
                template: '' + msg
            });
        };
    })

    .controller('PedidoListController', function($scope, $ionicPopup, PedidoService) {
        $scope.pesquisar = function () {
            var data = document.getElementById('data').value;

            if(data == ''){
                showAlert('O campo Data é obrigatório.');
            }else{
                var onSuccess = function (data) {

                    if(data.pedido != null && data.pedido.idPedido != null){

                        $scope.pedido = data.pedido;
                        $scope.listaPedidoProduto = data.listaPedidoProduto;

                    }else{
                        $scope.pedido = null;
                        $scope.listaPedidoProduto = null;
                        showAlert('Não foi realizado nenhum pedido para a data informada.');
                    }
                };

                var onError = function () {
                    showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
                };

                PedidoService.getPedido(data, 5)
                    .then(onSuccess, onError);
            }



        }

        showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Atenção',
                template: '' + msg
            });
        };
    });