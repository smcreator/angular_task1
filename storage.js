/**
 * Created by Serik_Zhunussov on 6/4/2015.
 */
app.factory("bookmarksStorage", function($http, $q) {
    return {
        tags: [],
        tagsUrl: "data/tags.json",
        bookmarks: [],
        bookmarksUrl: "data/bookmarks.json",
        // tags api
        tagsList: function() {
            this.tags = angular.fromJson(localStorage.getItem("tags")) || [];

            return this.tags.length > 0 ?
                $q.when(this.tags) :
                $http.get(this.tagsUrl).then(this.persistTags);
        },
        persistTags: function (result) {
            var data = result.data;
            localStorage.setItem("tags", JSON.stringify(data));
            return data;
        },
        clearTags: function () {
            this.tags = [];
            this.persistTags();
        },

        // bookmarks api
        bookmarksList: function(filter) {
            this.bookmarks = angular.fromJson(localStorage.getItem("bookmarks")) || [];
            this.bookmarksFilter = filter;
            var that = this;

            return this.bookmarks.length > 0 ?
                $q.when(this.applyFilter()) :
                $http.get(this.bookmarksUrl).then(function (result) {
                    that.persistBookmarks(result);
                    return that.applyFilter();
                });
        },
        createBookmark: function (item) {
          // TODO: implement
        },
        editBookmark: function (item) {
            // TODO: implement
        },
        deleteBookmark: function (item) {
            // TODO: implement
        },
        applyFilter: function () {
            var that = this;
            return this.bookmarks.filter(function (item) {
                return item.tagId === that.bookmarksFilter.tagId;
            });
        },
        persistBookmarks: function (result) {
            var data = result.data;
            localStorage.setItem("bookmarks", JSON.stringify(data));
            this.bookmarks = data;
        },
        clearBookmarks: function () {
            this.bookmarks = [];
            this.persistBookmarks();
        }
    };
});