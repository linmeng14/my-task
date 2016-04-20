// 给事件添加处理程序
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

// 获取event对象
function getTarget(event){
	event=event||window.event;
	return event.target||event.srcElement;
}

// 阻止默认事件
function preventDefault(event){
	if(event.preventDefault){
		preventDefault=function(event){
			event.preventDefault;
		}
	}
	else{
		preventDefault=function(event){
			event.returnValue=false;
		}
	}
	return preventDefault(event);
}

//字符串的去空格处理
function trim(word) {
    return word.replace(/^\s+|\s+$/g,"");
}

// 获取元素
function init(queue, lin) {
    var randHeight, i, input = document.querySelector("input");
    queue.innerHTML = "";
    for(var i = 0; i < 10; i++) {
        input.value = Math.floor(Math.random() * 90) + 10;
        lin.click();
    }
};