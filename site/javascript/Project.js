//Project
var projects=[];
var leftProjCount=0,middleProjCount=1,rightProjCount=2;
function OnLoadProject(){
    projectUpdate();
    $("#gallLeftButton").click(function () {
        var border = projects.length - 1;
        leftProjCount = leftProjCount == border ? 0 : leftProjCount + 1;
        middleProjCount = middleProjCount == border ? 0 : middleProjCount + 1;
        rightProjCount = rightProjCount == border ? 0 : rightProjCount + 1;

        var leftProject = projects[leftProjCount];
        var middleProject = projects[middleProjCount]
        var rightProject = projects[rightProjCount];

        var removingFrame = $(".frames").eq(0);
        removingFrame.hide(300, function () {
            removingFrame.remove()
        });
        $(".frames").eq(1).attr("id", "leftFrame");
        $(".frames").eq(2).attr("id", "middleFrame");

        addFrame(rightProject.galleryPicture, rightProject.country, rightProject.city, "right");
    });
    $("#gallRightButton").click(function () {
        var border = projects.length - 1;
        leftProjCount = leftProjCount == 0 ? border : leftProjCount - 1;
        middleProjCount = leftProjCount == border - 1 ? border : middleProjCount - 1;
        rightProjCount = middleProjCount == border - 1 ? border : rightProjCount - 1;

        var leftProject = projects[leftProjCount];
        var middleProject = projects[middleProjCount]
        var rightProject = projects[rightProjCount];

        var removingFrame = $(".frames").eq(2);
        removingFrame.hide(300, function () {
            removingFrame.remove()
        });
        $(".frames").eq(0).attr("id", "middleFrame");
        $(".frames").eq(1).attr("id", "rightFrame");

        addFrame(leftProject.galleryPicture, leftProject.country, leftProject.city, "left");
    });
    $(document).on("click", ".frameMore", function () {
        let currentFrameId = $(this).parent().parent().attr("id");
        let currentProject;
        if (currentFrameId == "leftFrame") {
            currentProject = projects[leftProjCount];
        }
        else if (currentFrameId == "midFrame") {
            currentProject = projects[middleProjCount];
        }
        else {
            currentProject = projects[rightProjCount];
        }

        changeProjectGalleryModal(currentProject);
        $("#galleryModal").css("display", "block");
    })

///ProjectGalleryModal
    $("#modalPictures img").on("click", function () {
        $("#modalPictures img").attr("id", "");
        $(this).attr("id", "selectedModalPic");
        let pictureUrl = $(this).attr("src");
        changeModalMainPicture(pictureUrl);
    })
    $("#modalClose").click(function () {
        $("#galleryModal").hide();
        resetGalleryModalSelectedPicture();
    })
    $("#galleryModal").on("click", function (event) {
        var modal = $('#galleryModal');
        if ($(event.target).is(modal)) {
            modal.hide();
            resetGalleryModalSelectedPicture();
        }
    })

//AddProjectModal
    var addProjectModal = $('#addProjectModal');
    $("#addProject").on("click", function () {
        addProjectModal.css("display", "block");
    })
    $("#addProjectClose").on("click", function () {
        addProjectModal.css("display", "none");
    });
    $("#addProjectModal").on("click", function () {
        if ($(event.target).is(addProjectModal)) {
            addProjectModal.hide();
        }
    })
    $("#addProjectForm").on("submit", function (e) {
        e.preventDefault();

        var country = $("#addProjectCountry").val();
        var city = $("#addProjectCity").val();
        var clientName = $("#addProjectClientName").val();
        var leaderName = $("#addProjectLeaderName").val();
        var spaceInMeters = $("#addProjectSpace").val();
        var galleryPic = $("#addProjectGalleryPic").val();
        var firPic = $("#addProjectFirstPic").val();
        var secPic = $("#addProjectSecondPic").val();
        var thirdPic = $("#addProjectThirdPic").val();

        $.ajax({
            url: "https://api.mlab.com/api/1/databases/constructionsite/collections/project?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
            data: JSON.stringify({
                "country": country, "city": city, "clientName": clientName, "leaderName": leaderName
                , "spaceInMeters": spaceInMeters, "galleryPic": galleryPic, "pictures": [firPic, secPic, thirdPic]
            }),
            type: "POST",
            contentType: "application/json",
            success: function (data) {
                alert("posting successful!");
                projectUpdate();
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });

        $("#addProjectCountry").val("");
        $("#addProjectCity").val("");
        $("#addProjectClientName").val("");
        $("#addProjectLeaderName").val("");
        $("#addProjectSpace").val("");
        $("#addProjectGalleryPic").val("");
        $("#addProjectFirstPic").val("");
        $("#addProjectSecondPic").val("");
        $("#addProjectThirdPic").val("");
        addProjectModal.hide();
    })
}

class Project{
    constructor(pictures,galleryPicture,country,city,clientName,leaderName,spaceInMeters){
        this.pictures=pictures;
        this.galleryPicture=galleryPicture;
        this.city=city;
        this.country=country;
        this.clientName=clientName;
        this.leaderName=leaderName;
        this.spaceInMeters=spaceInMeters;
    }
}

function addFrame(picUrl,country,city,direction){

    var city=$("<p class='frameCity'>").html(city);
    var country=$("<p class='frameCountry'>").html(country);
    var picture=$("<img src='pictures/"+picUrl+"' class='framePicture'>");
    var moreInfo=$("<div class='frameMore'>").append("<img src='pictures/info.png' class='morePicture'>");
    var frameInfo=$("<div class='frameInfo'>").append(picture)
        .append($("<div style='display:inline-block'>").append(country).append(city)).append(moreInfo);
    var id=direction=="right"?"rightFrame":"leftFrame";
    var frame=$("<div class='cl-md-6 frames' id="+id+" style='display:none'>").append(frameInfo)



    if(direction=="right"){
        $("#gallery").append(frame);
    }
    else{
        $("#gallery").prepend(frame);
    }
    frame.show(300);
}
function changeProjectGalleryModal(currentProject){
    var currentPicture=$("#modalPictures div").first();
    $(currentPicture).children().first().attr("src","pictures/"+currentProject.pictures[0]);
    currentPicture=currentPicture.next();
    $(currentPicture).children().first().attr("src","pictures/"+currentProject.pictures[1]);
    currentPicture=currentPicture.next();
    $(currentPicture).children().first().attr("src","pictures/"+currentProject.pictures[2]);
    $("#modalMain").attr("src","pictures/"+currentProject.galleryPicture);
    $("#modalCapital").text(currentProject.country);
    $("#modalCity").text(currentProject.city);
    $("#modalClient p").text(currentProject.clientName);
    $("#modalLeader p").text(currentProject.leaderName);
    $("#modalSize p").html(currentProject.spaceInMeters + "&sup2; кв.метра");

}
//ProjectGallery
function resetGalleryModalSelectedPicture(){
    $("#modalPictures img").attr("id","");
    $("#modalPictures img").first().attr("id","selectedModalPic")
}
function changeModalMainPicture(pictureUrl){
    $("#modalGallery img").attr("src",pictureUrl);
}
//Add Project
function projectUpdate(){
    var currentProjects=[];
    $.ajax({
        url: "https://api.mlab.com/api/1/databases/constructionsite/collections/project?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
    }).done(function (data) {
        $.each(data, function (key, data) {
            var project = new Project(data.pictures,data.galleryPic,data.country,data.city,
                data.clientName,data.leaderName,data.spaceInMeters);
            currentProjects.push(project);
        })
        projects=currentProjects;
        projectGalleryUpdate();
    })
}
function projectGalleryUpdate(){
    var firstProject=projects[0],secondProject=projects[1],thirdProject=projects[2];

    $("#leftFrame .framePicture").attr("src","pictures/"+firstProject.galleryPicture);
    $("#leftFrame .frameCountry").html(firstProject.country);
    $("#leftFrame .frameCity").html(firstProject.city);

    $("#midFrame .framePicture").attr("src","pictures/"+secondProject.galleryPicture);
    $("#midFrame .frameCountry").html(secondProject.country);
    $("#midFrame .frameCity").html(secondProject.city);

    $("#rightFrame .framePicture").attr("src","pictures/"+thirdProject.galleryPicture);
    $("#rightFrame .frameCountry").html(thirdProject.country);
    $("#rightFrame .frameCity").html(thirdProject.city);
}






