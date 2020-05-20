var app=angular.module('view',[]);

app.controller('viewCtrl',function($scope,$http){
    $scope.data={}
    $scope.response = {}
    $scope.viewAll=function()
    {
       $http.get('http://localhost:3000/api/view').then(function (response) {
           $scope.response = response;
      });
    };
    $scope.viewId=function()
    {
       $http.get('http://localhost:3000/api/view?id='+$scope.data.id).then(function (response) {
           $scope.response = response;
      });
    };
   
   
});