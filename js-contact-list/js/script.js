//Contact: naeem.smith at gmail.com, http://smittyology.com

//Contacts
var contacts = function(){
	//getContacts
	var getContacts = function(callback){
		$.ajax({
			url: "data/contacts.json",
			type: "GET",
			dataType: "json",
			success: callback
		});
	};

	//addContacts
	var addContacts = function(result){
		$.each(result, function( i, contact ) {
			$("<li></li>")
				.addClass("contact")
				.html("<ul><li class='contact-info'><img src='data/"+contact.img+".png' class='img-responsive' /><span>"+contact.first_name+" "+contact.last_name+"</span></li></ul>")
				.appendTo("#contact-view")
				.find(".contact-info").on( "click", function() { //selecting contacts
					$(this).parents(".contact").toggleClass("selected");
				});
			if(i == 19){
				return false;
			}
		});
	};

   getContacts(addContacts)
}();


//fixedSroller
/*var fixedScroller = function(){
	var setScroll = function() {
		var bar = $('.bg-dark');
		var holder = $('.bg-dark').parent();
		bar.data( 'position', bar.position() );
		$(window).scroll(function(){
			var hPos = bar.data('position'), scroll = getScroll();
			if ( bar.offset().top < scroll.top){

				if(bar.offset().top > holder.height()){
					bar.removeClass('fixed');
				}else{
					bar.addClass('fixed');
				}
			}
			else {
				bar.removeClass('fixed');
			}
		});
	}

	var getScroll = function() {
		var b = document.body;
		var e = document.documentElement;
		return {
			left: parseFloat( window.pageXOffset || b.scrollLeft || e.scrollLeft ),
			top: parseFloat( window.pageYOffset || b.scrollTop || e.scrollTop )
		};
	}
	setScroll();
}();*/

//buttons
var buttons = function(){
	//toggle view buttons
	$("#list-toggle").on( "click", function() {
	  $("#contact-view").attr("class", "list-view");
	  $(this).addClass("list-selected");
	  $("#grid-toggle").removeClass("grid-selected");
	});
	$("#grid-toggle").on( "click", function() {
	  $("#contact-view").attr("class", "grid-view");
	  $(this).addClass("grid-selected");
	  $("#list-toggle").removeClass("list-selected");
	});

	//select all buttons
	$("#select-all").on( "click", function() {
	  $(".contact").addClass("selected");
	});
	$("#deselect-all").on( "click", function() {
	  $(".contact").removeClass("selected");
	});
}();
