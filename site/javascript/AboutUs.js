/**
 * Created by Poli on 11.5.2017 г..
 */
//AboutUs
function OnLoadAboutUs() {
    $(document).on("click", "#aboutUsButton", function () {
        $("#aboutUsInfo").animate({
            height: "45%",
        }, {
            duration: 300,
            specialEasing: {
                width: 'easeOutBounce'
            },
            complete: function () {
                $("#aboutUsButton").attr("id", "aboutUsButtonReturn");
                $("#aboutUsInfoHidden").css("display", "none");
                $("#aboutUsInfoDisplayed").css("display", "block");
                $("#aboutUsButtonReturn p").css("font-size", "1.5vw").css("width", "70%");
                $("#aboutUsButtonReturn").css("height", "12%").css("bottom", "0%");
                $("#aboutUsButtonReturn p").text("ВЪРНИ СЕ");
            }
        })
    })
    $(document).on("click", "#aboutUsButtonReturn", function () {
        $("#aboutUsInfo").animate({
            height: "30%",
        }, {
            duration: 300,
            specialEasing: {
                width: 'easeInBounce'
            },
            complete: function () {
                $("#aboutUsButtonReturn").attr("id", "aboutUsButton");
                $("#aboutUsInfoDisplayed").css("display", "none");
                $("#aboutUsInfoHidden").css("display", "block");
                $("#aboutUsButton p").css("font-size", "1.3vw").css("width", "85%");
                $("#aboutUsButton").css("height", "auto").css("bottom", "5%");
                $("#aboutUsButton p").text("ПОКАЖИ ОЩЕ");
            }
        })
    })
}