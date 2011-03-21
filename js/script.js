/* Author: davetayls

*/
(function($){
	
	var mapDetails,
		newPins = {};
	
	$(function(){
		$('#map').maps({
			centerPin: false
		});
		
		mapDetails = $.maps.getMapDetails('map');
		
		$.getJSON('AndyExample.json', function(data, status){
			$(data.locations).each(function(i){
				var newPin;
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
			});
		});
	});
	
})(window.jQuery);























