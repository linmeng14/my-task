//输入框左侧显示行数
function renderLineNum(countNum){
	var count=document.getElementById('count');
	count.innerHTML="";
	for(var i=1;i<=countNum;i++){
		var li=document.createElement('li');
		var txt=document.createTextNode(i);
		li.appendChild(txt);
		count.appendChild(li);
	}
}

//检测当前输入框的函数，更新linenum
function updateLineNum(){
	setTimeout(function(){
		var command_input=document.getElementById('command-input');
		var inputValue=command_input.value;
		inputValue.match(/\n/g) ? renderLineNum(inputValue.match(/\n/g).length+1) : renderLineNum(1);
		setMargin();
	},0)
}

//实时设置第一个li的margin值，达到滚动的效果
function setMargin(){
	var oli=document.getElementById('count').getElementsByTagName('li');
	var command_input=document.getElementById('command-input');
	oli[0].style.marginTop=-command_input.scrollTop+"px";
	//var aa=-command_input.scrollTop;
	//document.getElementById('count').getElementsByTagName('li')[0].style.marginTop=aa+'px';
}


//为输入框绑定onkeyup事件
var command_input=document.getElementById('command-input');
command_input.onkeyup=function(){
	updateLineNum();
}

//获取指令集
function getConfig(str){
	var filter=/\n/g;
	var inputArr=str.split(filter);
	return inputArr;
}

//  执行指令  
function isConfig(){
	var a = 0;
	for(var x in inputArr){
		if(inputArr[x]==""){
			configs="";
			times="";
			continue;
		}
		if(!checkConfig(x))
		{
			a = 1;
			continue;
		}
		var times="";
		if(inputArr[x].slice(0,2).toUpperCase()=="GO"){
			configs="go";
			times=inputArr[x].slice(3)?Number(inputArr[x].slice(3)):1;
			console.log(configs+" "+times);
		}
		else{
			configs=inputArr[x].slice(0,7);
			times=inputArr[x].slice(8)?Number(inputArr[x].slice(8)):1;
		}
		if(isNaN(times)){
			a = 1;
			errorConfig.push(x);
			continue;
		}
		if(a==0)
		{
			for(var i=0;i<times;i++){
				order(configs);
			}
		}
	}
	order(0); 
}

//判断指令是否有错误
function checkConfig(x){
	var orderCon=["tra lef","tra rig","tra bot","tra top","mov top","mov lef","mov rig","mov bot"];
	if(inputArr[x].slice(0,2).toUpperCase()!="GO"){
		if(orderCon.indexOf(inputArr[x].slice(0,7))==-1){
			errorConfig.push(x);
			return false;
		}
	}
	return true;
}
var inputArr=[],configs=[],errorConfig=[];
//为重置按钮绑定事件
var resetBtn=document.getElementsByTagName('input')[1];
resetBtn.onclick=function(){
	command_input.value="";
	document.getElementById('count').innerHTML="<li>1</li>";
}

//为执行指令按钮绑定事件
var configBtn=document.getElementsByTagName('input')[0];
configBtn.onclick=function(){
	inputArr=getConfig(command_input.value);
	console.log(inputArr);
	errorConfig=[];
	isConfig();	
}