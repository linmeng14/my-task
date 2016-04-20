var data=[
	{
		label:'名称',
		name:'name',
		type:'input',
		validator:function(str){
			return validate.nameVali(str);
		},
		rules:'必填，长度为4-16个字符',
		success:'名称格式正确',
		empty:'名称不能为空，长度为4-16个字符',
		fail:'名称格式错误'
	},
	{
		label:'密码',
		name:'password',
		type:'password',
		validator:function(str){
			return validate.passwordVali(str);
		},
		rules:'必填，长度为8-20个字符',
		success:'密码格式正确',
		empty:'密码不能为空，长度为8-20个字符',
		fail:'密码格式错误'
	},
	{
		label:'确认密码',
		name:'repassword',
		type:'password',
		validator:function(str){
			return validate.repasswordVali(str,"password");
		},
		rules:'必填，再次输入相同密码',
		success:'输入密码一致',
		empty:'两次输入密码不一致，请重新输入',
		fail:'两次输入密码不一致，请重新输入'
	},
	{
    label: '邮箱',
    name: 'email',
    type: 'input',
    validator: function (str) {
        return validate.emailVali(str);
    },
    rules: '必填，输入您的邮箱',
    success: '邮箱格式正确',
    empty: '输入不能为空',
    fail: '邮箱格式非法，请重新输入'
	},
	{
		label:'手机',
		name:'telephone',
		type:'input',
		validator:function(str){
			return validate.telephoneVali(str);
		},
		rules:'必填，输入您的手机',
		success:'手机格式正确',
		empty:'输入不能为空',
		fail:'手机格式错误，请重新输入'
	},
	{
		label:'提交',
		name:'submit',
		type:'submit',
		validator:function(str){
			return validate.allVali();
		},
		rules:'',
		success:'',
		empty:'',
		fail:''
	}
];