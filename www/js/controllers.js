angular.module('starter.controllers', [])
    .controller('PlayerListCtrl', function ($scope, $ionicModal, $interval) {
    $scope.players = [];
    
    //init the modal
    $ionicModal.fromTemplateUrl('modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    
    //function to open the modal
    $scope.openModal = function() {
        $scope.modal.show();
    };
    
    //function to close the modal
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    
    //Clean up the modal when we are done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    //function to add items to the existing list
    $scope.AddPlayer = function (data) {
        $scope.players.push({
            name: data.newPlayer,
            playing: false,
            gameTime: 0.0
        });
        data.newPlayer = '';
        $scope.closeModal();
    };
    
    $scope.durationFor = function (input) {
        function z(n) { return (n < 10 ? '0' : '') + n; }
        var seconds = input % 60;
        var minutes = Math.floor(input % 3600 / 60);
        return (z(minutes) + ':' + z(seconds));
    };
    
    $scope.elapsedTime = 0; 

    $scope.playerToAdd = '';

    $scope.paused = true;

    var stop;

    $scope.play = function () {
        if (angular.isDefined(stop)) return;

        stop = $interval(function () {
            $scope.elapsedTime++;
        }, 1000);
    };
    

    $scope.pauseGame = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };
    
    $scope.resetGame = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
        $scope.elapsedTime = 0;
    }

    $scope.$watch('elapsedTime', function (nv, ov) {
        if (nv == 0) {
            for (var i = 0, len = $scope.players.length; i < len; ++i) {
                $scope.players[i].gameTime = 0;
            }
        }
        else if (nv != "") {
            var diff = parseInt(nv) - parseInt(ov);

            for (var i = 0, len = $scope.players.length; i < len; ++i) {
                if ($scope.players[i].playing) {
                    $scope.players[i].gameTime += diff;
                }
            }
        }
    }); 

 

});