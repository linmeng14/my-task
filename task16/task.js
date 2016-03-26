var aqiData={};
var cityname=document.getElementById('aqi-city-input'),
	valuename=document.getElementById('aqi-value-input'),
	btn=document.getElementById('add-btn');
	var delbtn=document.getElementsByTagName('button');
	// 添加trim方法
	String.prototype.trim=function(){
		return this.replace(/(^\s*)|(\s*$)/g,'');
	}
	// 添加新的一组数据
function addAqiData(){
	var city=cityname.value.trim();
	var value=valuename.value.trim();
	if(!/^[\u4e00-\u9fa5_a-zA-Z]+$/.test(city)){
		alert("请输入正确的城市名称！");
		cityname.focus();
		return false;
	}
	if(!/^[0-9]{1,}$/.test(value)){
		alert("请输入正确的空气指数！");
		valuename.focus();
		return false;
	}
	aqiData[city]=value;
}
    // 将数据添加到表格
    function renderAqilist(){
    	if(!isEmptyJson(aqiData)){
    		var otable=document.getElementsByTagName('table')[0];
    		var tr=document.createElement('tr');
    		var td=document.createElement('td');
    		td.innerHTML=cityname.value;
    		var td1=document.createElement('td');
    		td1.innerHTML=valuename.value;
    		var td2=document.createElement('td');
    		var btn=document.createElement('button');
    		btn.innerHTML="删除";
    		addEvent(btn,'click',delBtnHander);
    		td2.appendChild(btn);
    		tr.appendChild(td);
    		tr.appendChild(td1);
    		tr.appendChild(td2);
    		otable.appendChild(tr);

    	}
    	
    }
    function isEmptyJson(json){
    	var obj;
    	for(obj in json){
    		return false;
    	}
    	return true;
    }
    // 点击添加按钮时
    function addBtnHander(){
    	addAqiData();
    	renderAqilist();
    }
    // 点击删除按钮时
	function delBtnHander(){
		var delItr=this.parentNode.parentNode;
		for(var name in aqiData){
			if(name===delItr.firstChild.innerHTML){
				delete aqiData[name];
				break;
			}
		}
		var delParent=delItr.parentNode;
		delParent.removeChild(delItr);
	}
	// 初始化事件
		btn.onclick=function(){
			addBtnHander();
		}
	function addEvent(obj, type, handle) {
        try {
            // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
            obj.addEventListener(type, handle, false);
        } catch (e) {
            try {
                // IE8.0以及以下版本
                obj.attachEvent('on' + type, handle);
            } catch (e) {
                obj['on' + type] = handle;
            }
        }
    }