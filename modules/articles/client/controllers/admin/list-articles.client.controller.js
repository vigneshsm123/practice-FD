﻿(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminListController', ArticlesAdminListController);

  ArticlesAdminListController.$inject = ['ArticlesService'];

  function ArticlesAdminListController(ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());

(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ApproveArticlesAdminListController', ApproveArticlesAdminListController);

  ApproveArticlesAdminListController.$inject = ['ArticlesService', '$filter'];

  function ApproveArticlesAdminListController(ArticlesService, $filter) {
    var vm = this;

    vm.articles = ArticlesService.query();
    
    vm.removeHtmlTag = function(content){
      return content.replace(/<[^>]+>/gm, '');
    }
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    ArticlesService.query(function (data) {
      vm.articles = data;
      vm.buildPager();
    });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 5;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.articles, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());