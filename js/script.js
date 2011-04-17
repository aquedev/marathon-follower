/* Author: davetayls */
/*jslint onevar:false white:false */
/*global window*/
(function ($) {
		
	var mapDetails,
		newPins = {},
        counter = 0,
        feedUrl = 'http://runfatboyrun.supportsasha.com/get.php?name=Andy3&callback=?',
		manPin,
        currentSpeed,
		$runningMan,
		mostRecentLocation,
		$lastUpdated;
	
	var runCollection = function(locations){
		return $.extend([],runCollection.fn, locations);
	};
	runCollection.fn = {
	    sortByCreated: function (a, b) {
	        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
	    },
		sortLocations: function() {
			this.sort(this.sortByCreated);		
		}
	};
	
	var RunLocation = function(data){
		data.created = Date.parse(data.created);
		$.extend(this,data);
	};
	RunLocation.prototype = {
		id: '',
		lat: '',
		lon: '',
		speed: 0,
		heading: null,
		created: new Date(),
		isKeyPoint: false
	};
	
	var updateLocations = function(locations){
        $(locations).each(function(i){
            var newPin = newPins[this.id];
            if (!newPin){
                window.log(this.lat + ' ' + this.lon + ' speed:' + this.speed);
                if (i === 0){
					mostRecentLocation = this
					
					$lastUpdated.text('Last seen at ' + mostRecentLocation.created);
					if (manPin){
						manPin.moveTo(this.lat, this.lon);
					}else{
                    	manPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTman');
					}
                    $.maps.setCenter('map', this.lat, this.lon);
				}
                if (this.isKeyPoint){
                    newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTsmall');					
                }else{
                    newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTsmall');					
                }
                newPins[this.id] = newPin;
            }
        });		
	};
	var getLocations = function(url, callback){
		$.getJSON(url, function(data, status){
            if (status === 'success'){
                var i =0, run = runCollection([]);
				for (i=0; i < data.locations.length; i += 1){
					run.push(new RunLocation(data.locations[i]));
				}
				run.sortLocations();
				callback.call(data, run);
            }
		});		
	};
    var updatePins = function(url){
		getLocations(url, function(locations){
			updateLocations(locations);
            setInterval(function(){
				updatePins(url);
			},3000);
		});
        counter ++;
    };
    var setRunningManSpeed = function(speed){
        if (typeof speed === 'number' && !isNaN(speed)){
            if (speed < 1){
                setRunningManSpeed('walk');
            }else if (speed > 4){
                setRunningManSpeed('sprint');
            }else{
                setRunningManSpeed('run');
            }
        }else {
            if (currentSpeed === speed){
                return;
            }
            switch (speed){
                case 'walk':
                    $runningMan.attr('src', 'img/walkseq.gif');
                    break;
                case 'sprint':
                    $runningMan.attr('src', 'img/sprintseq.gif');
                    break;
                default:
                    $runningMan.attr('src', 'img/runseq.gif');        
            }
            currentSpeed = speed;
        }
    };

	var replayRun = function(feedUrl){
		getLocations(feedUrl, function(locations){
			var i=0, run = locations, interval;
			interval = setInterval(function(){
				var location = run[i];
				if (location){
					updateLocations([location]);
					i++;					
				}else{
					clearInterval(interval);
				}
			}, 1000);
		});		
	};
    
    
	$(function(){
		
		$runningMan = $('#running-man-img');	
		$('#map').maps({ centerPin: false });
		mapDetails = $.maps.getMapDetails('map');
		$lastUpdated = $('#lastUpdated');

		setTimeout(function(){
			updatePins(feedUrl);			
		}, 1000)
		/*
		setInterval(function(){
			var randomnumber=Math.floor(Math.random()*8)
			setRunningManSpeed(randomnumber);
		}, 2000)*/
        
	});
	
})(window.jQuery);

