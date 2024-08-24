

    $('.nav div').click(function(){
        target = $(this).attr('to');
        switchTo(target);
        $('.nav div').each(function(){
            $(this).removeClass('active');
            //console.log("rm1 ok");
        });
        $(this).addClass('active');
        //console.log("add1 ok");

    });
    
    function switchTo(target){
        $('.content').each(function () {
            $(this).removeClass('active');
            //console.log("rm2 ok");
        });
        $(target).addClass('active');
        //console.log("add2 ok");
    }



function getAchives(){
    var dataset = [];
    var Ajax = function () {
        $.getJSON("https://blog.meow.ink/api/posts", function (data) {
            archives = "";
            json = data.data;
            dataset = json.dataSet;
            for(i = 0; i < dataset.length;i +=1)
            {
                //console.log(i);
                title = dataset[i].title;
                url = dataset[i].url;
                year = dataset[i].date.year;
                month = dataset[i].date.month;
                day = dataset[i].date.day;
                time = year + '.' + month + '.'+ day;
                archives += `<li><a href="${url}" target="_blank">${title} <span class="date">/ ${time}</span></a></li>`;
                $('.archivelist').html(archives);
            }
        });
    }();

}
    function siteTime(){
        window.setTimeout("siteTime()", 1000);
        var seconds = 1000;
        var minutes = seconds * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var years = days * 365;
        var today = new Date();
        var todayYear = today.getFullYear();
        var todayMonth = today.getMonth()+1;
        var todayDate = today.getDate();
        var todayHour = today.getHours();
        var todayMinute = today.getMinutes();
        var todaySecond = today.getSeconds();
        var t1 = Date.UTC(2023,12,4,0,0,0);
        var t2 = Date.UTC(todayYear,todayMonth,todayDate,todayHour,todayMinute,todaySecond);
        var diff = t2-t1;
        var diffYears = Math.floor(diff/years);
        var diffDays = Math.floor((diff/days)-diffYears*365);
        var diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
        var diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
        var diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
        document.getElementById("runningtime").innerHTML=" 已运行 "+diffYears+" 年 "+diffDays+" 天 "+diffHours+" 小时 "+diffMinutes+" 分钟 "+diffSeconds+" 秒";
    }
    var hitokototext = "";

    function getHitokoto(){
            $.ajax({
                type:"Post",
                url:"https://v1.hitokoto.cn",
                dataType:"json",
                success:function(data){
                    hitokoto = data.hitokoto;
                    from = data.from;
                    from_who = data.from_who;
                    text = `${hitokoto}<span id="who">——${from_who}<span id="from">[${from}]</span></span>`;
                    hitokototext = text;
                    writeHitokoto(hitokoto);
                },
                error:function(){
                    $('#hitokotocontent').html("[Error] Failed to get hitokoto.");
                    console.log("[Error] Failed to get hitokoto");
                }
            });
    }
    function writeHitokoto(text){
        if (text.length < 25) {
            $('#hitokotocontent').html(hitokototext);
        } else {
            getHitokoto();
        }
    }


$(document).ready(function(){
getAchives();
getHitokoto();
});
siteTime();