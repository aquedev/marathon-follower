/* Author: davetayls

*/
(function($){
	
	$(function(){
		$('#map').maps();
		$.getJSON('AndyExample.json', function(data, status){
			$(data.locations).each(function(){
				console.log(this);
			});
		});
	});
	
})(window.jQuery);























