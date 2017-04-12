(function() {
    'use strict';

    angular
        .module('tkttApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$state', 'Post', 'PostSearch', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams'];

    function SearchController ($state, Post, PostSearch, ParseLinks, AlertService, paginationConstants, pagingParams) {
        var vm = this;

        vm.loadPage = loadPage;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;

        loadAll();

        function loadAll () {
            if (pagingParams.search) {
                PostSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                }, onSuccess, onError);
            } else {
                Post.query({
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                }, onSuccess, onError);
            }

            // function sort() {
            //     var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
            //     if (vm.predicate !== 'id') {
            //         result.push('id');
            //     }
            //     return result;
            // }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.posts = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                // sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                query: vm.currentSearch
            });
        }

        function search(searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            // vm.predicate = '_score';
            // vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear() {
            vm.links = null;
            vm.page = 1;
            // vm.predicate = 'id';
            // vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }
    }
})();
