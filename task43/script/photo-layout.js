(function(window,document){

	function puzzlePhoto(param){
		return new puzzlePhoto.prototype.init(param);
	}

	puzzlePhoto.prototype={
		constructor:puzzlePhoto,
		wrap:null,
		imgList:null,
		prefix:'layout',
		width:0,
		height:0,
		imgPop:null,

		init:function(param){
			var self=this;
			self.wrap=document.querySelector(param.wrap);
			self.imgList=this.wrap.querySelectorAll('img');
			self.wrap.className+=' PuzzlePhoto';
			self.wrap.style.width=self.width=param.width||'960px';
			self.wrap.style.height=self.height=param.height||'400px';

			//弹出层初始化
			self.imgPop=document.querySelector('#PuzzlePhoto-pop')||null;
			if(!self.imgPop){
				self.imgPop=document.createElement('div');
				self.imgPop.id='PuzzlePhoto-pop';
				document.body.appendChild(self.imgPop);
			}

			//弹出层点击非图片部分隐藏
			self.imgPop.addEventListener('click',function(event){
				event=event||window.event;
				if(event.target.id==='PuzzlePhoto-pop'){
					self.imgPop.className=self.imgPop.className.replace('show','');
				}
			});

			//布局
			self.layout(self.imgList.length);
			self.wrap.addEventListener('click',function(event){
				event=event||window.event;
				var target=event.target;
				//弹出大图
				if(target.tagName.toLowerCase()==='img'){
					self.pop({src:target.src});
				}
			});
		},
		layout:function(count){
			count=parseInt(count);
			var self=this,
				width=parseInt(this.width),
				height=parseInt(this.height),
				i;
			//根据图片数量添加对应class
			self.wrap.className +=  ' ' + self.prefix + '-' + count;

			for(i=0;i<self.imgList.length;i++){
				var div=document.createElement('div');
				div.className='imgCover';
				div.style.backgroundImage = 'url(' + self.imgList[i].src　+　')';
				div.dataset.src=self.imgList[i].src;
				div.dataset.alt=self.imgList[i].alt||'';
				div.appendChild(self.imgList[i]);

				switch(count){
					case 3:
						switch(i){
							case 0:
								div.style.width=(width-(height/2))*100/width+'%';
								break;
							case 1:
							case 2:
								div.style.width=(height/2)*100/width+'%';
								break;
						}
						break;
					case 5:
						switch(i){
							case 0:
								div.style.width=(width*2/3)*100/width+'%';
								break;
							case 1:
								div.style.height=(width/3)*100/height+'%';
								break;
							case 2:
								div.style.height=(height-width/3)*100/height+'%';
								break;
						}
						break;
					default:break;
				}
				self.wrap.appendChild(div);
			}
		},

		pop:function(param){
			var img=document.createElement('img'),
				self=this;
			self.imgPop.innerHTML='';
			//判断传递过来的是图片src还是索引值
			img.src=param.src?param.src:self.imgList[param].src;
			self.imgPop.appendChild(img);
			self.imgPop.className+=' show';
		},

		grid:function(status){
			var self=this;
			//判断是否打开网格模式
			if(status){
				self.wrap.className+=' grid';
				//添加关闭按钮
				var closeBtn=self.wrap.querySelector('#PuzzlePhoto-grid-close')||null;
				if(!closeBtn){
					closeBtn=document.createElement('div');
					closeBtn.id='PuzzlePhoto-grid-close';
					closeBtn.innerText='×';
					closeBtn.title='退出网格全屏';
				}
				closeBtn.addEventListener('click',function(){
					self.grid(false);
				});
				self.wrap.appendChild(closeBtn);
				document.body.className+=' grid';
			}
			else{
				self.wrap.className+=self.wrap.className.replace(/grid/g,'').trim();
				document.body.className=document.body.className.replace(/grid/g,'').trim();
			}
		}
	};

	puzzlePhoto.prototype.init.prototype=puzzlePhoto.prototype;
	window.puzzlePhoto=puzzlePhoto;
})(window,document);