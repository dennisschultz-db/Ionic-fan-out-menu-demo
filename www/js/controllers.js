angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
    
            /**
             * Builds a fan of menu items.
             * 
             * @param fanItems - An array of items, each object including the image and action for the 
             *        given menu item.
             *       [
             *          {
             *              src: "path-to-image-file",
             *              action: "scope variable function"
             *          },
             *          ...
             *       ]
             * @param direction - Direction in which the center of the fan should eminate from the
             *        center of the container object (in degrees):
             *             0 degrees - right
             *            90 degrees - down
             *           180 degrees - left
             *           270 degrees - up
             * @param spread - Arc across which the icons should be dispersed, in degrees
             * @param distance - Distance from the center of the container object to the upper-left
             *        corner of the icons (in pixels).
             */
        var buildFan = function (fanItems, direction, spread, distance) {
            var myFanItems = fanItems;
            
            // Compute the angle between icons in the menu
            var startAngle = direction - spread / 2;
            var endAngle = direction + spread / 2;
            var increment = Math.abs((startAngle - endAngle) / (fanItems.length - 1));

            // Compute the X and Y locations of each icon and
            // add to the array that will be returned.
            for (var i = 0; i < fanItems.length; i++) {
                var angle;
                if (startAngle < endAngle) {
                    angle = startAngle + i * increment
                } else {
                    angle = startAngle - i * increment
                }
                var x = distance * Math.cos(angle * Math.PI / 180);
                var y = distance * Math.sin(angle * Math.PI / 180);

                myFanItems[i].left = x + 'px';
                myFanItems[i].top = y + 'px';
            }

            return myFanItems;
        };

        var fanItems = [
            {
                src: "https://www.facebookbrand.com/img/fb-art.jpg",
                action: "postFacebook()",
            },
            {
                src: "https://i1.wp.com/dennisschultz.files.wordpress.com/2016/03/instagram_icon_large.png?ssl=1&w=450",
                action: "postInstagram()",
            },
            {
                src: "https://winsomekaty.files.wordpress.com/2015/04/official-pinterest-logo-tile-300x300.png",
                action: "postPinterest()",
            },
            {
                src: "https://g.twimg.com/Twitter_logo_blue.png",
                action: "postTwitter()",
            }
        ];

        $scope.showMenu = false;
        $scope.socialFanButtons = buildFan(fanItems, 45, 90, 65);
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
