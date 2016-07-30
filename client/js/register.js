let app = angular.module('RegisterApp',[]);
app.controller('RegisterController',function($scope,$http,$window) {
    $scope.register=function(res) {
        $http.put('/api/Users',{
            email:$scope.email,
            password:$scope.password,
            username:$scope.username
        })
        .then(function(res) {
            console.log(res);
            success('register success!please login~');
            setTimeout(function() {
                $window.location.href='/login.html';
            }, 1000);
        },function(res) {
            console.log(res);
            alert('register failed!');
        })
    }
});

