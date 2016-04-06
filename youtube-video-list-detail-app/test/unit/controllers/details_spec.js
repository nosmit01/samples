/*global angular */

'use strict';

describe('Unit: DetailsCtrl', function() {

    var ctrl;

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(function($controller) {
            ctrl = $controller('DetailsCtrl');
        });
    });

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    it('should call the YouTubeService and return video details', inject(function($q, YouTubeService) {
        var deferredSuccess = $q.defer();
        spyOn(YouTubeService, 'videoDetails').and.returnValue(deferredSuccess.promise);

        YouTubeService.videoDetails('y2ChOvGvtQo');

        expect(YouTubeService.videoDetails).toHaveBeenCalled();

        deferredSuccess.resolve();
    }));

});