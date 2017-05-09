(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminController', ArticlesAdminController);

  ArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', 'Notification'];

  function ArticlesAdminController($scope, $state, $window, article, Authentication, Notification) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.article.categoriesItem = ["salesforce", "UI Team", "General"];
    vm.categories = categories;
    vm.x1 = true;

    // add categories
    function categories(cate, flag) {
      if(!vm.article.categories) {
        vm.article.categories =[];
      }
      if(flag) {
        vm.article.categories.push(cate);
      }
      else {
        if(vm.article.categories.indexOf(cate) != -1) {
          vm.article.categories.splice(vm.article.categories.indexOf(cate),1);
        }
      }
          
    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('articles.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('articles.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());


(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ApproveArticlesAdminController', ApproveArticlesAdminController);

  ApproveArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', 'Notification'];

  function ApproveArticlesAdminController($scope, $state, $window, article, Authentication, Notification) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.article.categoriesItem = ["salesforce", "UI Team", "General"];
    vm.categories = categories;
    vm.x1 = true;
    // add categories
    function categories(cate, flag) {
      if(!vm.article.categories) {
        vm.article.categories =[];
      }
      if(flag) {
        vm.article.categories.push(cate);
      }
      else {
        if(vm.article.categories.indexOf(cate) != -1) {
          vm.article.categories.splice(vm.article.categories.indexOf(cate),1);
        }
      }
          
    }
    vm.removeHtmlTag = function(content){
      return content.replace(/<[^>]+>/gm, '');
    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.approvelist');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article deleted successfully!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.approvelist'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }
  }
}());