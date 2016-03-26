 // 以下两个函数用于随机模拟生成的测试数据
function getDateStr(dat){
	var year=dat.getFullYear();
	var month=dat.getMonth()+1;
	month=month<10 ? '0'+month :month;
	var day=dat.getDate();
	day=day<10 ? '0'+day : day;
	return year+'-'+month+'-'+day;
}

function rendomBuildData(seed){
	var returnData={};
	var dat=new Date("2016-01-01");
	var datStr='';
	for (var i = 1; i < 92; i++) {
		datStr=getDateStr(dat);
		returnData[datStr]=Math.ceil(Math.random()*seed);
		dat.setDate(dat.getDate()+1);
	}
	return returnData;
}

var aqiSourceData={
	"北京":rendomBuildData(500),
	"上海":rendomBuildData(400),
	"广州":rendomBuildData(300),
	"深圳":rendomBuildData(200),
	"成都":rendomBuildData(100),
	"西安":rendomBuildData(200),
	"福州":rendomBuildData(300),
	"厦门":rendomBuildData(400),
	"沈阳":rendomBuildData(500)
};

// 用于渲染图表的数据
var chartData={};

// 记录当前页面的表单选项
var pageState={
	nowSelectCity:"",
	nowGraTime:"day"
}

// 渲染图表
function renderChart(){
	var str="";
	for(var v in chartData){
        str+="<div class='box "+pageState['nowGraTime']+"'>";
        str+="<div class='histogram' style='height:"+chartData[v]+"px;background-color:"+getRandomColor()+"' title='"+v+":"+chartData[v]+"'></div>";
        str+="</div>";
    };
    document.getElementsByClassName('aqi-chart-wrap')[0].innerHTML=str;
}

// function renderChart(){
// 	var str="";
// 	for(var v in chartData){
//         str+="<div class='box "+pageState['nowGraTime']+"'>";
//         str+="<div class='histogram' style='height:"+chartData[v]+"px;background-color:"+getRandomColor()+"' title='"+v+":"+chartData[v]+"'>";
//         str+="<p>"+v+"</p>";
//         str+="</div>";
//         str+="</div>";
//     };
//     document.getElementsByClassName('aqi-chart-wrap')[0].innerHTML=str;
// }


// 日，周，月的radio事件的处理函数
function graTimeChange(){
	var typeNow=getTimeNow();
	if (typeNow==pageState['nowGraTime']) {
		return;
	}
	else{
		// 设置数据，进行渲染
		initAqiChartData();
		renderChart();
	}
}

	// 获取当地时间类型
function getTimeNow(){
	var types=document.getElementsByName('gra-time');
	var typeNow="";
	[].forEach.call(types,function(v){
		if (v.checked) {
			typeNow=v.value;
		}
	});
	return typeNow;
}

// select发生变化时的处理函数
function citySelectChange(){
	var cityNow=document.getElementById('city-select').value;
	if (cityNow==pageState["nowSelectCity"]) {
		return;
	}
	else{
		// 设置数据，进行渲染
		initAqiChartData();
		renderChart();
	}
}

// 初始化日，周，月的radio事件，当点击时，调用graTimeChange函数
function initGraTimeForm(){
	var types=document.getElementsByName('gra-time');
	[].forEach.call(types,function(value){
		value.addEventListener("click",graTimeChange);
	});
}

// 初始化select下拉选择框的选项
// function initCitySelector(){
// 	var select=document.getElementById('city-select');
// 	var str="";
// 	for(var city in aqiSourceData){
// 		str+="<option value='"+city+"'>"+city+"</option>";
// 	}
// 	 select.innerHTML=str;
// 	// 给select设置事件，当选项变化时调用citySelectorChange函数
// 	select.addEventListener("change",citySelectChange);
// }

function initCitySelector() {
        // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
        var select=document.getElementById("city-select");
        var str="";
        for(var city in aqiSourceData){
            str+="<option value='"+city+"'>"+city+"</option>";
        }
       select.innerHTML=str;
        // 给select设置事件，当选项发生变化时调用函数citySelectChange
        select.addEventListener("change",citySelectChange);
    }


// 初始化图表所需的数据格式
function initAqiChartData(){
	var type=getTimeNow();
	var city=document.getElementById('city-select').value;
	pageState["nowGraTime"]=type;
	pageState["nowSelectCity"]=city;
	switch(type){
		case "day":
		chartData=aqiSourceData[city];
		break;
		case "week":
		chartData={};
		var count=0,total=0,week=1,date,weekDay;
		for(var v in aqiSourceData[city]){
			date=new Date(v);
			weekDay=date.getDay();
			if(weekDay==6){
				count++;
				total+=aqiSourceData[city][v];
				chartData["week"+week]=Math.round(total/count);
				count=0;
				total=0;
				week++;
			}
			else{
				count++;
				total+=aqiSourceData[city][v];
			}
		}
		chartData["week"+week]=Math.round(total/count);
		break;
		case "month":
		chartData={};
		var count=0,total=0,month=-1,date;
		for(var v in aqiSourceData[city]){
			date=new Date(v);
			if(month==-1){
				month=date.getMonth()+1;
			}
			else if(date.getMonth()+1!=month){
				chartData[month+"月"]=Math.round(total/count);
				month=date.getMonth()+1;
				count=0;
				total=0;
			}
			count++;
			total+=aqiSourceData[city][v];
		}
		chartData[month+"月"]=Math.round(total/count);
		break;
	}
	// 打印json数据
	console.log(JSON.stringify(chartData));
	renderChart();
}

// 获取随机颜色
// function getRandomColor(){
// 	return '#'+(function(h){
// 		return new Array(7-h.length).join('0')+h
// 	})
// 	((Math.random()*0x1000000<<0).tostring(16))
// }

function getRandomColor(){
        return '#' + (function(h){
            return new Array(7 - h.length).join("0") + h
        }
                )((Math.random() * 0x1000000 << 0).toString(16))
    }
// 初始化函数
function init(){
	initGraTimeForm();
	initCitySelector();
	initAqiChartData();
}

init();