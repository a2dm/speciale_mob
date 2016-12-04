angular.module('starter.controllers', [])

    .controller('AppController', function($scope) {
        
    })

    .controller('LoginController', function($scope, $ionicPopup, $state, LoginService) {
        $scope.login = function () {
            var login = document.getElementById('login').value.toUpperCase();
            var senha = calcMD5(document.getElementById('senha').value.toUpperCase());

            if (login == '' || senha == '') {
                showAlert('Os campos Login e Senha são obrigatórios.');
                return;
            } else {
                var onSuccess = function (data) {
                    if(data.nome != null && data.nome != ''
                        && data.login != null && data.login != ''
                        && data.idCliente != null && data.idCliente != null) {
                        localStorage.setItem("idClienteLogado", data.idCliente);
                        localStorage.setItem("idUsuarioLogado", data.idUsuario);
                        $state.go('app.pedido-list');
                    } else {
                        showAlert('Os dados informados não representa um cliente do nosso sistema.');
                    }
                };

                var onError = function () {
                    showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
                };

                LoginService.login(login, senha).then(onSuccess, onError);
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
        $scope.pesquisar = function() {
            var data = document.getElementById('data').value;

            if (data == '') {
                showAlert('O campo Data do Pedido é obrigatório.');
            } else {
                var onSuccess = function(data) {

                    if (data.pedido != null && data.pedido.idPedido != null) {
                        $scope.pedido = data.pedido;
                        $scope.listaPedidoProduto = data.listaPedidoProduto;

                    } else {
                        $scope.pedido = null;
                        $scope.listaPedidoProduto = null;
                        showAlert('Não existe nenhum pedido realizado para esta data.');
                    }
                };

                var onError = function() {
                    showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
                };

                PedidoService.getPedido(data, localStorage.getItem("idClienteLogado")).then(onSuccess, onError);
            }
        }

        showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Atenção',
                template: '' + msg
            });
        };
    })

    .controller('PedidoCadController', function($scope, $ionicPopup, $state, PedidoService) {
        $scope.init = function() {
            var onSuccess = function(data) {
                $scope.listaProdutosAdicionados = [];
                localStorage.setItem("listaProdutoCliente", data);
                if (data != null) {
                    $scope.listaProdutoCliente = data;
                } else {
                    $scope.listaProdutoCliente = null;
                    showAlert('Não existe produto cadastrado para o cliente.');
                }
            };

            var onError = function() {
                showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
            };

            PedidoService.getListaProdutoByCliente(localStorage.getItem("idClienteLogado")).then(onSuccess, onError);
        },

         $scope.adicionarProdutoPedido = function() {
            
            if (this.produtoSelecionado == null) {
                showAlert('O campo Produto é obrigatório.');
                return;
            }

            if (this.qtdSolicitada == null || parseInt(this.qtdSolicitada) <= 0) {
                showAlert('O campo Quantidade é obrigatório.');
                return;
            }

            idProdutoSelecionado = this.produtoSelecionado.idProduto;
            achouProdutoLista = false;

            

            if (!achouProdutoLista) {
                this.listaProdutosAdicionados.push({
                    idProduto: idProdutoSelecionado,
                    desProduto: this.produtoSelecionado.desProduto,
                    qtdSolicitada: this.qtdSolicitada
                });
                this.produtoSelecionado = null;
                this.qtdSolicitada = null;
            }
        },

        $scope.excluirProdutoPedido = function(index) {
            this.listaProdutosAdicionados = this.listaProdutosAdicionados.splice(index, 1);
        },

        $scope.cadastrar = function() {
            if (this.data == null || this.data == '') {
                showAlert('O campo Data é obrigatório.');
                return;
            }

            if (this.listaProdutosAdicionados == null || this.listaProdutosAdicionados.length <= 0) {
                showAlert('Pelo menos um produto deve ser adicionado ao pedido.');
                return;
            }

            var onSuccess = function(data) {
               showAlert('Registro inserido com sucesso. Protocolo do Pedido: ' + data); 
               $state.go('app.pedido-list');
            };

            var onError = function() {
                showAlert('Não foi possível se comunicar com nossos servidores. Verifique sua conexão ou tente novamente.');
            };

            PedidoService.cadastrar(localStorage.getItem("idClienteLogado"),
                                    localStorage.getItem("idUsuarioLogado"),
                                    this.data, 
                                    this.observacao, 
                                    this.listaProdutosAdicionados).then(onSuccess, onError);
        };

        showAlert = function(msg) {
            var alertPopup = $ionicPopup.alert({
                title: 'Atenção',
                template: '' + msg
            });
        };
    });