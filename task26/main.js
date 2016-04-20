var canvas=document.getElementById('canvas'),
	context=canvas.getContext('2d');
var blueColor='#6cf';
// 存放飞船实例的对象
var airshipArr=[0,0,0,0];

var planet={
	x:400,
	y:400,
	r:100,
	//绘制行星
	drawSelf:function(){
		context.beginPath();
		context.fillStyle=blueColor;
		context.arc(this.x,this.y,this.r,Math.PI*2,false);
		context.closePath();
		context.fill();
	},
	//绘制轨道
	drawOrbit:function(){
		for(var i=0;i<4;i++){
			context.beginPath();
			context.strokeStyle=blueColor;
			context.arc(this.x,this.y,this.r+(i+1)*50,0,Math.PI*2,false);
			context.closePath();
			context.stroke();
		}
	},
	//建立飞船
	createAitship:function(createCommand){
		airshipArr[createCommand.id]=new Airship(createCommand);
		$('<p>'+createCommand.id+'号飞船创建成功</p>').prependTo($('.god-message'));
	}
}
//指挥官对象
var commander={
	//指挥官记录飞船信息，有丢包概率，可能与真实情况不符
	message:[false,false,false,false],
	isFlightArr:[false,false,false,false],
	//方法：发送消息
	send:function(uCommand){
		if(uCommand.command==='create'){
			planet.createAitship(uCommand);
			this.message[uCommand.id]=true;
			this.isFlightArr[uCommand.id]=false;
			return;
		}
		if(uCommand.command==='boom'){
			this.message[uCommand.id]=false;
			this.isFlightArr[uCommand.id]=false;
		}
		if(uCommand.command==='flight'&&this.message[uCommand.id]){
			this.isFlightArr[uCommand.id]=true;
		}
		if(uCommand.command==='stop'){
			this.isFlightArr[uCommand.id]=false;
		}
		mediator(uCommand);
	}
	// //方法：创建飞船（参数：轨道号，动力，能源）
	// commandCreate:function(orbit,dynamical,energy){
	// 	this.message[orbitNum]=true;
	// 	airshipArr.push(new Airship());
	// }
	// //方法：命令飞船飞行（参数：飞船号）
	// commandFlight:function(airshipNum){
	// 	airshipArr[airshipNum].flight();
	// }
	// //方法：命令飞船停止（参数：飞船号）
	// commandStop:function(airshipNum){
	// 	airshipArr[airshipNum].stop();
	// }
	// //方法：命令飞船自爆（参数：飞船号）
	// commandBoom:function(airshipNum){
	// 	this.message[airshipNum]=false;
	// 	airshipArr[airshipNum].boom();
	// }	
}

//Mediator
function mediator(uCommand){
	setTimeout(function(){
		if(Math.random()>0.3){
			//发送成功
			for(var i=0,len=airshipArr.length;i<len;i++){
				if(typeof airshipArr[i]=='object'){
					airshipArr[i].receive(uCommand);
				}
			}
			$('<p>信息发送成功,指令:{'
				+uCommand.id
				+','
				+uCommand.command+
			'}</p>').prependTo($('.god-message'));
		}
		else{
			//发送失败，信息丢包了
			$('<p class="warning">信息丢包了,指令:{'
				+uCommand.id
				+','
				+uCommand.command+
				'}</p>').prependTo($('.god-message'));
		}
	},1000)
}

/****************************************************************
 *	指令形式
 * 	{
 * 		id: 0,(飞船号，在哪个轨道创建 可选 0-3)
 * 		command: 'create',(指令 可选 create, flight, stop, boom)
 * 		dynamical: 1 (速率 可选 1, 2, 3)
 * 		energy: 2 (动力恢复 2, 3, 4)
 * 		useEnergy: 5 (能耗 5，7， 9 与上面速率一一对应)
 *   }
 ****************************************************************/

 //飞船类
 function Airship(createCommand){
 	//轨道 速度 能源恢复 能耗
 	this.orbit=createCommand.id;
 	this.dynamical=createCommand.dynamical;
 	this.energy=createCommand.energy;
 	this.useEnergy=createCommand.useEnergy;
 	//总能源
 	this.hp=100;
 	this.w=60;
 	this.h=20;
 	//矩形中心点，坐标向上向左移动自身宽高的一半
 	this.x=550+this.orbit*50;
 	this.r;
 	this.deg=0;
 	this.y=400;
 	this.isFlight=false;
 	this.isBoom=false;
 	this.frameNum=0;

 	//接收消息
 	this.receive=function(uCommand){
 		var isMe=false;
 		for(var i=0,len=airshipArr.length;i<len;i++){
 			if(this==airshipArr[uCommand.id]){
 				isMe=true;
 			}
 			break;
 		}
 		if(isMe){
 			if(uCommand.command==='flight'){
 				this.flight();
 			}
 			else if(uCommand.command==='stop'){
 				this.stop();
 			}
 			else if(uCommand.command==='boom'){
 				this.boom();
 			}
 		}
 	},
 	//绘制
 	this.draw=function(){
 		this.frameNum++;
 		console.log(this.frameNum);
 		context.fillStyle=blueColor;
 		context.fillRect(this.x-this.w/2,this.y-this.h/2,this.w,this.h);
 	},
 	//飞行
 	this.flight=function(){
 		this.isFlight=true;
 		this.r=150+this.orbit*50;
 		this.deg+=this.dynamical;
 		if(this.deg>360){
 			this.deg=0;
 		}
 		this.x=400+this.r*Math.cos(Math.PI/180*this.deg);
 		this.y=400+this.r*Math.sin(Math.PI/180*this.deg);
 	},
 	//停止飞行
 	this.stop=function(){
 		this.isFlight=false;
 	},
 	//自爆
 	this.boom=function(){
 		airshipArr.splice(this.orbit,1,0);
 	},

 	this.restore=function(){
 		if(this.isFlight){
 			return;
 		}
 		if(this.frameNum%50==0){
 			this.hp+=this.energy;
 			this.hp=this.hp>100 ? 100 : this.hp;
 		}
 		context.font="15px Microsoft YaHei";
 		context.fillStyle='#fff';
 		context.fillText(this.hp+'%',this.x-15,this.y+5);
 	},
 	//能源耗尽时
 	this.consume=function(){
 		if(!this.isFlight){
 			return;
 		}
 		if(this.frameNum%50==0){
 			this.hp-=this.useEnergy;
 			this.hp=this.hp<0 ? 0 : this.hp;
 		}
 		context.font="15px Microsoft YaHei";
 		context.fillStyle='#fff';
 		context.fillText(this.hp+'%',this.x-15,this.y+5);
 		if(this.hp==0){
 			this.isFlight=false;
 			$('<p class="warning">'+this.orbit+'号飞船能量耗尽，停止飞行</p>').prependTo($('.god-message'));
 		}
 	}
 }

 function animate(){
 	context.clearRect(0,0,canvas.width,canvas.height);
 	planet.drawSelf();
 	planet.drawOrbit();
 	for (var i = 0; i < airshipArr.length; i++) {
 		if(airshipArr[i] instanceof Object){
 			airshipArr[i].draw();
 			airshipArr[i].restore();
 			airshipArr[i].consume();

 			if(airshipArr[i].isFlight){
 				airshipArr[i].flight();
 			}
 		}
 	}
 	//动画 当离开页面时，动画暂停
 	window.requestAnimationFrame(animate);
 }

 animate();