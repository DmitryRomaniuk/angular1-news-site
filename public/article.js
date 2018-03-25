angular.module('articleApp', ['ui.router', 'ngResource'])
  .controller('ArticleListController', [ '$scope', '$state', '$resource', '$stateParams', 'articlesService', function(
    $scope,
    $state,
    $resource,
    $stateParams,
    articlesService
  ) {
    $scope.$watch(function () { return articlesService.articles }, function (newVal, oldVal) {
      if (typeof newVal !== 'undefined') {
        $scope.articles = articlesService.articles;
        $scope.articleTitleText = getTextArticle();
        $scope.articleDescription = getDescriptionArticle();
      }
    });
    $scope.days = 1e100;
    $scope.articleDescription = getTextArticle();
    $scope.articlesPerPage = 5;
    $scope.pages = Math.ceil(($scope.articles&&$scope.articles.length||0)/$scope.articlesPerPage);
    $scope.page = +$stateParams.page || 1;

    $scope.articleTitleTextLength = function () {
      return $scope.articleTitleText && $scope.articleTitleText.length > 20;
    };

    $scope.changePage = function (page) {
      var pages = Math.ceil(($scope.articles.length)/$scope.articlesPerPage);
      if (page < 1 || page > pages) return;
      $scope.page = page;
      $state.go('.',{page:page});
    };

    function getTextArticle() {
      if (!articlesService.articles) return;
      var article = articlesService.articles.filter(el => el.date.toString() === $stateParams.articleId)
      return article.length ? article[0].title : '';
    }

    function getDescriptionArticle() {
      if (!articlesService.articles) return;
      var article = articlesService.articles.filter(el => el.date.toString() === $stateParams.articleId)
      return article.length ? article[0].description : '';
    }

    $scope.editArticle = function (index) {
      console.log(index);
      $scope.articleTitleText = $scope.articles[index].title;
      $state.go('edit', {articleId: $scope.articles[index].date})
    };

    $scope.addArticle = function() {
      $scope.validationError = $scope.articleTitleText.length > 20;
      if ($scope.validationError) return;
      var editIndex = articlesService.articles.reduce(function(acc, elem, index) {
        return (elem.date.toString() === $stateParams.articleId) ? index : acc;
      },-1);
      if (editIndex >= 0) {
        articlesService.articles[editIndex].title = $scope.articleTitleText;
        articlesService.articles[editIndex].description = $scope.articleDescription;
      } else {
        articlesService.articles.unshift({
          title: $scope.articleTitleText,
          description: $scope.articleDescription,
          date: Date.now()
        });
      }
      $scope.articleTitleText = '';
      $scope.articleDescription = '';
      $state.go('main');
    };
  }])
  .service('articlesService', ['$resource', function($resource) {
    var self = this;
    var Articles = $resource('/list-articles.json');
    Articles.get({a:'a'})
        .$promise.then(function(response) {
          self.articles = response.articles;
        })
        .catch(err => console.log(err));
   }])
  .directive('main', function() {
    return {
      template: `
      <h2>News List</h2>
      <ul class="pagination">
        <li ng-click="changePage(page-2)">{{page<3? "&nbsp;&nbsp;": page-2}}</li>
        <li ng-click="changePage(page-1)">{{page<2? "&nbsp;&nbsp;": page-1}}</li>
        <li ng-click="changePage(page)">{{page}}</li>
        <li ng-click="changePage(page+1)">
          {{page+1>articles.length/articlesPerPage? "": page+1}}
        </li>
        <li ng-click="changePage(page+2)">
          {{page+2>articles.length/articlesPerPage? "": page+2}}
        </li>
      </ul>
      <ul>
        <li ng-repeat="article in articles | paginationFilter: page: articlesPerPage">
          <div ng-click="editArticle($index+(page-1)*articlesPerPage)">
            <strong>{{article.title}}</strong>
          </div>
          <div ng-click="editArticle($index+(page-1)*articlesPerPage)">
            {{article.description}}
          </div>
          <br/>
        </li>
      </ul>
  `
    };
  })
  .filter('paginationFilter', function() {
    return function(input, page, articlesPerPage) {
      if (!!input) return input.slice((page-1)*articlesPerPage,page*articlesPerPage);
    };
  })
  .directive('add', function() {
    return {
      template: `
      <form name="myForm"
        class="addForm"
        ng-submit="addArticle()">
        <input type="text" ng-model="articleTitleText" name="input" size="30"
          ng-class="{'red': articleTitleTextLength()}"
          placeholder="add title here">
        <textarea rows="10" cols="30" name="description"
          ng-model="articleDescription" placeholder="add description here"></textarea>
        <input class="btn-primary" type="submit" value="add/change">
        <span class="error" ng-show="articleTitleText.length > 20">Title length should be less 20!</span><br>
      </form>`
    };
  })
  .config(function($stateProvider,$locationProvider) {
    var mainState = {
      name: 'main',
      url: '/?{page}',
      template: '<main></main>',
      controller: 'ArticleListController'
    }

    var addState = {
      name: 'add',
      url: '/article/add',
      template: '<add></add>',
      controller: 'ArticleListController'
    }

    var editState = {
      name: 'edit',
      url: '/article/{articleId}/edit',
      template: '<add></add>',
      controller: 'ArticleListController'
    }

    $stateProvider.state(mainState);
    $stateProvider.state(addState);
    $stateProvider.state(editState);
    $locationProvider.html5Mode(true);
  });
