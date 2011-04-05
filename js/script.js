/* Author: davetayls

*/
(function($){
	
	var mapDetails,
		newPins = {},
        counter = 0,
        feedUrl = 'http://runfatboyrun.supportsasha.com/get.php?name=Andy3&date=2011-04-03&callback=?',
		manPin,
		$runningMan;
	
    var sortByCreated = function(a,b){
        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
    };
	var updateLocations = function(locations){
        $(locations).each(function(i){
            var newPin = newPins[this.id];
            if (!newPin){
                console.log(this.lat + ' ' + this.lon);
                if (i === 0){
					if (manPin){
						manPin.moveTo(this.lat, this.lon);
						$runningMan.attr('src', 'img/runseq.gif')
						//$runningMan.attr('src', 'img/sprintseq.gif')
					}else{
                    	manPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTman');
					}
                    $.maps.setCenter('map', this.lat, this.lon);
				}
                if (this.isKeyPoint){
                    newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTlarge');					
                }else{
                    newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTsmall');					
                }
                newPins[this.id] = newPin;
            }
        });		
	};
	var getLocations = function(url, callback){
		$.getJSON(feedUrl, function(data, status){
            if (status === 'success'){
                var locations = data.locations.sort(sortByCreated);
				callback.call(data, locations);
            }
		});		
	};
    var updatePins = function(){
		$.getJSON(feedUrl, function(data, status){
            if (status === 'success'){
                var locations = data.locations.sort(sortByCreated);
				updateLocations(locations);
                //setTimeout(updatePins,3000);
            }
		});
        counter ++;
    };
    
	$(function(){
		
		$runningMan = $('#running-man-img');
		
		$('#map').maps({ centerPin: false });
		
		mapDetails = $.maps.getMapDetails('map');

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
			}, 1000)
		});
        
	});
	
})(window.jQuery);























