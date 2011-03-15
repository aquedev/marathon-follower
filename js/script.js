/* Author: davetayls

*/
(function($){
	
	$(function(){
		$('#map').maps({
			centerPin: false
		});
		$.getJSON('AndyExample.json', function(data, status){
			$(data.locations).each(function(i){
				console.log(this.lat + ' ' + this.lon);
				if (i === 0){
					$.maps.setCenter('map', this.lat, this.lon);
					$.maps.placePin('map', this.lat, this.lon, '');
				}else if (this.isKeyPoint){
					$.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTlarge');					
				}else{
					$.maps.placePin('map', this.lat, this.lon, 'cp-map-pinTsmall');					
				}
			});
		});
	});
	
})(window.jQuery);























