(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesListController', ArticlesListController);

  ArticlesListController.$inject = ['ArticlesService', 'Authentication'];

  function ArticlesListController(ArticlesService, Authentication) {
    var vm = this;

    vm.articles = ArticlesService.query();
    vm.authentication = Authentication;
    vm.removeHtmlTag = function(content){
      return content.replace(/<[^>]+>/gm, '');
    }
  }
}());
