// 为几个按钮添加事件，立即执行
(function(){
	var treeWalker=new TreeWalker();
	//btns=document.querySelector('input'),
	//preBtn=btns[0],
	//inBtn=btns[1],
	//postBtn=btns[2],
	preBtn=document.querySelector('#preBtn'),
	inBtn=document.querySelector('#inBtn'),
	speed=document.querySelector('#speed'),
	check=document.querySelector('#checkout'),
	root=document.querySelector('.root');
	addHandler(preBtn,'click',function(){
		treeWalker.stack=[];
		treeWalker.preOrder(root);
		treeWalker.animation();
	});
	addHandler(inBtn,'click',function(){
		treeWalker.stack=[];
		treeWalker.inOrder(root);
		treeWalker.animation();
	});
	// addHandler(postBtn,'click',function(){
	// 	treeWalker.postOrder(root);
	// 	treeWalker.animation();
	// });
})();

//多叉树的构造和遍历
function TreeWalker(){
	this.stack=[];
	this.root=document.querySelector('.root');
	var spans=document.getElementsByTagName('span');
	//深度优先遍历
	this.preOrder=function(node){
		this.stack.push(node);
		//console.log(node.children[1]);
		//console.log(node);
		var hasChild=node.children?true:false;
		if(hasChild){
			for(var i in node.children){
				if(node.children[i].nodeType==1)
				//if(node.children[i].nodeType==1 && node.children[i].nodeName=='DIV')	
				this.preOrder(node.children[i]);
				//console.log(this.stack);
			}
		}
		//console.log(this.stack.length);
	};
	//广度优先遍历
	this.inOrder=function(node){
		//if(!node || !node.length) return;
		//console.log(this.stack);
		var ili=[];
		ili.push(node);
		var item;
		while(ili.length){
			item=ili.shift();
			//console.log(item);
			this.stack.push(item);
			if(item.children){
				for(var i in item.children){
				if(item.children[i].nodeType==1)
				//if(item.children[i].nodeType==1 && item.children[i].nodeName=='DIV')	
				ili.push(item.children[i]);
				}
			}
		}
		console.log(this.stack);
	};
	this.animation=function(){
		var stack=this.stack,
		speed=document.querySelector('#speed'),
		check=document.querySelector('#checkout'),
		iter=0,timer,self=this;
		self.stack=[];
		if(!self.isWalking){
			self.isWalking=true;
			stack[iter].style.backgroundColor="#6cf";
			timer=setInterval(function(){
				if(iter==stack.length-1){
					stack[iter].style.backgroundColor="#fff";
					self.isWalking=false;
					clearInterval(timer);
				}
				else{
					++iter;
					stack[iter-1].style.backgroundColor="#fff";
					stack[iter].style.backgroundColor="#6cf";
					console.log(stack[iter]);
					if((stack[iter]).innerHTML==check.value){
						stack[iter].style.backgroundColor="orange";
						alert("亚达，终于找到了！");
						//可以退出查找，也可以继续查找
						//clearInterval(timer);
					}
				}
			},speed.value);
		}
	};
}