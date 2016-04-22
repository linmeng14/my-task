(function($){
	$.calender=function(selector,inputCalender,yearNum){
		//如果已经调出来日历的话先移除掉
		$('.monAndYearSelect,.daySelect').remove();
		//$('.monAndYearSelect,.daySelect').hide();
		$(selector).append(
			'<div class="monAndYearSelect">'+
			'<span id="lastMon"></span>'+
			'<span id="nextMon"></span>'+
			'<select id="month"></select>'+
			'<select id="year"></select>'+
			'</div>'+
			'<div class="daySelect">'+
			'<table>'+
			'<thead></thead>'+
			'<tbody></tbody>'+
			'</table>'+
			'</div>'
		);
		//读取当前日期
		var now=new Date(),
			currYear=now.getFullYear(),
			currMonth=now.getMonth()+1,
			currData=now.getDate(),
			currDay=now.getDay();
		//设置日期,日历出现
		$(inputCalender).on('blur', function() {
			var inputTime=$(inputCalender).val();
			var inputYear=inputTime.split('-')[0];
			var inputMonth=inputTime.split('-')[1];
			var inputDay=inputTime.split('-')[2];
			$("#month option")[inputMonth-1].selected='selected';
			$("#year option")[inputYear-2001].selected='selected';
			$('.monAndYearSelect,.daySelect').show();
			addDateInfo(inputYear,inputMonth-0);
			for(var i=0;i<$(".currMonth").length;i++){
				if($(".currMonth")[i].innerHTML==(inputDay)){
					console.log('1');
					$(".currMonth")[i].style.background="#6cf";
				}
			}
		});
		//添加月份选择
		for(var i=1;i<13;i++){
			var optionEle=document.createElement('option');
			optionEle.value=i+'月';
			optionEle.innerHTML=i+'月';
			if(i==currMonth){
				optionEle.selected='selected';
			}
			$('#month').append(optionEle);
		}
		//为月份select绑定onchange事件
		$('#month').on('change', function(e) {
			var currMonth=parseInt(this.selectedOptions[0].value.split('月')[0]);
			var currYear=parseInt(document.getElementById('year').selectedOptions[0].value.split('年')[0]);
			addDateInfo(currYear,currMonth);
		});
		//添加年份选择
		for (var i = -yearNum; i <yearNum; i++) {
			var optionEle=document.createElement('option');
			optionEle.value=(currYear+i)+'年';
			optionEle.innerHTML=(currYear+i)+'年';
			if(i==0){
				optionEle.selected='selected';
			}
			$('#year').append(optionEle);
		}
		//为年份select绑定onchange事件
		$('#year').on('change', function(e) {
			var currYear=parseInt(this.selectedOptions[0].value.split('年')[0]);
			var currMonth=parseInt(document.getElementById('month').selectedOptions[0].value.split('月')[0]);
			addDateInfo(currYear,currMonth);
		});
		//添加两个调日期的span标签
		$("#lastMon").html('<<');
		$("#nextMon").html('>>');
		//为span标签绑定事件
		$("#lastMon").on('click', function(e) {
			var currYear=parseInt(document.getElementById('year').selectedOptions[0].value.split('年')[0]);
			var currMonth=parseInt(document.getElementById('month').selectedOptions[0].value.split('月')[0]);
			console.log(currYear+" "+currMonth);
			currMonth--;
			if(currMonth<=0){
				currMonth=12;
				currYear--;
				document.getElementById('month').getElementsByTagName('option')[currMonth-1].selected='selected';
				document.getElementById('year').getElementsByTagName('option')[currYear-2001].selected='selected';
				/*	document.getElementById('month').selectedOptions[0].value=currMonth+'月';
				document.getElementById('month').selectedOptions[0].innerHTML=currMonth+'月';
				document.getElementById('year').selectedOptions[0].value=currYear+'年';
				document.getElementById('year').selectedOptions[0].innerHTML=currYear+'年';*/
				addDateInfo(currYear,currMonth);
			}
			else{
				document.getElementById('month').getElementsByTagName('option')[currMonth-1].selected='selected';
			//	document.getElementById('month').selectedOptions[0].value=currMonth+'月';
			//	document.getElementById('month').selectedOptions[0].innerHTML=currMonth+'月';
				// for(var i=0;i<12;i++){
				// 	if($("#month option")[i].value.split('月')[0]===currMonth){
				// 		$("#month option")[i].selected='selected';
				// 		console.log('1');
				// 	}
				// }
				addDateInfo(currYear,currMonth);
			}
		});
		$("#nextMon").on('click', function(e) {
			var currYear=parseInt(document.getElementById('year').selectedOptions[0].value.split('年')[0]);
			var currMonth=parseInt(document.getElementById('month').selectedOptions[0].value.split('月')[0]);
			console.log(currYear+" "+currMonth);
			currMonth++;
			if(currMonth>=13){
				currMonth=1;
				currYear++;
				document.getElementById('month').getElementsByTagName('option')[currMonth-1].selected='selected';
				document.getElementById('year').getElementsByTagName('option')[currYear-2001].selected='selected';
				addDateInfo(currYear,currMonth);
			}
			else{
				document.getElementById('month').getElementsByTagName('option')[currMonth-1].selected='selected';
				addDateInfo(currYear,currMonth);
			}
		});
		//添加日期表头
		var dayArr=['日','一','二','三','四','五','六'];
		var trEle=document.createElement('tr');
		for(var i=0;i<dayArr.length;i++){
			var thEle=document.createElement('th');
			thEle.innerHTML=dayArr[i];
			trEle.appendChild(thEle);
		}
		$('.daySelect table thead').append(trEle);
		//添加日期信息,初始化加载
		addDateInfo(currYear,currMonth);
		//添加日期信息函数
		function addDateInfo(year,month){
			//如果已经调出来日历的话先移除掉
			$('.daySelect table tbody tr').remove();
			//判断当前月份有几天
			var sumCurrDate=howManyDate(year,month);
			//判断上个月有几天
			var sumPrevDate=howManyDate(year,month-1);
			//计算本月第一天为周几
			var firstDay=new Date(year+"/"+month+"/"+1).getDay();
			//添加本页中可显示的上月日期
			var trEle=document.createElement('tr');
			for(var start=(sumPrevDate-firstDay+1);start<=sumPrevDate;start++){
				var tdEle=document.createElement('td');
				tdEle.innerHTML=start;
				tdEle.className='prevMonth';
				trEle.appendChild(tdEle);
			}
			//添加本页上显示的本月的日期
			for(var start=1;start<=sumCurrDate;start++){
				var tdEle=document.createElement('td');
				tdEle.innerHTML=start;
				tdEle.className='currMonth';
				if(start==currData){
					tdEle.className='currMonth currDate';
				}
				trEle.appendChild(tdEle);
			}
			//添加页上可以显示的下个月日期
			//获得本月最后一天为周几
			var lastDay=new Date(year+"/"+month+"/"+sumCurrDate).getDay();
			if(lastDay!==6){
				for(var start=1;start<=(6-lastDay);start++){
					var tdEle=document.createElement('td');
					tdEle.innerHTML=start;
					tdEle.className='nextMonth';
					trEle.appendChild(tdEle);
				}
			}
			//将日期信息加到tbody中
			$('.daySelect table tbody').append(trEle);

			//为日期添加点击事件
			$('.currMonth').on('click', function(e) {
				var currYear=document.getElementById('year').selectedOptions[0].value;
				var currMonth=document.getElementById('month').selectedOptions[0].value;
				var currData=e.target.innerHTML+'日';
				var currHour=new Date().getHours()+'时';
				var currMinutes=new Date().getMinutes()+'分';
				var currSeconds=new Date().getSeconds()+'秒';
				document.getElementById('caleSelect').value=currYear+""+currMonth+""+currData+""+currHour+""+currMinutes+""+currSeconds;
				$('.monAndYearSelect,.daySelect').remove();
				//$('.monAndYearSelect,.daySelect').hide();
			});
		}
	}
})($);