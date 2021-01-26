function ajax(obj){
    //函数初始化
    var method=obj.method||"get";
    var url=obj.url;
    var dataType=obj.dataType||"json";
    var asynch=obj.asynch==undefined?true:obj.asynch;
    var success=obj.success;
    var data="";
    switch(typeof(obj.data)){
        case "undefined":;
        break;
        case "object":
            for(var i in obj.data){
                data+=i+"="+obj.data[i]+"&";
            }
            data=data.slice(0,-1);
        break;
        case "string":
            data=obj.data;
        break;
    }
    var ajax=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
    if(method=="get"){
        ajax.open("get",url+"?"+data,asynch);
        ajax.send(null);
    }else if(method=="post"){
        ajax.open("post",url,asynch);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(data);
    }
    ajax.onreadystatechange=function(){
            if(ajax.readyState==4){        
                if(ajax.status==200){
                    var result;
                    console.log('ajax',ajax);
                    
                    switch(dataType){
                        case "text":
                            result=ajax.responseText;
                        break;
                        case "json":
                            debugger
                            result=eval("("+ajax.response+")")
                        break;
                        case "xml":
                            result=ajax.responseXML;
                        break;
                    }
                    if(success){
                        success(result)
                    }
                }else if(ajax.status==404){
                    alert("页面未找到");
                }else{
                    alert("获取错误");
                }
            }
        }
}
