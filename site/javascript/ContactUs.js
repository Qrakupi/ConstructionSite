/**
 * Created by Poli on 11.5.2017 г..
 */
//ContactUsLocation
function OnLoadContactUs() {
    $("#contactUsLocationGoogleMap").mouseover(function () {
        $("#contactUsLocationBox").addClass("animated fadeOut").one(animationEnd, function () {
            $("#contactUsLocationBox").removeClass("animated fadeOut");
            $("#contactUsLocationBox").css("visibility", "hidden");
        })
    }).mouseout(function () {
        $("#contactUsLocationBox").addClass("animated fadeIn").one(animationEnd, function () {
            $("#contactUsLocationBox").removeClass("animated fadeIn");
            $("#contactUsLocationBox").css("visibility", "visible");
        });
    })
}