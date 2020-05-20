var app=angular.module('delete',[]);

app.controller('deleteCtrl',function($scope,$http){
    $scope.data={};
    $scope.response = "";
    $scope.delete=function()
    {
        $http.delete("http://localhost:3000/api/delete?id="+$scope.data.id).then((response)=>{
            $scope.response = response;
         });
    };
});