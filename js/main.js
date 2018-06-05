var pos=0;
var intv;

$(document).on('ready',function(){
	init();
});
window.addEventListener('orientationchange',init)
function init(){
	if($('html').width() > 900){
		$.stellar({
			'horizontalScrolling': false,
			hideDistantElements: false
		});	
	}
	

	var sc = $.scrollorama({blocks:'.fullScreen',enablePin:false});
	sc.animate('.mensajePrincipal',{delay:880,duration:350,property:'top',end:500});
	sc.animate('.mensajePrincipal',{delay:950,duration:200,property:'opacity',end:0});
	
	$('#navegacionPrincipal').localScroll();
 $('.slider_controls li').on('click',handleClick);
 var width = $('.slider_container').width();
 $('.slide').each(function(i,e){
 	var url =$(e).data('background');
 	$(e).css('width',width+'px');
 	$(e).css('background-image',"url("+(url+".jpg")+")");
 });
 //clearInterval(intv);
intv = setInterval(handleClick,10000);
}
google.maps.event.addDomListener(window,'load',drawMap);
function drawMap(){
	var mapa;
	var opcionesMapa = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapa = new google.maps.Map(document.getElementById('google_canvas'),opcionesMapa);
	navigator.geolocation.getCurrentPosition(function(posicion){
		var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
			var marcador = new google.maps.Marker({
			map: mapa,
			draggable: false,
			position:geolocalizacion,
			visible: true
	});
			mapa.setCenter(geolocalizacion);
			calcRoute(geolocalizacion,mapa);
});
}
function calcRoute(inicioRuta,mapa){
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(mapa);
	var posicionItson=new google.maps.LatLng(27.4946057,-109.9723515);
	var marcador = new google.maps.Marker({
			map: mapa,
			draggable: false,
			position:posicionItson,
			visible: true
	});
	var request = {
		origin: inicioRuta,
		destination: posicionItson,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	}
	directionsService.route(request,function(response, status){
		if(status == google.maps.DirectionsStatus.OK){
			directionsRenderer.setDirections(response);
		}
	});

}


//27.4946057,-109.9723515/@27.4931353,-109.9703398,17z

function addBackground(element,width,setSize){
	if(!width) width = $('html').width();
	if(setSize){
		$(element).css({
			'width': width,
			'heigth': $('html').height()
		});
	}
	var imagen = $(element).data('background');
	if($('html').width() < 900) imagen = imagen+'-movil.jpg';
	else imagen = imagen+'.jpg';
	$(element).css('background-image',"url("+(imagen)+")");
	if($(element).height() > $(element).width())  $(element).css('background-size',"auto 100%");
}
function handleClick(){
var slide_target =0;

if($(this).parent().hasClass('slider_controls')){
	slide_target = $(this).index();
	pos = slide_target;
	clearInterval(intv);
	intv = setInterval(handleClick,10000);
}
else{
	pos++;
	if(pos>=$('.slide').length){
		pos=0;
	}
	slide_target = pos;
}

$('.slideContainer').fadeOut('slow',function(){
$(this).animate({
	'margin-left':-(slide_target * $('.slider_container').width())+'px'
},'slow',function(){
$(this).fadeIn();

});

});

}

