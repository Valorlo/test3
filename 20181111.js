var data;

function loaddata(callback){
    var xhr=new XMLHttpRequest();//更正:少了new
    xhr.open('get','https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');

    xhr.send();
    xhr.onload=function (){//不用加名字 更正:加了load
        data=JSON.parse(xhr.responseText);
        callback();
    }
}

function ct(){
    var ln={};
    for(var i=0;i<data.length;i++){
        var content=data[i].ZipName_;
        if(ln[content]==undefined)
        ln[content]=1;
    }
    var lni=document.querySelector(".local");
    var stra='';
    stra+='<option value="all">請選擇地區</option>';
    for(var j in ln){
        stra+='<option value="'+j+'">'+j+'</option>';//更正:少了>
    }
    lni.innerHTML=stra;
    lni.addEventListener('change',update);

    var no={};
    for(var i=0;i<data.length;i++){
        var content=data[i].StatusName_;
        if(no[content]==undefined)
        no[content]=1;
    }
    var noi=document.querySelector(".NO");
    var strb='';
    strb+='<option value="all">請選擇狀態</option>';
    for(var j in no){
        strb+='<option value="'+j+'">'+j+'</option>';//更正:少了>
    }
    noi.innerHTML=strb;
    noi.addEventListener('change',update);
}

function update(){
    var lnii=document.querySelector(".local");
    var noii=document.querySelector(".NO");
    var ctt=document.querySelector(".desc");
    var tt=document.querySelector(".t");

    var total=0;
    var strc='';
    for(var i=0;i<data.length;i++){
        if(data[i].ZipName_==lnii.value&&data[i].StatusName_==noii.value){
            total+=1;
            strc+='<li>'+data[i].InformDesc_+'</li>';
        }
    }
    tt.textContent='在'+lnii.value+'共有'+total+'筆資料';
    ctt.innerHTML=strc;
}

loaddata(ct);