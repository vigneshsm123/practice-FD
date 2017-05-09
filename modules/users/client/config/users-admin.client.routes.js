(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('adminpanel', {
        url: '/adminpanel',
        // templateUrl: '/modules/users/client/views/admin/admin-panel.client.view.html',
        views: {
            '': { templateUrl: '/modules/users/client/views/admin/admin-panel.client.view.html' },
            'articles@adminpanel': { 
              url: '/approvelist',
              templateUrl: '/modules/articles/client/views/admin/approve-article.client.view.html',
              controller: 'ApproveArticlesAdminListController',
              controllerAs: 'vm',
            },
            'users@adminpanel': { 
              url: '/users',
              templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
              controller: 'UserListController',
              controllerAs: 'vm',
              data: {
                pageTitle: 'Users List'
              }
            }
        },
        controller: 'AdminPanelController',
        controllerAs: 'vm'
      })
      .state('admin.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
