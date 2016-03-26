var oinput=document.getElementById('input-text'),
	obtn=document.getElementsByTagName('button');
var myarray=new Array('2','4','6','8');

// 确保输入框中仅为数字
oinput.onkeyup=function(){
	this.value=this.value.replace(/[^(\d)|(,)]/,"");
}

// 模拟队列操作
function leftInto(){
	var value=oinput.value;
	if (value=="") {
		alert("请至少输入一个数吧！");
		return false;
	}
	myarray.unshift(value);
}
function rightInto(){
	var value=oinput.value;
	if (value=="") {
		alert("请至少输入一个数吧！");
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

// 渲染函数
function renderSpan(){
	document.getElementsByTagName('div')[0].innerHTML='';
	for (var i = 0; i < myarray.length; i++) {
		var ospan=document.createElement('span');
		ospan.innerHTML=myarray[i];
		document.getElementsByTagName('div')[0].appendChild(ospan);
	}
}


function deleteSpan(){

	var ospan=document.getElementsByTagName('span');
	for (var i = 0; i < ospan.length; i++) {
		ospan[i].index=i;
		ospan[i].onclick=function(){
			document.getElementsByTagName('div')[0].removeChild(this);
			myarray.splice(this.index,1);
			alert("您删除的是:"+this.innerHTML);
		}
	}
}

renderSpan();
deleteSpan();
