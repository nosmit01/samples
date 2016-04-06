'use strict';

function DetailsCtrl($stateParams, $sce, YouTubeService) {
    'ngInject';

    // ViewModel
    const vm = this;
    vm.loading = true;
    vm.videoDetails = {};
    vm.player = '';

    // get video details
    YouTubeService.videoDetails($stateParams.id).then(function(resp){
        vm.videoDetails = resp;
        vm.player = $sce.trustAsHtml(resp.video.player.embedHtml); // ng-bind-html removes iframe. Using $sce.
        vm.loading = false;
    });
}

export default {
    name: 'DetailsCtrl',
    fn: DetailsCtrl
};