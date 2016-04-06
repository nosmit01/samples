/*global angular */

'use strict';

describe('Unit: ListCtrl', function() {

    var ctrl;

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function($controller) {
            ctrl = $controller('ListCtrl');
        });
    });

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    it('should call the YouTubeService.search and return list of videos', inject(function($q, YouTubeService) {
        var deferredSuccess = $q.defer();
        spyOn(YouTubeService, 'search').and.returnValue(deferredSuccess.promise);

        var search = {
            keyword: 'cats',
            location: 'new york',
            useMyLocation: false,
            sort: {id: 'date', label: 'Date'},
            sortItems: [
                {id: 'date', label: 'Date'},
                {id: 'rating', label: 'Rating'},
                {id: 'relevance', label: 'Relevance'}
            ]
        };

        YouTubeService.search(search);

        expect(YouTubeService.search).toHaveBeenCalled();

        deferredSuccess.resolve();
    }));

});