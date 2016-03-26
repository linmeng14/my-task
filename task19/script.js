var oinput=document.getElementById('input-text');
var	obtn=document.getElementsByTagName('button');
var myarray=new Array();

// 确保输入框中仅为数字
oinput.onkeyup=function(){
	this.value=this.value.replace(/[^(\d)|(,)]/,"");
}

// 模拟队列操作
function leftInto(){
	var value=oinput.value;
	if (value==""||parseInt(value)<10|parseInt(value)>100) {
		alert("输入有错误呢");
		return false;
	}
	if (myarray.length>=60) {
	alert("已经够了，不要再输入了!");
	return false;
	}
	myarray.unshift(value);
}
function rightInto(){
	var value=oinput.value;
	if (value==""||parseInt(value)<10|parseInt(value)>100) {
		alert("输入有错误呢");
		return false;
	}
	if (myarray.length>=60) {
	alert("已经够了，不要再输入了!");
	return false;
	}
	myarray.push(value);
}
function leftOut(){
	var value=oinput.value;
	myarray.shift();
}
function rightOut(){
	var value=oinput.value;
	myarray.pop();
}

obtn[0].onclick=function(){
	leftInto();
	renderSpan();
	deleteSpan();
}
obtn[1].onclick=function(){
	rightInto();
	renderSpan();
	deleteSpan();
}
obtn[2].onclick=function(){
	leftOut();
	renderSpan();
	deleteSpan();
}
obtn[3].onclick=function(){
	rightOut();
	renderSpan();
	deleteSpan();
}
obtn[4].onclick=function(){
	myarray=[];
	randomSpan();
	renderSpan();
	deleteSpan();
}
obtn[5].onclick=function(){
	myarray = quickSort(myarray);
	renderSpan();
	deleteSpan();
}

// 渲染函数
// function renderSpan(){
// 	document.getElementsByTagName('div')[1].innerHTML='';
// 	for (var i = 0; i < myarray.length; i++) {
// 		var odiv=document.createElement('div');
// 		odiv.innerHTML=myarray[i];
// 		// odiv.style.height=this.innerHTML+'px';
// 		document.getElementsByTagName('div')[1].appendChild(odiv);
// 	}
// }
// 柱形图渲染
function renderSpan(){
	var str="";
	for(var v in myarray){
        str+="<div class='box'>";
        str+="<div class='histogram' style='height:"+myarray[v]*5+"px;' title='"+myarray[v]+"'></div>";
        str+="</div>";
    };
    document.getElementsByClassName('container')[0].innerHTML=str;
    deleteSpan();
}

// 删除函数
// function deleteSpan(){

// 	var ospan=document.getElementsByTagName('span');
// 	for (var i = 0; i < ospan.length; i++) {
// 		ospan[i].index=i;
// 		ospan[i].onclick=function(){
// 			document.getElementsByTagName('div')[0].removeChild(this);
// 			myarray.splice(this.index,1);
// 			alert("您删除的是:"+this.innerHTML);
// 		}
// 	}
// }
// 删除函数
function deleteSpan(){
	var odiv=document.getElementsByClassName('histogram');
	for (var i = 0; i < odiv.length; i++) {
		odiv[i].index=i;
		odiv[i].onclick=function(){
			document.getElementsByClassName('box')[this.index].removeChild(this);
			myarray.splice(this.index,1);
			alert("您删除的是:"+this.title);
			renderSpan();
		}
	}
}

// 随机生成函数
function randomSpan(){
	for(var i=0;i<50;i++){
		myarray.push(Math.ceil(Math.random()*90+10));
	}
}

//排序函数
function quickSort(array){
	var length=array.length;
	if(length<=1){
		return array;
	}
	else{
		var smaller=[],
			bigger=[];
		var base=[array[0]];
		for (var i = 1; i <length; i++) {
			if(array[i]<=base[0]){
				smaller.push(array[i]);
			}
			else{
				bigger.push(array[i]);
			}
		}
		console.log(smaller.concat(base.concat(bigger)));
        console.log("-----------------------");
        return quickSort(smaller).concat(base.concat(quickSort(bigger)));
    }
	// for( i in quickSort(smaller).concat(base.concat(quickSort(bigger)))){
	// 	array.push(i);
	// }
	// return array;
}

renderSpan();
deleteSpan();
