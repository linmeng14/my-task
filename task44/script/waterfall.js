window.onload=function(){
	imgLocation("main","box");
	var loadImages={"Date":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
							{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
							{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},
							{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},
							{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"}]}
	window.onscroll=function(){
		if(checkFlag()){
			for(var i=0;i<loadImages.Date.length;i++){
				var box=document.createElement("div");
				box.className="box";
				var oparent=document.getElementById("main");
				oparent.appendChild(box);
				var box_img=document.createElement("div");
				box_img.className="box_img";
				box.appendChild(box_img);
				var img=document.createElement("img");
				img.src="images/"+loadImages.Date[i].src;
				box_img.appendChild(img);
			}
			imgLocation("main","box");
		}
	}
}

function checkFlag(){
	var oparent=document.getElementById("main");
	var content=getChildElement(oparent,"box");
	var lastContentHeight=content[content.length-1].offsetTop;
	var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight<scrollHeight+pageHeight){
		return true;
	}
}

function imgLocation(parent,child){
	var oparent=document.getElementById(parent);
	var content=getChildElement(oparent,child);
	var imgwidth=content[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/imgwidth);
	oparent.style.cssText="width:"+imgwidth*cols+"px;margin: 30px auto";
	var heightArr=[];
	for(var i=0;i<content.length;i++){
		if(i<cols){
			heightArr.push(content[i].offsetHeight);
		}
		else{
			var minHeight=Math.min.apply(null,heightArr);
			var minIndex=getMinIndex(heightArr,minHeight);
			content[i].style.position="absolute";
			content[i].style.top=minHeight+"px";
			content[i].style.left=content[minIndex].offsetLeft+"px";
			heightArr[minIndex]+=content[i].offsetHeight;
		}
	}
}

function getChildElement(parent,clsname){
	var contentArr=[];
	var allContent=parent.getElementsByTagName("*");
	for(var i=0;i<allContent.length;i++){
		if(allContent[i].className==clsname){
			contentArr.push(allContent[i]);
		}
	}
	return contentArr;
}

function getMinIndex(heighArr,minHeight){
	for(var i=0;i<heighArr.length;i++){
		if(heighArr[i]==minHeight){
			return i;
		}
	}
}

var PhotoPop=document.querySelector('#PuzzlePhoto-pop')||null;
if(!PhotoPop){
	PhotoPop=document.createElement("div");
	PhotoPop.id="PuzzlePhoto-pop";
	document.body.appendChild(PhotoPop);
}
PhotoPop.addEventListener('click',function(event){
	event=event||window.event;
	if(event.target.id==="PuzzlePhoto-pop"){
		PhotoPop.className=PhotoPop.className.replace('show','');
	}
});
var imgs=document.querySelectorAll("img");
for(var i=0;i<imgs.length;i++){
	imgs[i].addEventListener('click',function(event){
		event=event||window.event;
		var img=document.createElement("img");
		img.src=event.target.src;
		PhotoPop.appendChild(img);
		PhotoPop.className+=" show";
	});	
}
