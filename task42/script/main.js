$(document).ready(function() {
	// $('#calender,#caleSelect').on('click',function(){
	// 	$.calender('.container',15);
	// 	//$.checkFlag();
	// });
	$("#calender,#caleSelect").on('click',function(){
		var dayEle=$(".daySelect")[0];
		if(dayEle==undefined){
			$.calender('.container','#caleSelect',15,true,15);
		}
		else{
			$(".monAndYearSelect,.daySelect").remove();
		}
	});
	
	$("#calender2,#caleSelect2").on('click',function(){
		var dayEle=$(".daySelect")[0];
		if(dayEle==undefined){
			$.calender(".contain","#caleSelect2",15,false);
		}
		else{
			$(".monAndYearSelect,.daySelect").remove();
		}
	});
});