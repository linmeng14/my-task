function WaterFall(colsNum){
	var loadImages={"Data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
								  {"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
								  {"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},
								  {"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},
								  {"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"}]}
	this.init=function(){
		this.imgLocation("main","box");
		var self=this;
		window.onscroll=function(){
			if(self.checkFlag()){
				for(var i=0;i<loadImages.Data.length;i++){
					var box=document.createElement("div");
					box.className="box";
					var oparent=document.getElementById("main");
					oparent.appendChild(box);
					var box_img=document.createElement("div");
					box_img.className="box_img";
					box.appendChild(box_img);
					var img=document.createElement("img");
					img.src="images/"+loadImages.Data[i].src;
					box_img.appendChild(img);

					img.addEventListener('click',function(event){
						event=event||window.event;
						var div=document.createElement('div');
						div.id="PuzzlePhoto-pop";
						document.body.appendChild(div);
						var img=document.createElement("img");
						img.src=event.target.src;
						div.appendChild(img);
						div.className+="show";
						div.addEventListener('click',function(event){
							event=event||window.event;
							if(event.target.id==="PuzzlePhoto-pop"){
								div.style.display="none";
							}
						});
					});
				}
				self.imgLocation("main","box");
			}
		}
	}
	this.checkFlag=function(){
		var oparent=document.getElementById("main");
		var content=this.getChildElement(oparent,"box");
		var lastContentHeight=content[content.length-1].offsetTop;
		var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
		var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
		if(lastContentHeight<scrollHeight+pageHeight){
			return true;
		}
	}
	this.imgLocation=function(parent,child){
		var oparent=document.getElementById(parent);
		var content=this.getChildElement(oparent,child);
		var imgwidth=content[0].offsetWidth;
		// var imgs=document.querySelectorAll("img");
		// for (var i=0;i<imgs.length;i++){
		// 	imgs[i].style.width=colsNum+'px';
		// }
		// var imgwidth=colsNum;
		var cols=Math.floor(document.documentElement.clientWidth/imgwidth);
		oparent.style.cssText="width:"+imgwidth*cols+"px;margin: 30px auto";
		var heightArr=[];
		for(var i=0;i<content.length;i++){
			if(i<cols){
				heightArr.push(content[i].offsetHeight);
			}
			else{
				var minHeight=Math.min.apply(null,heightArr);
				var minIndex=this.getMinIndex(heightArr,minHeight);
				content[i].style.position="absolute";
				content[i].style.top=minHeight+"px";
				content[i].style.left=content[minIndex].offsetLeft+"px";
				heightArr[minIndex]+=content[i].offsetHeight;
				console.log(heightArr)
			}
		}
	}
	this.getChildElement=function(parent,clsname){
		var contentArr=[];
		var allContent=parent.getElementsByTagName("*");
		for(var i=0;i<allContent.length;i++){
			if(allContent[i].className==clsname){
				contentArr.push(allContent[i]);
			}
		}
		return contentArr;
	}
	this.getMinIndex=function(heighArr,minHeight){
		for(var i=0;i<heighArr.length;i++){
			if(heighArr[i]==minHeight){
				return i;
			}
		}
	}
	var imgs=document.querySelectorAll("img");
	this.popPicture=function(){
		for(var i=0;i<imgs.length;i++){
			imgs[i].addEventListener('click',function(event){
				event=event||window.event;
				var div=document.createElement('div');
				div.id="PuzzlePhoto-pop";
				document.body.appendChild(div);
				var img=document.createElement("img");
				img.src=event.target.src;
				div.appendChild(img);
				div.className+="show";
				div.addEventListener('click',function(event){
					event=event||window.event;
					if(event.target.id==="PuzzlePhoto-pop"){
						div.style.display="none";
					}
				});
			});
		}
	}			
}