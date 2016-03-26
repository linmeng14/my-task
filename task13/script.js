var oinput=document.getElementById('input'),
	obtn=document.getElementById('btn'),
	output=document.getElementById('output');
obtn.onclick=function(){
	if (oinput.value=="") {
		output.innerHTML="尚未输入!";
	}
	else{
		output.innerHTML=oinput.value;
		oinput.value="";
	}
}
