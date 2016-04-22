//将每个格子对象化
function Node(i,j){
	this.dom=document.getElementsByTagName('td')[i*11+j];
	this.row=i;
	this.col=j;
	this.deg=0;
}

//在某个格子中显示活动格子
Node.prototype.appear=function(directionNum){
	odiv=document.createElement('div');
	odiv.setAttribute('class','active');
	odiv.style.transform="rotate(-"+directionNum*90+"deg)";
	this.deg=-directionNum*90;
	this.dom.appendChild(odiv);
}

//在某个格子取消显示活动格子
Node.prototype.disappear=function(){
	this.dom.removeChild(this.dom.firstChild);
}

//在活动格子逆时针转动
Node.prototype.rotate=function(num){
	this.deg=this.deg+num;
	var degStr="rotate("+this.deg+"deg)";
	this.dom.firstChild.style.transform=degStr;
}

//彩色活动格子类
function ActiveNode(row,col){
	this.row=row;
	this.col=col;
	directionArr=["up","left","right","down"];
	this.directionNum=0;
}

//活动格子的创建
ActiveNode.prototype.create=function(){
	nodeArr[this.row][this.col].appear(0);
}

//活动格子的移动方法
ActiveNode.prototype.move=function(inputStr){
	switch(inputStr){
		case "go":
			switch(this.directionNum){
				//up
				case 0:
					if(this.row==1){
						break;
					}
					nodeArr[this.row][this.col].disappear();
					this.row--;
					nodeArr[this.row][this.col].appear(this.directionNum);
					break;
				//left
				case 1:
					if(this.col==1){
						break;
					}
					nodeArr[this.row][this.col].disappear();
					this.col--;
					nodeArr[this.row][this.col].appear(this.directionNum);
					break;
				//down
				case 2:
					if(this.row==10){
						break;
					}
					nodeArr[this.row][this.col].disappear();
					this.row++;
					nodeArr[this.row][this.col].appear(this.directionNum);
					break;
				//right
				case 3:
					if(this.col==10){
						break;
					}
					nodeArr[this.row][this.col].disappear();
					this.col++;
					nodeArr[this.row][this.col].appear(this.directionNum);
					break;
			}
			break;
		case "left":
			nodeArr[this.row][this.col].rotate(-90);
			this.directionNum=(this.directionNum+1)%4;
			break;
		case "right":
			nodeArr[this.row][this.col].rotate(90);
			this.directionNum=(this.directionNum+3)%4;
			break;
		case "down":
			nodeArr[this.row][this.col].rotate(180);
			this.directionNum=(this.directionNum+2)%4;
			break;
	}
}

//将表格格子存放进nodeArr数组
var nodeArr=[];
for(var i=0;i<11;i++){
	nodeArr[i]=[];
	for(var j=0;j<11;j++){
		nodeArr[i][j]=new Node(i,j);
	}
}

//创建活动格子
var activenode=new ActiveNode(parseInt(Math.random()*9+1),parseInt(Math.random()*9+1));
activenode.create();

//为按钮绑定事件
var btns=document.getElementsByTagName('input');
for(var i=0;i<4;i++){
	(function(i){
		addHandler(btns[i],'click',function(){
			return activenode.move(btns[i].value);
		})
	})(i);
}

//为文字框绑定事件
addHandler(btns[5],'click',function(){
	var textInput=btns[4].value;
	textInput=textInput.trim();
	textInput=textInput.toLowerCase();
	if(textInput=="tun lef"){
		activenode.move("left");
	}
	else if(textInput=="tun rig"){
		activenode.move("right");
	}
	else if(textInput=="tun bac"){
		activenode.move("down");
	}
	else if(textInput=="go"){
		activenode.move("go");
	}
	else{
		alert("指令有错误!\r正确指令为\rGO:直走\rTUN LEF:向左转\rTUN RIG:向右转\rTUN BAC:向下");
	}
})






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