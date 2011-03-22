/* Author: davetayls

*/
(function($){
	
	var mapDetails,
		newPins = {},
        counter = 0,
        feedUrl = 'AndyExample.json';
	
    var sortByCreated = function(a,b){
        return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
    };
    var updatePins = function(){
		$.getJSON(feedUrl, function(data, status){
            if (status === 'success'){
                var locations = data.locations.sort(sortByCreated);
                console.log({l:locations});
                $(locations).each(function(i){
                    var newPin = newPins[this.id];
                    if (!newPin){
                        console.log(this.lat + ' ' + this.lon);
                        if (i === 0){
                            $.maps.setCenter('map', this.lat, this.lon);
                            newPin = $.maps.placePin('map', this.lat, this.lon, '');
                        }else if (this.isKeyPoint){
                            newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTlarge');					
                        }else{
                            newPin = $.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTsmall');					
                        }
                        newPins[this.id] = newPin;
                    }
                });
                setTimeout(updatePins,3000);
            }
		});
        counter ++;
    };
    
	$(function(){
		$('#map').maps({
			centerPin: false
		});
		
		mapDetails = $.maps.getMapDetails('map');
        updatePins();
        
	});
	
})(window.jQuery);























