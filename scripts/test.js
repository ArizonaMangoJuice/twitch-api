$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers: {
            'Client-ID': "lugmgd9ooe2hknbn517gxepwew70rl"
        },
        success: function(data1) {
            if (data1.stream === null) {
                $("#fccStatus").html("Free Code Camp OFFLINE");
            } else {
                $("#fccStatus").html("Free Code Camp ONLINE");
            }
        }
    });

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
        headers: {
            'Client-ID': "lugmgd9ooe2hknbn517gxepwew70rl"
        },
        success: function(data2) {
                for (var i = 0; i < data2.follows.length; i++) {
                    // gets displayName
                    var displayName = data2.follows[i].channel.display_name;
                    var logo = data2.follows[i].channel.logo;
                    var status = data2.follows[i].channel.status;
                    if (logo == null) {
                        logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
                    }
                    $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div id='twitch-name' class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + "<p id='twitch-status'>" + status + "</p>" + "</div></div>");
                }
            }
            ///////
    });
    var deletedFollowers = ['brunofin', 'comster404'];
    for (var i = 0; i < deletedFollowers.length; i++) {
        $.ajax({
            type: "GET",
            url: "https://api.twitch.tv/kraken/streams/" + deletedFollowers[i],
            headers: {
                'Client-ID': "lugmgd9ooe2hknbn517gxepwew70rl"
            },
            error: function(data3) {
                var logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
                var displayName = data3.statusText;
                console.log(data3.statusText);
                var status = data3.status;
                $("#followerInfo").prepend("<div class = 'row'>" + "<div class = 'col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
            }
        });
    }
});