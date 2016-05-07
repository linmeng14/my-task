var waterfall={
	oparent:"main",
	ochild:'box',
	imgWidth:'250px',
	init:function(){
		var self=this;
			//self.oparent=document.getElementById(self.oparent);
			//self.ochild=param.ochild;
			//self.imgWidth=param.imgWidth;

			self.imgLocation(self.oparent,self.ochild);
			var loadImgs={"Data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
								  {"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},
								  {"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},
								  {"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},
								  {"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"}]}
			window.onscroll=function(){
				if(self.checkFlag()){
					for(var i=0;i<loadImgs.Data.legnth;i++){
						var box=document.createElement('div');
						box.className='box';
						var oparent=document.getElementById(self.oparent);
						oparent.appendChild(box);
						var box_img=document.createElement('div');
						box_img.className='box_img';
						box.appendChild(box_img);
						var img=document.createElement('img');
						img.src="images/"+loadImgs.Data[i].src;
						box_img.appendChild(img);
					}
					self.imgLocation(self.oparent,self.ochild);
				}
			}
	},
	//检查是否满足加载条件
	checkFlag:function(){
		var oparent=document.getElementById(self.oparent);
		var content=self.getChildElement(oparent,'box');
		var lastContentHeight=content[content.length-1].offsetTop;
		var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
		var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
		if(lastContentHeight<scrollHeight+pageHeight){
			return true;
		}
	},
	//根据class获取元素
	getChildElement:function(parent,clsname){
		var contentArr=[];
		var allcontentArr=parent.getElementsByTagName('*');
		for(var i=0;i<allcontentArr.length;i++){
			if(allcontentArr[i].className==clsname){
				contentArr.push(allcontentArr[i]);
			}
		}
		return contentArr;
	},
	//获取索引
	getMinIndex:function(heighArr,minHeigh){
		for(var i=0;i<heighArr.length;i++){
			if(heighArr[i]==minHeigh){
				return i;
			}
		}
	},
	//瀑布流加载
	imgLocation:function(parent,child){
		var self=this;
		var oparent=document.getElementById(self.oparent);
		var content=self.getChildElement(oparent,'box');
		var imgwidth=content[0].offsetWidth;
		var cols=Math.floor(document.documentElement.clientWidth/imgwidth);
		oparent.style.cssText="width:"+imgwidth*cols+"px;margin:30px auto";
		var heightArr=[];
		for(var i=0;i<content.length;i++){
			if(i<cols){
				heightArr.push(content[i].offsetHeight);
			}
			else{
				var minHeight=Math.min.apply(null,heightArr);
				var minIndex=self.getMinIndex(heightArr,minHeight);
				content[i].style.position='absolute';
				content[i].style.top=minHeight+'px';
				//content[i].style.left=content[minIndex].offsetLeft+"px";
				heightArr[minHeight]+=content[i].offsetHeight;
			}
		}
	}
};