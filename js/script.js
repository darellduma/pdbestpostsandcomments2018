let app = angular.module('pdComments',[]);

app.controller('commentsController',($scope,$http,$log,$sce)=>{
    $http.get('data/pdcomments.json').then(response=>{
        $scope.comments = response.data;
        $scope.index = Math.floor(Math.random()*$scope.comments.length);
        $scope.count = $scope.index+1;
        $scope.comment = $scope.comments[$scope.index];
        $scope.getRandomIndex = function(){
            return Math.floor(Math.random()*$scope.comments.length);
        }
        $scope.getRandomComment = function(){
            $scope.index = $scope.getRandomIndex();
            $scope.validateIndex();
            $scope.comment = $scope.comments[$scope.index];
            $scope.count = $scope.index+1;
        }
        $scope.decreaseIndex = function(){
            $scope.index--;
            $scope.validateIndex();
            $scope.comment = $scope.comments[$scope.index];
            $scope.count = $scope.index+1;
        };
        $scope.increaseIndex = function(){
            $scope.index++;
            $scope.validateIndex();
            $scope.comment = $scope.comments[$scope.index];
            $scope.count = $scope.index+1;
        };
        $scope.changeComment = function(){
            $scope.index = document.querySelector("#txtindex").value-1;
            $scope.validateIndex();
            $log.info($scope.index);
            $scope.comment = $scope.comments[$scope.index];
        }
        $scope.validateIndex = function(){
            if($scope.index<0){
                $scope.index = 0;
                $scope.count = 1;
            } else if($scope.index >= $scope.comments.length){
                $log.info($scope.count);
                $scope.index = $scope.comments.length-1;
                $scope.count = $scope.index+1;
            }
        }

        $scope.copyToClipboard = function(){
            let clipboard = document.getSelection().getRangeAt(0);
            clipboard.selectNode(document.getElementById("clipboard"));
            window.getSelection().addRange(clipboard);
            document.execCommand("copy");
        }
    });
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });