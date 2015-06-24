/**
 * Created by Serik_Zhunussov on 6/4/2015.
 */
var app = angular.module('app', []);
app.directive("tagsList", function (bookmarksStorage) {
    return {
        restrict: 'E',
        templateUrl: "tags-list.html",
        controller: function ($scope, bookmarksStorage) {
            //tagsStorage.clearTags();
            bookmarksStorage.tagsList().then(function (result) {
                $scope.tags = result;
                if ($scope.tags.length > 0) {
                    $scope.currentTag = $scope.tags[0];
                }
            });

            $scope.setTag = function(tag) {
                $scope.currentTag = tag;
            }
        }
    }
});
app.directive("bookmarksList", function (bookmarksStorage) {
    return {
        restrict: 'E',
        templateUrl: "bookmarks-list.html",
        controller: function ($scope, bookmarksStorage) {
            $scope.load = function () {
                bookmarksStorage.bookmarksList({ tagId: $scope.currentTag.id }).then(function(result) {
                    $scope.bookmarks = result;
                });
            };

            $scope.$watch("currentTag", function (tag) {
                if (tag)
                    $scope.load();
            });

            $scope.createBookmark = function () {
                $scope.state = "create";
                $scope.bookmark = {};
            };
            $scope.editBookmark = function (item) {
                $scope.state = "edit";
                $scope.bookmark = item;
            };
            $scope.deleteBookmark = function (item) {
                $scope.state = "";
                bookmarksStorage.deleteBookmark($scope.bookmark);
            };

            //tagsStorage.clearBookmarks();
        }
    }
});
app.directive("bookmarksCreate", function (bookmarksStorage) {
    return {
        restrict: 'E',
        templateUrl: "bookmarks-create.html",
        controller: function ($scope, bookmarksStorage) {
            $scope.submit = function () {
                $scope.state = "";
                bookmarksStorage.createBookmark($scope.bookmark);
            };
            $scope.cancel = function () {
                $scope.state = "";
            };
        }
    }
});
app.directive("bookmarksEdit", function (bookmarksStorage) {
    return {
        restrict: 'E',
        templateUrl: "bookmarks-edit.html",
        controller: function ($scope, bookmarksStorage) {
            $scope.submit = function () {
                $scope.state = "";
                bookmarksStorage.editBookmark($scope.bookmark);
            };
            $scope.cancel = function () {
                $scope.state = "";
            };
        }
    }
});