(function() {
    'use strict';

    angular
        .module('tkttApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'Principal', 'LoginService', '$state'];

    function HomeController ($scope, Principal, LoginService, $state) {
        var vm = this;

        vm.account = null;
        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        vm.register = register;
        vm.search = search;

        function search(searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            // vm.predicate = '_score';
            // vm.reverse = false;
            vm.currentSearch = searchQuery;
            $state.transitionTo('search', {
                page: vm.page,
                // sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                query: vm.currentSearch
            });
        }

        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }
    }
})();
