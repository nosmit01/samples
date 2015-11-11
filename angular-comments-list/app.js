angular.module('sample', [])

/***************************************************************************************
 * CONTROLLERS
 ***************************************************************************************/

/**
 * Discussion Controller
 */
    .controller('DiscussionCtrl', function() {
        var vm = this;

        vm.discussion = data;
        console.log(data);

        // add comment
        vm.addComment = function(topic, index){

            if(!!topic.comment) {

                // create new response object
                var newComment = {
                    depth: 0,
                    posttext: topic.comment
                };

                // add new response to end of array
                vm.discussion.topics[index].responses.push(newComment);
            }
            // close button and clear form
            topic.commentBtn = false;
            topic.comment = '';

        };

        // add response
        vm.addResponse = function(response, index, parentIndex){

            if(!!response.reply) {
                // store response indexes
                response.lastReply = response.lastReply ? response.lastReply + 1 : 1;

                // create new index for new response
                var newIndex = response.lastReply + index;

                // create new response object
                var newResponse = {
                    depth: response.depth + 1,
                    posttext: response.reply,
                    author: 'Tyrion Lannister'
                };

                // add new response to array at right position
                vm.discussion.topics[parentIndex].responses.splice(newIndex, 0, newResponse);
            }
                // close button and clear form
                response.replyBtn = false;
                response.reply = '';

        };

        // cancel comment
        vm.cancelComment = function(topic){
            // close button and clear form
            topic.commentBtn = false;
            topic.comment = '';
        };

        // cancel response
        vm.cancelResponse = function(response){
            // close button and clear form
            response.replyBtn = false;
            response.reply = '';
        };
    })

/***************************************************************************************
 * DIRECTIVES
 ***************************************************************************************/

/**
 * Directive:
 * for insetting responses
 */
    .directive('insetList', function($compile) {
        return {
            restrict: 'A',
            scope:{
                depth: '='
            },
            link: function(scope, element, attrs) {
                var inset = scope.depth * 20;
                element.css('margin-left', inset + 'px');
            }
        };
    })

/***************************************************************************************
 * FILTERS
 ***************************************************************************************/

/**
 * Filter:
 * for cleaning html from text
 */
    .filter('clean', function() {
        return function(input) {
            return input.replace(/<\/?[^>]+(>|$)/g, "");
        }
    })

/**
 * Filter:
 * for formatting 'how long ago' using moment.js
 */
    .filter('moment', function() {
        return function(input) {
            return moment().subtract(input, 'seconds').from(new Date());
        }
    });
