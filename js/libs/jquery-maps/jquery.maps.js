/*
* jQuery Maps v1 - http://the-taylors.org
*
* Open source under the BSD License. 
* 
* Copyright © 2011 Dave Taylor http://the-taylors.org
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
* Redistributions of source code must retain the above copyright notice, this list of 
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list 
* of conditions and the following disclaimer in the documentation and/or other materials 
* provided with the distribution.
* 
* Neither the name of the author nor the names of contributors may be used to endorse 
* or promote products derived from this software without specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
* OF THE POSSIBILITY OF SUCH DAMAGE. 
*
*/
/*global window */
/*jslint forin:true */
(function ($, google) {
    //var mapHolder;
    var maps = {};
    var maxNumberedPin = 100;

    var placeIcon = function (map, latlng, cssClass) {
        var genericIcon = new $.maps.v3pin(map, latlng, cssClass);
        return genericIcon;
    };

    var buildMap = function (mapElement, centerLatLng, zoom) {
        var map = new google.maps.Map(mapElement, {
            zoom: zoom,
            center: centerLatLng,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        return map;
    };

    var getGeoMicroFormatValues = function (geo) {
        var geo$ = $(geo);
        var values = {};
        values.lat = geo$.find(">.latitude").text();
        values.lng = geo$.find(">.longitude").text();
        values.zoom = parseInt(geo$.find(">.zoom").text(), 10);
        values.latlng = new google.maps.LatLng(values.lat, values.lng);
        return values;
    };

    var attachExternalInteractions = function () {
        $('body').delegate("a[href^='#']", 'click', function (ev) {
            var this$ = $(this);
            var pinID = this$.attr('href').replace('#', '');
            for (var mapKey in maps) {
                var map = maps[mapKey];
                var pinDetails = map.pins[pinID];
                if (pinDetails) {
                    pinDetails.pin.centerOnMap();
                    if (pinDetails.pin.showInfoWindow) {
                        pinDetails.pin.showInfoWindow();
                    }
                    return false;
                }
            }
        });
    };

    $.fn.maps = function () {
        this.each(function () {
            var self = $(this),
                mapHolder = self.find("> .cp-map-container").get(0),
                mapPinList$ = self.find(">.cp-map-pins"),
                mapPins$ = mapPinList$.find(">li");

            self.addClass("cp-map-applied")
                    .addClass("cp-map-loading");
            $(mapHolder).addClass("cp-map-container-applied");

            var mainGeo = getGeoMicroFormatValues(self.find('>.geo').get(0));
            var map = buildMap(mapHolder, mainGeo.latlng, mainGeo.zoom);

            var pins = {};
            if (self.attr('id')) {
                maps[self.attr('id')] = { 'map': map, 'pins': pins };
            }

            if (mapPins$.length > 0) {
                // get pins
                mapPins$.each(function (i) {
                    var pin$ = $(this);
                    pin$.find(".cp-map-pinLink").remove();
                    var pinGeo = getGeoMicroFormatValues(pin$.find('>.geo').get(0));
                    if (pinGeo) {
                        var newPin = placeIcon(map, pinGeo.latlng, pin$.attr("class"));
                        newPin.setContent(i + 1);
                        var newInfoWindow = new $.maps.v3infoWindow(map, newPin);
                        newInfoWindow.setContent(pin$.html());
                        if (pin$.attr('id')) {
                            pins[pin$.attr('id')] = { pin: newPin, index: i };
                        } else {
                            pins[i + 1] = { pin: newPin, index: i };
                        }
                    }
                });

            } else {
                var centrePin = placeIcon(map, mainGeo.latlng, '');
            }
            
            attachExternalInteractions();

            self.removeClass("cp-map-loading")
                .addClass("cp-map-loaded");

        });
    };

    $.extend($.maps, {
        getMapDetails: function (mapid) { return maps[mapid]; },
		placePin: function(mapid, lat, lng, pinClass){
			var mapDet = this.getMapDetails(mapid),
				latlng = new google.maps.LatLng(lat, lng),
				newPin = placeIcon(mapDet.map, latlng, pinClass);
			mapDet.pins.push(newPin);
			return newPin;
		},
        setCenter: function (mapid, latlong) {
            var latlng = new google.maps.LatLng(latlong[0], latlong[1]);
            maps[mapid].map.panTo(latlng);
        }
    });

})(window.jQuery, window.google);
