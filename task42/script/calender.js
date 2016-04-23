(function($){
	$.calender=function(selector,caleSelect,yearNum,isPeriod,stride){
		var isPer=isPeriod;
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
			'<input type="button" id="submitBtn" value="确认">'+
			'<input type="button" id="cancel" value="取消">'+
			'</div>'
		);
		//读取当前日期
		var now=new Date(),
			currYear=now.getFullYear(),
			currMonth=now.getMonth()+1,
			currData=now.getDate(),
			currDay=now.getDay();
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
		//为确认和取消按钮添加事件
		$("#submitBtn").on('click', function(e) {
			if(date1!==undefined&&date2!==undefined){
				$(caleSelect).val(date1+"-"+date2);
				setPeriodCallback(date1,date2);
			}
			$(".monAndYearSelect,.daySelect").remove();
		});
		$("#cancel").on('click', function(e) {
			$('.monAndYearSelect,.daySelect').remove();
		});
		//添加日期表头
		var cursorclick = 0;
		var date1,date2;
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
			
			//是否为时间段
			$('.currMonth').on('click', function(e) {
				if(isPer===true){
					if(cursorclick%2==0)
					{
						var currYear=document.getElementById('year').selectedOptions[0].value;
						var currMonth=document.getElementById('month').selectedOptions[0].value;
						var currData=e.target.innerHTML+'日';
						date1=currYear+""+currMonth+""+currData;
						e.target.style.backgroundColor="#6cf";
					}
					else
					{
						var currYear_2=document.getElementById('year').selectedOptions[0].value;
						var currMonth_2=document.getElementById('month').selectedOptions[0].value;
						var currData_2=e.target.innerHTML+'日';
						date2=currYear_2+""+currMonth_2+""+currData_2;
						e.target.style.backgroundColor="#6cf";
					}
					cursorclick++;
					if(date1!==undefined&&date2!==undefined){
						date1Str=date1.substring(date1.indexOf('月')+1,date1.indexOf('日'));
						date2Str=date2.substring(date2.indexOf('月')+1,date2.indexOf('日'));
						console.log(date1Str+date2Str);
						if((date2Str-date1Str>0)&&(date2Str-date1Str<=stride)){
							console.log(stride);
						}
						else{
							alert("选择日期区间超过最大长度或不正确,请重新选择!");
							$('.monAndYearSelect,.daySelect').remove();
							return;
						}
						for(var i=date1Str;i<date2Str-1;i++){
							$('.currMonth')[i].style.backgroundColor="lightblue";
						}
					}
				}
				else{
					var currYear=document.getElementById('year').selectedOptions[0].value;
					var currMonth=document.getElementById('month').selectedOptions[0].value;
					var currData=e.target.innerHTML+'日';
					var currHour=new Date().getHours()+'时';
					var currMinutes=new Date().getMinutes()+'分';
					var currSeconds=new Date().getSeconds()+'秒';
					//document.getElementById('caleSelect').value=currYear+""+currMonth+""+currData+""+currHour+""+currMinutes+""+currSeconds;
					//document.getElementById(caleSelect).value=currYear+""+currMonth+""+currData;
					$(caleSelect).val(currYear+""+currMonth+""+currData);
					var date=currYear+""+currMonth+""+currData;
					$('.monAndYearSelect,.daySelect').remove();
					setCallback(date);
				}
			});
		}
	}
	//设置选择日期后的回调函数
	function setCallback(date){
		setTimeout(function(){
			alert("您选择了日期:"+date);
		},500)
	}
	function setPeriodCallback(date1,date2){
		setTimeout(function(){
			alert("您选择的日期区间为:"+date1+"至"+date2);
		},500)
	}	
})($);