(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('articles.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Dashboard',
      state: 'adminpanel'
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Approve articles',
      state: 'admin.articles.approvelist'
    });
  }
}());
