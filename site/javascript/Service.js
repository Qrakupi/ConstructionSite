/**
 * Created by Poli on 11.5.2017 г..
 */
//Services
var team=[];
var teamCount=0,middlePersonCount=1,otherPersonCount=2;
const animationEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

function OnLoadService(){
    personUpdate();
    $("#serInfoPictures li:last").addClass("serInfoPictureSelected");
    $(document).on("click", "#firstPersonFrame", function () {
        var border = team.length - 1;
        teamCount = teamCount == 0 ? border : teamCount - 1;
        middlePersonCount = teamCount == border - 1 ? border : middlePersonCount - 1;
        otherPersonCount = middlePersonCount == border - 1 ? border : otherPersonCount - 1;

        var currentPerson = team[teamCount];
        var otherPerson = team[otherPersonCount]
        var middlePerson = team[middlePersonCount];

        var removingFrame = $(".serGallerySide").eq(2);
        removingFrame.addClass("animated zoomOutRight").one(animationEnd, function () {
            removingFrame.removeClass("zoomOutRight");
            removingFrame.css("visibility", "hidden");
            addPerson(currentPerson, otherPerson, "left");
            changePersonInfo(middlePerson);
        });
    })
    $(document).on("click", "#thirdPersonFrame", function () {

        let border = team.length - 1;
        teamCount = teamCount == border ? 0 : teamCount + 1;
        middlePersonCount = middlePersonCount == border ? 0 : middlePersonCount + 1;
        otherPersonCount = otherPersonCount == border ? 0 : otherPersonCount + 1;

        var currentPerson = team[teamCount];
        var otherPerson = team[otherPersonCount];
        var middlePerson = team[middlePersonCount];

        var removingFrame = $(".serGallerySide").eq(0);
        removingFrame.addClass("animated zoomOutLeft").one(animationEnd, function () {
            removingFrame.removeClass("zoomOutLeft");
            removingFrame.css("visibility", "hidden");
            addPerson(otherPerson, currentPerson, "right");
            changePersonInfo(middlePerson);
        });
    })
    $("#serInfoPictures li").on("click", function () {
        $("#serInfoPictures li").removeClass("serInfoPictureSelected");
        $(this).addClass("serInfoPictureSelected");

        var index = $("#serInfoPictures li").index(this);
        changeSerInfoPicture(team[middlePersonCount], index);
    })

//AddPersonModal
    var addPersonModal = $('#addPersonModal');
    $("#addPerson").on("click", function () {
        addPersonModal.css("display", "block");
    })
    $("#addPersonClose").on("click", function () {
        addPersonModal.css("display", "none");
    });
    $("#addPersonModal").on("click", function () {
        if ($(event.target).is(addPersonModal)) {
            addPersonModal.hide();
        }
    })
    $("#addPersonForm").on("submit", function (e) {
        e.preventDefault();

        var name = $("#addPersonName").val();
        var town = $("#addPersonTown").val();
        var proffession = $("#addPersonProffession").val();
        var galleryPic = $("#addPersonGalleryPic").val();
        var firPic = $("#addPersonFirstPic").val();
        var secPic = $("#addPersonSecondPic").val();
        var thirdPic = $("#addPersonThirdPic").val();

        $.ajax({
            url: "https://api.mlab.com/api/1/databases/constructionsite/collections/my-coll?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
            data: JSON.stringify({
                "name": name, "town": town, "proffession": proffession, "galleryPic": galleryPic,
                "pictures": [firPic, secPic, thirdPic]
            }),
            type: "POST",
            contentType: "application/json",
            success: function (data) {
                alert("posting successful!");
                personUpdate();
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $("#addPersonName").val("");
        $("#addPersonTown").val("");
        $("#addPersonProffession").val("");
        $("#addPersonGalleryPic").val("");
        $("#addPersonFirstPic").val("");
        $("#addPersonSecondPic").val("");
        $("#addPersonThirdPic").val("");
        addPersonModal.hide();
    })
}

class Person{
    constructor(pictureUrl,galleryPicture,personName,personCity,personPosition){
        this.pictureUrl=pictureUrl;
        this.personCity=personCity;
        this.personName=personName;
        this.personPosition=personPosition;
        this.galleryPicture=galleryPicture;
    }
}

function addPerson(person,otherPerson,direction){
    var url=person.galleryPicture;
    var id;
    if(direction=="left"){
        id="firstPerson";
        $(".serGallerySide").eq(0).attr("id","secondPersonFrame");
        $(".serGallerySide").eq(1).attr("id","thirdPersonFrame");
        $(".serGallerySide").eq(2).remove();
    }
    else{
        id="thirdPerson";
        $(".serGallerySide").eq(1).attr("id","firstPersonFrame");
        $(".serGallerySide").eq(2).attr("id","secondPersonFrame");
        $(".serGallerySide").eq(0).remove();
    }

    var personImage=$("<img src='pictures/"+url+"'>");
    var frame=$("<div class='serGallerySide' id="+id+"Frame"+" style='visibility:hidden'>").append(personImage);

    var effectClass;
    if(direction=="left"){
        $("#serviceGallery").prepend(frame);
        effectClass="animated zoomInLeft";
    }
    else{
        $("#serviceGallery").append(frame);
        effectClass="animated zoomInRight";
    }

    AddPersonHover(person,otherPerson,id);

    frame.css("visibility","visible")
    frame.addClass(effectClass)
        .one(animationEnd, function () {
            frame.removeClass(effectClass);
        });

}
function AddPersonHover(person,otherPerson,id){
    var personName=person.personName;
    var personPosition=person.personPosition;
    var personHover=$("<div id='"+id+"Hover'>")
        .append($("<p>"+personName+"</p>")).append($("<span>"+personPosition+"</span>"));

    var otherName=otherPerson.personName;
    var otherPosition=otherPerson.personPosition;
    var otherId=id=="firstPerson"?"thirdPerson":"firstPerson";
    var otherHover=$("<div id='"+otherId+"Hover'>")
        .append($("<p>"+otherName+"</p>")).append($("<span>"+otherPosition+"</span>"));

    $("#"+id+"Frame").append(personHover);
    $("#"+otherId+"Frame").append(otherHover);
    $("#secondPersonFrame div").remove();

}

function changePersonInfo(currentPerson){
    changeSerInfoPicture(currentPerson,2);
    $("#serMoreInfo").addClass("animated fadeOutUp").one(animationEnd,function(){
        $(this).css("visibility","hidden");
        $(this).removeClass("animated fadeOutUp");
        changeMoreInfo(currentPerson);
        $(this).css("visibility","visible");
        $("#serMoreInfo").addClass("animated fadeInUp").one(animationEnd,function(){
            $(this).removeClass("animated fadeInUp");
        });
    });
}
function changeMoreInfo(currentPerson){
    $("#servicePersonCity").text(currentPerson.personCity);
    $("#servicePersonName").text(currentPerson.personName);
}

function changeSerInfoPicture(currentPerson,pictureIndex){
    var pictureUrl=currentPerson.pictureUrl[pictureIndex];
    $("#serInfoPicture").addClass("animated fadeOutUp").one(animationEnd,function(){
        $(this).css("visibility","hidden");
        $(this).removeClass("animated fadeOutUp");
        $(this).css("background-image",'url("pictures/'+pictureUrl+'")');
        $(this).css("visibility","visible");
        $(this).addClass("animated fadeInUp").one(animationEnd,function(){
            $(this).removeClass("animated fadeInUp");
        });
    });
}

//Add Person Modal
function personUpdate() {
    var currentTeam=[];
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/constructionsite/collections/my-coll?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
    }).done(function (data) {
        $.each(data, function (key, data) {
            var person = new Person(data.pictures, data.galleryPic, data.name, data.town, data.proffession);
            currentTeam.push(person);
        })
        team=currentTeam;
        serviceGalleryUpdate();
    })

}
function serviceGalleryUpdate(){
    var firstPersonImage=team[0].galleryPicture
        ,secondPersonImage=team[1].galleryPicture,thirdPersonImage=team[2].galleryPicture;

    $("#firstPersonFrame img").attr("src","pictures/"+firstPersonImage);
    $("#secondPersonFrame img").attr("src","pictures/"+secondPersonImage);
    $("#thirdPersonFrame img").attr("src","pictures/"+thirdPersonImage);

}

