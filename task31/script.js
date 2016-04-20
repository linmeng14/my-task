function getId(id){
	return document.getElementById(id);
}

var inschool=getId('inschool'),
	outschool=getId('outschool'),
	sc=getId('sc'),
	work=getId('work'),
	citySelect=getId('city-select'),
	schoolSelect=getId('school-select');
// 城市以及学校数组
var list = [	
	{text:'北京',
			val:[
				'北京大学',
				'清华大学',
				'北京理工大学',
				'北京邮电大学',
				'中央财经大学'
			]},
	{text:'天津',
			val:[
				'天津大学',
				'南开大学',
				'天津理工大学',
				'天津商业大学',
				'天津财经大学'
			]},
	{text:'上海',
			val:[
				'复旦大学',
				'上海大学',
				'上海理工大学',
				'上海海洋大学',
				'上海财经大学'
			]},
	{text:'成都',
			val:[
				'成都大学',
				'西南大学',
				'成都理工大学',
				'成都科技大学',
				'西南财经大学',
				'西华大学'
			]}
]

inschool.onclick=function(){
	if(inschool.checked){
		work.style.display="none";
		sc.style.display="block";
	}
}
outschool.onclick=function(){
	if(outschool.checked){
		work.style.display="block";
		sc.style.display="none";
	}
}

function selectCity(){
	var array=[];
	for (var i = 0; i < list.length; i++) {
		var option=document.createElement('option');
		option.innerHTML=list[i].text;
		option.value = list[i].text;
		citySelect.appendChild(option);
	}
}
//childNodes从1开始
// function selectSchool(){
// 	schoolSelect.innerHTML="";
// 	for (var i = 1; i <=list.length; i++) {
// 		if(citySelect.childNodes[i].selected){
// 			for (var j = 0; j < list[i-1].val.length; j++) {
// 				var option=document.createElement('option');
// 				option.innerHTML=list[i-1].val[j];
// 				option.value = list[i-1].val[j];
// 				schoolSelect.appendChild(option);
// 			}
// 		}
// 	}
// }

	function selectSchool(){
		schoolSelect.innerHTML="";
		for(var i=1; i<=list.length;i++){
			if(citySelect.childNodes[i].selected){
				for(var j=list[i-1].val.length-1;j>=0;j--){
					var option=document.createElement('option');
					option.innerHTML=list[i-1].val[j];
 					option.value = list[i-1].val[j];
 					schoolSelect.appendChild(option);
				}
			}
		}
	}
selectCity();
selectSchool();
citySelect.onclick=function(){
	selectSchool();
}
