/**
 * Created by Poli on 27.3.2017 г..
 */
function OnLoad(){
    OnLoadProject();
    OnLoadService();
    OnLoadAboutUs();
    OnLoadContactUs();
    OnLoadModal();

    let width=$(window).width();
    let height=width/1.9;
    $("#mainBg").eq(0).css("background-size",width+"px "+height+"px");
    $("#aboutUs").eq(0).css("width",width);
    $(window).resize(function(){
        let resizedWidth=$(window).width();
        $("#aboutUs").eq(0).css("width",resizedWidth);
        $("#mainBg").css("width",resizedWidth);
    })


    //Home
    $(".nav a").click(function(){
        $(".nav a").attr("id","");
        $(this).attr("id","selectedNav");
    })
    $("#home").on("click",function(){
        $('body,html').animate({ scrollTop: $("#line").offset().top}, 800);
    })
    $("#projects").on("click",function(){
        $('body,html').animate({ scrollTop: $("#project").offset().top }, 800);
    })
    $("#about").on("click",function(){
        $('body,html').animate({ scrollTop: $("#service").offset().top -50 }, 800);
    })
    $("#services").on("click",function(){
        $('body,html').animate({ scrollTop: $("#aboutUs").offset().top + 100 }, 800);
    })
    $("#contact").on("click",function(){
        $('body,html').animate({ scrollTop: $('#contactUs').offset().top }, 800);
    })

    $("#mainInfoButton").on("click",function(){
        $('body,html').animate({ scrollTop: $("#aboutUs").offset().top + 100 }, 800,function(){
            $("#aboutUsButton").trigger("click");
        });
    })
}

