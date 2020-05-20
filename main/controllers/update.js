var app=angular.module('update',[]);

app.controller('updateCtrl',function($scope,$http){
    $scope.data={};
    $scope.response = {};
    $scope.item={};
    $scope.selected=-1;
    $scope.list=[];
    $scope.copy={};

    $scope.view=function()
    {
       $http.get('http://localhost:3000/api/view?id='+$scope.data.id).then(function (response) {
           $scope.response = response;
           $scope.copy=response;
           $scope.list=response.data[0].list;
      });
    };
    $scope.getTemplate=function(index)
    {
       if(index==$scope.selected)
       return "edit";
       else
       return "display";
    };
    $scope.edit=function(index)
    {
       $scope.selected=index;   
    };
    $scope.reset=function()
    {
       $scope.selected=-1;
    };
    $scope.addRow=function()
    {
       $scope.list.push({"name":$scope.item.name,"date":$scope.item.date,"dept":$scope.item.dept,"cgpa":$scope.item.cgpa});  
       $scope.item.name="";
       $scope.item.date="";
       $scope.item.dept="";
       $scope.item.cgpa="";
    };
    $scope.removeRow=function(index)
    {
       $scope.list.splice(index,1);
    };
    $scope.editRow=function()
    {
      $scope.list[$scope.selected]={"name":$scope.item.name,"date":$scope.item.date,"dept":$scope.item.dept,"cgpa":$scope.item.cgpa};
      
    };
    $scope.update=function()
    {
       $scope.data.list=$scope.list;
       $http.put('http://localhost:3000/api/update',JSON.stringify($scope.data)).then((response)=>{
           $scope.response=response;
       });
    };
});