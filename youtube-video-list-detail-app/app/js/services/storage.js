'use strict';

function StorageService() {

    const service = {};
    let viewModel = '';

    service.saveState = function(vm){
        viewModel = vm;
    };

    service.getState = function(){
        return viewModel;
    };

    return service;
}

export default {
    name: 'StorageService',
    fn: StorageService
};