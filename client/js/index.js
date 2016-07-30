let app = angular.module('MainApp', ['ngRoute']);
app.controller('MainController', function ($scope, $location) {
    //todo:check user is login
    $scope.nav = 'index'
    $scope.name = 'Public Bookmarks';
    $scope.id = $location.search().id;//todo:save this 2 info in cookie
    $scope.userId = $location.search().userId;
    console.log($scope.userId)
    $scope.logout = function () {
        //todo:logout
        success('logout success!');
    }
});
app.controller('PublicListController', function ($scope, $http) {
    $scope.$parent.nav = 'index';
    $scope.$parent.name = 'Public Bookmarks';
    $scope.page_index = 1;
    function loadData(page_index) {
        $http
            .get('/api/bookmarks/public?page_index=' + page_index)
            .then(function (res) {
                $scope.bookmarks = res.data;
                //change the current only when load data success
                $scope.page_index = page_index;
            }, function (res) {
                alert('public data load failed');
            });
    }
    loadData(1);
    $scope.newer = function () {
        if ($scope.page_index > 1) {
            loadData($scope.page_index - 1);
        }
    }
    $scope.older = function () {
        if ($scope.bookmarks.length == 10) {
            loadData($scope.page_index + 1);
        }
    }
});
app.controller('NewBookmarkController', function ($scope, $rootScope, $window) {
    $scope.$parent.nav = 'new';
    $scope.$parent.name = 'New Bookmark';
    $scope.save = function () {
        let title = $scope.title;
        let link = $scope.link;
        if (!title || !link || !validURL(link)) {
            return alert('please check your input!')
        }
        //todo: use the loopback auth strategy 
        $http({
            url: '/api/bookmarks',
            data: {
                userId: $scope.$parent.userId,
                title: $scope.title,
                link: $scope.link,
                ownerId: $scope.userId,//todo:check ownerId is equal to the userId in access_token
                isPublic: $scope.isPublic
            },
            headers: {
                Authorization: $scope.$parent.id
            }
        }).then(function (res) {
            success('bookmark add success');
            setTimeout(function () {
                $window.location.href = "#/private";
            }, 1000);
        }, function (res) {
            alert('bookmark add failed！')
        });
    }
});
app.controller('EditBookmarkController', function ($scope, $routeParams) {
    $scope.$parent.nav = 'edit';
    $scope.$parent.name = 'Edit Bookmark';
    let bookmarkId = $routeParams.bookmarkId;
    success(bookmarkId);
});
app.controller('PrivateListController', function ($scope) {
    $scope.$parent.nav = 'private';
    $scope.$parent.name = 'Private Bookmarks';
});
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'PublicListController',
            templateUrl: '/template/public-list.html'
        })
        .when('/new', {
            controller: 'NewBookmarkController',
            templateUrl: '/template/bookmark-form.html'
        })
        .when('/edit/:bookmarkId', {
            controller: 'EditBookmarkController',
            templateUrl: '/template/bookmark-form.html'
        })
        .when('/private', {
            controller: 'PrivateListController',
            templateUrl: '/template/private-list.html'
        })
        .otherwise({
            controller: 'PublicListController',
            templateUrl: '/template/public-list.html'
        })
});

/* helper functions  */

function validURL(str) {
    //todo: write the real check code
    return ture;
}