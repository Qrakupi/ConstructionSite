function OnLoadModal() {
//RegisterModal
    $("#register").on("click", function () {
        $("#registerModal").show();
    })
    $("#signup").on("submit", function (e) {
        e.preventDefault();
        var email = $("#signup .pass").first().val();
        var pass = $("#signup .pass").last().val();


        $.ajax({
            url: "https://api.mlab.com/api/1/databases/constructionsite/collections/user?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
            data: JSON.stringify({"user": email, "pass": pass}),
            type: "POST",
            contentType: "application/json",
            success: function (data) {
                alert("register successful!");
                $("#registerModal").hide();
            },
            error: function (xhr, status, err) {
                console.log(err);
                $("#registerModal").hide();
            }
        });
    })
    $("#registerModal").on("click", function () {
        var modal = $('#registerModal');
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    })
//LoginModal
    $("#login").on("click", function () {
        $("#loginModal").show();
    })
    $("#signin").on("submit", function (e) {
        e.preventDefault();
        var logUsername = $("#signin .pass").first().val();
        var logPass = $("#signin .pass").last().val();

        $.ajax({
            url: "https://api.mlab.com/api/1/databases/constructionsite/collections/user?apiKey=CQRhiWr3zv7T1AOXyEHsf06wODgj5iWd",
        }).done(function (data) {
            $.each(data, function (key, data) {
                if (logUsername == data.user) {
                    if (logPass == data.pass) {
                        loggedIn(data);
                    }
                }
            })
        })
    })
    $("#loginModal").on("click", function () {
        var modal = $('#loginModal');
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    })

//Logout
    $("#logout").on("click", function () {
        $("#logout").hide();
        $("#register").show();
        $("#login").show();
    })
}

function loggedIn(data){
    if(data.user!="admin@abv.bg"){
        $("#addProject").hide();
        $("#addPerson").hide();
    }
    $("#loginModal").hide();
    $("#register").hide();
    $("#login").hide();
    $("#logout").show();
}

