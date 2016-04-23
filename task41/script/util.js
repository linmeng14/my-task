//添加按类获取的方法，兼容不支持getElementsByClass方法的浏览器
DOMUtil={
	getElementsByClass:function(clsName){
		var resultList=[];
		if(document.getElementsByClassName){
			return document.getElementsByClassName(clsName);
		}
		else{
			var eles=document.getElementsByTagName('*');
			for(var i=0,len=eles.length;i<len;i++){
				if(eles[i].className===clsName){
					resultList.push(eles[i]);
				}
			}
			return resultList;
		}
	},
	removeElement:function(element){
		var parentEle=element.parentNode;
		parentEle.removeChild(element);
	}
};

//获取数组中某个元素的索引index
var _indexOf=function(array,key){
	if(array===null){
		return -1;
	}
	for(var i=0;i<array.length;i++){
		if(array[i]===key){
			return i;
		}
	}
	return -1;
}

//获取当前时间的函数
var currTime=function(){
	var now=new Date();
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var day=now.getDate();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	var result=year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒';
	return result;
}

//判断当前月份天数
function howManyDate(year,month){
	if(month==0){
		year=year-1;
		month=12;
	}
	if(!(year%4)){
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
				break;
			case 2:
				return 29;
				break;
		}
	}
	else{
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
				break;
			case 2:
				return 28;
				break;
		}
	}
}