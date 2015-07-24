/**
 * Created by ronfe on 15-7-20.
 */
angular.module('myApp',
    [
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "uk.ac.soton.ecs.videogular.plugins.cuepoints"
    ]
)
    .controller('HomeCtrl', [
        '$sce',
        function ($sce) {
            this.API = null;
            this.onPlayerReady = function(API){
                this.API = API;
            };
            this.init = function init(){
                var timePoint = [];
                var cuePList = [];
                var controller = this;
                //add vi time to cue points
                _.forEach(hv.vi, function(unitVi){
                    var revertTime = unitVi.time / 1000;
                    var start = revertTime;
                    cuePList.push({
                        time: revertTime
                    });
                    var end = revertTime;

                    var result = {};
                    result.timeLapse = {
                        start: start,
                        end: end
                    };
                    result.onLeave = function onLeave(currentTime, timeLapse, params) {
                        console.log('onleave');
                    };
                    result.onUpdate = function onUpdate(currentTime, timeLapse, params) {
                        console.log('update');
                    };
                    result.onComplete = function onComplete(currentTime, timeLapse, params) {
                        console.log('complete');
                        if (params.here === false){
                            params.here = true;
                            controller.API.pause();
                            controller.API.seekTime(timeLapse.start);
                        }
                    };
                    result.params = {
                        here: false,
                        choices: unitVi.choices,
                    };

                    timePoint.push(result);
                });

                //add wi time to cue points
                var wi = {};
                wi.timeLapse = {
                    start: hv.wi.time / 1000,
                    end: hv.wi.time / 1000
                };
                wi.onLeave = function onLeave(currentTime, timeLapse, params) {
                    console.log('onleave');
                };
                wi.onUpdate = function onUpdate(currentTime, timeLapse, params) {
                    console.log('update');
                };
                wi.onComplete = function onComplete(currentTime, timeLapse, params) {
                    console.log('wi complete');
                    //controller.API.pause();
                    if (params.wiHere === false){
                        params.wiHere = true;
                        controller.API.pause();
                        controller.API.seekTime(timeLapse.start);
                    }
                };
                wi.params = {
                    type: 'wi',
                    //add here attribute in case vi layer showed
                    here: false,
                    wiHere: false,
                    problems: hv.wi.problems
                };
                timePoint.push(wi);
                cuePList.push({
                    time: wi.timeLapse.start
                });

                this.jump = function(selectedChoice){
                    if (selectedChoice.jump !== undefined){
                        var jumpTime = selectedChoice.jump / 1000;
                        controller.API.seekTime(jumpTime);
                        controller.config.finishedHyperIndex += 1;
                        controller.API.play();
                    }
                    else {
                        controller.config.finishedHyperIndex += 1;
                        controller.API.play();
                    }
                };

                this.wiJump = function(){
                    controller.config.cuePoints.timePoint[controller.config.finishedHyperIndex].params.wiHere = false;
                    controller.API.play()
                };


                this.config = {
                    preload: "none",
                    sources: [
                        {src: $sce.trustAsResourceUrl(hv.url), type: "video/mp4"}
                    ],
                    theme: {
                        url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                    },
                    cuePoints: {
                        timePoint: timePoint
                    },
                    finishedHyperIndex: 0,
                    plugins: {
                        controls: {
                            autoHide: true,
                            autoHideTime: 5000
                        },
                        cuepoints: {
                            theme: {
                                url: "cuepoints.css"
                            },
                            points: cuePList

                        }
                    }
                };
            };
            this.init();
        }]
);