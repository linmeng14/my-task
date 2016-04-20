//获取元素
var oinput=document.getElementsByTagName('input'),
	op=document.getElementsByTagName('p'),
	submit=document.getElementById('submit');

//验证表单事件
function checkForm(){
	var namecheck=false,passwordcheck=false,passwordconfirm=false,
		emailcheck=false,phonecheck=false;
	var checkArray=["必填，长度为4-18个字符",
	"必填，长度为9到20个字符，只允许英文字母和数字",
	"必填，内容必须与密码完全相同",
	"必填，请输入正确的邮箱地址",
	"必填，请输入正确的手机号码"];
	this.nameCheck=function(){
		var value=oinput[0].value;
		if(!value||value.length<4||value.length>18){
			op[0].innerHTML="名称格式错误";
			op[0].style.color="red";
			oinput[0].style.border="1px solid red";
			namecheck=false;
		}
		else{
			op[0].innerHTML="名称格式正确";
			op[0].style.color="green";
			oinput[0].style.border="1px solid green";
			namecheck=true;
		}
	}
	this.passwordCheck=function(){
		var value=oinput[1].value;
		if(!value||value.length<8||value.length>20){
			op[1].innerHTML="密码格式错误";
			op[1].style.color="red";
			oinput[1].style.border="1px solid red";
			passwordcheck=false;
		}
		else{
			op[1].innerHTML="密码格式正确";
			op[1].style.color="green";
			oinput[1].style.border="1px solid green";
			passwordcheck=true;
		}
	}
	this.passwordConfirm=function(){
		var value=oinput[2].value;
		if(!value||value!=oinput[1].value){
			op[2].innerHTML="请输入与第一次相同的密码";
			op[2].style.color="red";
			oinput[2].style.border="1px solid red";
			passwordconfirm=false;
		}
		else{
			op[2].innerHTML="密码确认正确";
			op[2].style.color="green";
			oinput[2].style.border="1px solid green";
			passwordconfirm=true;
		}
	}
	this.emailCheck=function(){
		var value=oinput[3].value;
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(filter.test(value)){
			op[3].innerHTML="邮箱验证正确";
			op[3].style.color="green";
			oinput[3].style.border="1px solid green";
			emailcheck=true;
			return true;
		}
		else{
			op[3].innerHTML="邮箱验证错误";
			op[3].style.color="red";
			oinput[3].style.border="1px solid red";
			emailcheck=false;
			return false;
		}
	}
	this.phoneCheck=function(){
		var value=oinput[4].value;
		var filter=/^1[3|4|5|8][0-9]\d{4,8}$/;
		if(filter.test(value)){
			op[4].innerHTML="手机格式验证正确";
			op[4].style.color="green";
			oinput[4].style.border="1px solid green";
			phonecheck=true;
			return true;
		}
		else{
			op[4].innerHTML="手机格式验证错误";
			op[4].style.color="red";
			oinput[4].style.border="1px solid red";
			phonecheck=false
			return false;
		}
	}
	this.focus=function(){
		for (var i = 0; i < oinput.length-1; i++) {
			oinput[i].index=i;
			oinput[i].onfocus=function(){
				op[this.index].innerHTML=checkArray[this.index];
				op[this.index].style.color="#ccc";
			}
		}
	}
	this.btnSubmit=function(){
		if(namecheck&&passwordcheck&&passwordconfirm&&emailcheck&&phonecheck){
			alert("表单输入正确，准备提交。");
		}
		else{
			alert("表单中有错误，请重新输入！");
		}
	}
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

(function(){
	var checkform=new checkForm();
	// addHandler(oinput[0],'focus',function(){
	// 	checkform.focus();
	// 	//checkform.nameCheck();
	// });
	checkform.focus();
	addHandler(oinput[0],'blur',function(){
		checkform.nameCheck();
	});
	addHandler(oinput[1],'blur',function(){
		checkform.passwordCheck();
	});
	addHandler(oinput[2],'blur',function(){
		checkform.passwordConfirm();
	});
	addHandler(oinput[3],'blur',function(){
		checkform.emailCheck();
	});
	addHandler(oinput[4],'blur',function(){
		checkform.phoneCheck();
	});
	addHandler(submit,'click',function(){
		checkform.btnSubmit();
	});
	// for (var i = 0; i < oinput.length-1; i++) {
	// 	addHandler(oinput[i],'focus',function(){
	// 		checkform.focus();
	// 	});
	// }
})();







