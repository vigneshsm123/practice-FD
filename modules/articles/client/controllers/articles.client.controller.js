(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', '$http','$state', 'articleResolve', 'Authentication', 'Notification'];

  function ArticlesController($scope, $http, $state, article, Authentication, Notification) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.addcomments = addcomments;
    vm.deleteComments = deleteComments;
    $scope.usercomments = [];
     function deleteComments(index) {
       vm.article.comments.splice(index,1);
       save(true);
     }
     // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.list');
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
         // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Comments Updated !' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
      }
    }

    function addcomments(isvalid, msg) {
      if(vm.authentication.user){
        if(isvalid) {
          if(Authentication.user == null || Authentication.user.roles !="admin" && Authentication.user.roles !="user") {
            $state.go('authentication.signin');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Please Signin for add the comments!' });
          }
          if(!vm.article.comments) {
             vm.article.comments = [];
          }
          vm.article.comments.push({content: msg, "user": vm.authentication });
          console.log(vm.article);
          var data = {
            "content" : msg,
            "user" : vm.authentication.user.displayName,
            "article": article
          };
          $scope.usercomments.push({userMessage: msg, "user": vm.authentication});
          console.log(vm.article.comments);
          $scope.msg ='';
            save(true);
          
        }
      }else{
        $state.go('authentication.signin');
        Notification.error({ message: '<i class="fa fa-warning"></i> Please Signin for add the comments!' });
      }
     }

  }
}());
