let app = angular.module('LoginApp',[]);
app.controller('LoginController',function($scope,$http,$window) {
    $scope.login=function() {
        $http.post('/api/Accounts/login',{email:$scope.email,password:$scope.password})
        .then(function(res) {
            console.log(res);
            success('Login success！');
            setTimeout(function() {
                $window.location.href="/#/?userId="+res.data.userId+"&id="+res.data.id;
            }, 1000);
        },function(res) {
            console.log(res);
            alert('Login failed！');
        });
    }
});