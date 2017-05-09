(function () {
  'use strict';

  angular
    .module('articles.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('articles', {
        abstract: true,
        url: '/articles',
        template: '<ui-view/>'
      })
      .state('articles.list', {
        url: '',
        templateUrl: '/modules/articles/client/views/list-articles.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Articles List'
        }
      })
      // .state('admin.articles.list', {
      //   url: '',
      //   templateUrl: '/modules/articles/client/views/admin/list-articles.client.view.html',
      //   controller: 'ArticlesAdminListController',
      //   controllerAs: 'vm',
      //   data: {
      //     roles: ['admin', 'user']
      //   }
      // })

      .state('admin.articles.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/articles/client/views/admin/form-article.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin','user']
        },
        resolve: {
          articleResolve: getArticle
        }
      })
      .state('articles.view', {
        url: '/:articleId',
        templateUrl: '/modules/articles/client/views/view-article.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
