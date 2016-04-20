//对字符进行去空格处理
function trim(str){
	var regex1=/^\s$*/;
	var regex2=/^\s*$/;
	return (str.replace(regex1,'').replace(regex2,''));
}

//给事件添加处理程序
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

//获取event对象
function getTarget(event){
	event=event||window.event;
	return event.target||event.srcElement;
}

//将name中的中文字符替换为英文字符，1个中文字符等于两个英文字符
var validate={
	//名字验证
	nameVali:function(str){
		var chineseRegex=/[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
		var lenRegex= /^.{4,16}$/;
		if(str.length==0){
			return false;
		}
		else if(!lenRegex.test(str)){
			return false;
		}
		else{
			return true;
		}
	},
	//密码验证
	passwordVali:function(str){
		return (str.length>=8&&str.length<=20);
	},
	//确认密码验证
	repasswordVali:function(str,id){
		var password=document.querySelector('#'+id).value;
		return (str===password);
	},
	//邮箱验证
	emailVali:function(str){
		var regex= /^([\w-*\.*]+)@([\w-]+)((\.[\w-]{2,4}){1,2})$/;
		return regex.test(str);
	},
	telephoneVali:function(str){
		var regex=/^1[3|4|5|8][0-9]\d{4,8}$/;
		return regex.test(str);
	},
	//按钮点击验证
	allVali:function(){
		var inputArray=document.querySelectorAll('input');
		var count=0;
		for (var i = 0; i < inputArray.length; i++) {
			if(inputArray[i].className=="correctInput"){
				count++;
			}
		}
		return (count===inputArray.length);
	}
}

function formFactory(data){
	var whole={
		settings:{
			label:data.label,
			name:data.name,
			type:data.type,
			validator:data.validator,
			rules:data.rules,
			success:data.success,
			empty:data.empty,
			fail:data.fail
		},
		generateInput:function(type){
			var that=this;
			var container=document.getElementById('form-container');
			var span=document.createElement('span');
			span.innerHTML=that.settings.label;
			var p=document.createElement('p');
			p.className='status';
			var label=document.createElement('label');
			var input=document.createElement('input');
			input.name=that.settings.name;
			input.type=that.settings.type;
			input.id=that.settings.name;

			addHandler(input,'focus',function(){
				input.className="inputFocus";
				p.innerText=that.settings.rules;
				p.className="status";
			});
			addHandler(input,'blur',function(){
				var verify = "";
                if (type == "single") {
                   verify = that.settings.validator(this.value);
                }
                else if (type == "verify") {
                   verify = that.settings.validator(this.value) && (this.value.length != 0);
                }
                if (verify) {
                    input.className = "correctInput";
                    p.className = "status correctSta";
                    p.innerText = that.settings.success;
                }
                else {
                    input.className = "wrongInput";
                    p.className = "status wrongSta";
                    if (this.value.length == 0) {
                        p.innerText = that.settings.empty;
                    }
                    else p.innerText = that.settings.fail;
                }
			});
			container.appendChild(label);
			label.appendChild(span);
			label.appendChild(input);
			container.appendChild(p);
		},
		generateButton:function(){
			var that=this;
			var container=document.getElementById('form-container');
			var button=document.createElement('button');
			button.innerHTML=that.settings.label;
			addHandler(button,'click',function(){
				if(that.settings.validator()){
					alert("表单正确，提交成功!");
				}
				else{
					alert("表单有错误，提交失败!");
				}
			});
			container.appendChild(button);
		},
		init:function(){
			var that = this;
            //判断类型
            switch (that.settings.name) {
                case 'name':
                    that.generateInput('single');
                    break;
                case 'password':
                    that.generateInput('single');
                    break;
                case 'repassword':
                    that.generateInput('verify');
                    break;
                case 'email':
                    that.generateInput('single');
                    break;
                case 'telephone':
                    that.generateInput('single');
                    break;
                case 'submit':
                    that.generateButton();
                    break;
            }
		}
	}
	return whole.init();
}

window.onload=function(){
	for (var i = 0; i < data.length; i++) {
		formFactory(data[i]);
	}
}
