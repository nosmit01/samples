'use strict';

function YouTubeService(AppSettings, GapiService, LocationService, lodash) {

    const service = {};

    // search videos
    service.search = function(search, nextPage) {
        let lat = '';
        let long = '';
        return GapiService.then(function(){ // load google api
            gapi.client.setApiKey(AppSettings.gapiKey);
            return LocationService.getPosition(search); // get user position
        }).then(function(resp) {
            lat = resp.lat;
            long = resp.lng;
            return gapi.client.load('youtube', 'v3'); // load youtube module
        }).then(function () {
            return gapi.client.youtube.search.list({ // search videos
                q: search.keyword,
                part: 'snippet',
                location: lat + ',' + long,
                locationRadius: '100mi',
                type: 'video',
                maxResults: 50,
                pageToken: nextPage
            });
        });
    };

    // get video details
    service.videoDetails = function(id){
        let videoDetails = {};
        return GapiService.then(function(){ // load google api
            gapi.client.setApiKey(AppSettings.gapiKey);
            return gapi.client.load('youtube', 'v3'); // load youtube module
        }).then(function () {
            return gapi.client.youtube.videos.list({ // get video details
                id: id,
                part: 'snippet, player, statistics'
            });
        }).then(function (resp) {
            lodash.assign(videoDetails, {video: resp.result.items[0]});
            return gapi.client.youtube.commentThreads.list({ // get comments
                videoId: id,
                part: 'snippet'
            });
        }).then(function (resp) {
            lodash.assign(videoDetails, {comments: resp.result.items});
            return videoDetails
        });
    };

    return service;
}

export default {
    name: 'YouTubeService',
    fn: YouTubeService
};