$(document).ready(function() {
	$('#calender').on('click',function(){
		$.calender('.container','#caleSelect',15);
	});
	$.calender('.container','#caleSelect',15);
	$(".monAndYearSelect,.daySelect").hide();
});