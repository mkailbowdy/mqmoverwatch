var compareBtn = document.getElementById("getPlayer");


if (compareBtn) {
    compareBtn.addEventListener("click", getPlayer);
    console.log("Compare button is working");
} else {
    console.log("Compare button not working");
}

/* Overwatch API */
function getPlayer () {
    // Get the default API url using the platform and region and tag entered
    var region = "";
    var platform = "";
    var regions = document.getElementsByName("region");
    var platforms = document.getElementsByName("platform");
    
    function userPreferences(pref, prefs) {
        if (prefs) {
            for (var i = 0; i < prefs.length; i++) {
                if (prefs[i].checked) {
                    pref = prefs[i].value;
                    console.log(pref);
                    return pref;
                }
            }
        }
    }
    
    region = userPreferences(region, regions);
    platform = userPreferences(platform, platforms);
    
    var playerTag = document.getElementById("playerTag").value;
    var overwatchAPI = "https://api.lootbox.eu/" + platform + "/" + region + "/" + playerTag + "/profile";
    console.log(overwatchAPI);
    //var overwatchAPI = "https://api.lootbox.eu/pc/us/FortyLashes-11902/profile";

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Turn the server's response into a string
            var serverResponse = xhr.responseText;
            // Parse the JSON received and turn into a JS object. Access the data property to get the player info we want
            var playerInfo = JSON.parse(serverResponse).data;
            // playerInfo is an object that contains player's information
            console.log(playerInfo); // See if the info is comes up
            
            // Change Player Names
            var player1 = document.getElementById("player1");
            
            if (player1) {
                player1.innerHTML = playerInfo.username;
                console.log(player1);
            }
        } 
    }
    
    
    xhr.open("GET", overwatchAPI, true);
    xhr.send();
    
}