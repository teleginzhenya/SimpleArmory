'use strict';

(function() {

    angular
        .module('simpleArmoryApp')
        .controller('AdminMounts', AdminMounts);

    function AdminMounts($scope, AdminService, SettingsService) {
        $scope.settings = SettingsService;

        AdminService.getMountData().then(function(data){
            var categories = [];

            for(var i=0; i<data.length; i++) {
                var cat = data[i];

                categories.push(cat);
            }

            $scope.categories = categories;
        });

        AdminService.getMissingMounts().then(function(data){
            $scope.missing = data;
        });

        var draggedItem;
        $scope.dragStart = function(dragItem) {
            // hide any wowhead tooltips since they get in the way when dragging
            $WowheadPower.hideTooltip();

            draggedItem = dragItem;
        }

        $scope.dragDone = function(dropItem) {
            console.log('dropped from controller: ' + draggedItem.link + " -> " + dropItem.name);
        }
    }
})();