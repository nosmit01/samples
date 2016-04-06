'use strict';

function ListCtrl($localStorage, StorageService, YouTubeService, lodash) {
    'ngInject';

    let nextPage = null;
    let uiState = StorageService.getState();

    // ViewModel
    const vm = this;
    vm.loading = false;
    vm.favorites = $localStorage.favorites || [];

    if(uiState){ // if page hasn't been refreshed, then get ui state
        vm.tab = uiState.tab;
        vm.videoList = uiState.videoList;
        vm.search = uiState.search;
    }else{
        vm.tab = {
            search: true,
            favorites: false
        };
        vm.videoList = [];
        vm.search = {
            keyword: '',
            location: '',
            useMyLocation: true,
            sort: {id: 'date', label: 'Date'},
            sortItems: [
                {id: 'date', label: 'Date'},
                {id: 'rating', label: 'Rating'},
                {id: 'relevance', label: 'Relevance'}
            ]
        };
    }

    vm.searchVideos = function (newSearch) {
        vm.loading = true;
        YouTubeService.search(vm.search, nextPage).then(function (resp) {
            nextPage = resp.result.nextPageToken; // set next page token

            lodash.each(resp.result.items, function(video){ // check to see if a fav video
                let index = lodash.findIndex(vm.favorites, function(fav){
                    return fav.id.videoId === video.id.videoId
                });

                if(index !== -1){
                    video.favorite = true;
                }
            });

            // if new search, then clear videolist, else join
            vm.videoList = newSearch ? resp.result.items : lodash.union(vm.videoList, resp.result.items);
            StorageService.saveState(vm); // save ui state
            vm.loading = false;

        }, function (error) {
            console.log('Failed: ' + error);
            vm.loading = false;
        });
    };

    vm.toggleFavorites = function(video){
        let match = lodash.find(vm.favorites, function(fav){ // find in favs
            return fav.id.videoId === video.id.videoId
        });

        if(match){ // if exits in favs, then remove
            lodash.remove(vm.favorites, function(fav){
                return fav.id.videoId === video.id.videoId
            });
        }else{ // or add
            vm.favorites.push(video)
        }

        $localStorage.favorites = vm.favorites; // update localstorage
        StorageService.saveState(vm); // save ui state
    };
}

export default {
    name: 'ListCtrl',
    fn: ListCtrl
};