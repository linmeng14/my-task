
//棋盘构造函数
function board(){
	//获取到整个td数组
	this.tdArr=[];
	this.randomTd="";
	this.nowingTd="";
	this.nowingIndex="";
	this.getTdArr=function(){
		var tr=document.getElementsByTagName('tr');
		for (var i = 1; i < tr.length; i++) {
				var td=tr[i].getElementsByTagName('td');
			for (var j = 1; j < td.length; j++) {
					this.tdArr.push(td[j]);
				}
			}
		//return tdArr;
	}
	//随机产生第一个小方块
	this.run=function(){
		var tdArr=this.tdArr;
		this.randomTd=tdArr[parseInt(Math.random()*99+1)];
		var odiv=document.createElement('div');
		odiv.className+='active';
		this.randomTd.appendChild(odiv);
		var nowingTd=this.randomTd;
		var nowingIndex=this.tdArr.indexOf(nowingTd);
		console.log(this.randomTd);
		console.log(nowingTd);
		console.log(nowingIndex);
		this.nowingTd=nowingTd;
		this.nowingIndex=nowingIndex;
	}
	
	//上下左右移动时
	this.move=function(){
		var moveArr=["go","turn-left","turn-right","back"];
	}
	//判断方向
	this.checkDirection=function(){
		var inputValue=document.getElementById('confirm').value;
		var nowingTd=this.nowingTd;
		this.run();
		console.log(this.nowingTd);
		if(inputValue=="go"){
			if(nowingTd.firstChild.className=="active"){
				this.nowingIndex-=10;
				var odiv=document.createElement('div');
				odiv.className+='active';
				this.tdArr[this.nowingIndex].appendChild(odiv);
			}
			else if(nowingTd.firstChild.className=="avtive-left"){
				this.nowingIndex-=1;
				var odiv=document.createElement('div');
				odiv.className+='active-left';
				this.tdArr[this.nowingIndex].appendChild(odiv);
			}
			else if(nowingTd.firstChild.className=="avtive-right"){
				this.nowingIndex+=1;
				var odiv=document.createElement('div');
				odiv.className+='active-right';
				this.tdArr[this.nowingIndex].appendChild(odiv);
			}
			else if(nowingTd.firstChild.className=="avtive-bottom"){
				this.nowingIndex+=10;
				var odiv=document.createElement('div');
				odiv.className+='active-bottom';
				this.tdArr[this.nowingIndex].appendChild(odiv);
			}
		}
		if(inputValue=="turn-left"){
			switch(nowingTd.firstChild.className){
				case "active":
				nowingTd.firstChild.className="active-left";
				break;
				case "active-left":
				nowingTd.firstChild.className="active-bottom";
				break;
				case "active-right":
				nowingTd.firstChild.className="active";
				break;
				case "active-bottom":
				nowingTd.firstChild.className="active-right";
				break;
			}
		}
		if(inputValue=="turn-right"){
			switch(nowingTd.firstChild.className){
				case "active":
				nowingTd.firstChild.className="active-right";
				break;
				case "active-left":
				nowingTd.firstChild.className="active";
				break;
				case "active-right":
				nowingTd.firstChild.className="active-bottom";
				break;
				case "active-bottom":
				nowingTd.firstChild.className="active-left";
				break;
			}
		}
		if(inputValue=="back"){
			switch(nowingTd.firstChild.className){
				case "active":
				nowingTd.firstChild.className="active-bottom";
				break;
				case "active-left":
				nowingTd.firstChild.className="active-right";
				break;
				case "active-right":
				nowingTd.firstChild.className="active-left";
				break;
				case "active-bottom":
				nowingTd.firstChild.className="active";
				break;
			}
		}
		//判断是否超出边界

	}
}
window.onload=function(){
	var runBtn=document.querySelector('#run');
	var myboard=new board();
	myboard.getTdArr();
	myboard.run();
	myboard.move();
	addHandler(runBtn,'click',function(){
		myboard.checkDirection();
	})
}




function addHandler(element,type,handler){
	if(element.addEventListener){
		addHandler=function(element,type,handler){
			element.addEventListener(type,handler,false);
		};
	}
	else if(element.attachEvent){
		addHandler=function(element,type,handler){
			element.attachEvent("on"+type,handler);
		};
	}
	else{
		addHandler=function(element,type,handler){
			element["on"+type]=handler;
		};
	}
	return addHandler(element,type,handler);
}