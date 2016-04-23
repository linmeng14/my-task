$(document).ready(function() {
	// $('#calender,#caleSelect').on('click',function(){
	// 	$.calender('.container',15);
	// 	//$.checkFlag();
	// });
	$("#calender,#caleSelect").on('click',function(){
		var dayEle=$(".daySelect")[0];
		if(dayEle==undefined){
			$.calender('.container',15);
		}
		else{
			$(".monAndYearSelect,.daySelect").remove();
		}
	})
	//$(".monAndYearSelect,.daySelect").hide();
});