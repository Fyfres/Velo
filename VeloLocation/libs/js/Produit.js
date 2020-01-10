$("div").last().css("display","none");

const TVA = 0.2;

//Initiate the interactive html
$("#commandesPanier").html("<h5 class=\"text-white\">- Rien actuellement</h5>");
$("#prixHT").html("<p class=\"text-white ml-auto h5\">0 €</p>");
$("#prixTTC").html("<p class=\"text-white ml-auto h4\">0 €</p>");

//Array of Commands
let resultForm = [];
let ordreUnitee = ["minutes","heures","jours","semaines","mois"];

//Max value of duration set to 30 because the initial value is for minutes
let monMax = 30;

//Check mesure unity just in case
verifUnitee();

//Check if user is coming from the home page and have choose a type of bike
//Change input for the choosen type if yes
//Remove the item once done
let typeChoisis = localStorage.getItem("type");
if(typeChoisis!=""){
    if(typeChoisis == "elec"){
        $("select option[value='Electrique']").prop("selected", true);
        localStorage.removeItem("type");
    } else if(typeChoisis == "classic"){
        $("select option[value='Classique']").prop("selected", true);
        localStorage.removeItem("type");
    }
}

$("#DureeU").on("change",function(){
    verifUnitee();
});


function setMaxMin(max){
    //Set the max value the duration input can take
    if(max!=undefined){
        monMax=max;
    }
}


$('#Duree').on('input', function () {
    //Check if the duration input is superior of the max value it can take if yes it set it's value to the max
    if($('#Duree').val()>monMax){
        $('#Duree').val(monMax);
    }
});

$("#resetons").on('click', function() {
    //When click the reset button reset all the form and set the value of the duration to 30 because the base unity of mesure is "minute(s)"
    $(".commandes").each(function(){
        this.form.reset();
    });
    $("#Duree").val(30);
    //reset the marker placed by the user
    createdMarker.setMap(null);
    createdMarker = "";
    //reset the diplayed path between the created marker and the selected one
    directionsDisplay.setMap(null);
    directionsDisplay = "";
    //reshow all markers
    myMarkers();
    //delete the click listener, the user cannot place a marker anymore
    google.maps.event.clearListeners(map, 'click');
});

$("#qts").on("change", function () {
    //On change of the quantity input if the value is negative set value to 1
    //Change because we can only set a negative with the keyboard so we have to wait for a change
   if($("#qts").val()<=0){
       $("#qts").val(1);
   }
});


function verifUnitee(){
    //Check which unity of mesure is whished and put the correct max number possible in the input before
    if($("#DureeU").val()==ordreUnitee[0]){
        $("#Duree").val(30);
        $("#Duree").prop( "disabled", true );
    } else if ($("#DureeU").val()==ordreUnitee[1]){
        $("#Duree").val(23);
        setMaxMin(23);
        $("#Duree").prop( "disabled", false );
    } else if ($("#DureeU").val()==ordreUnitee[2]){
        $("#Duree").val(6);
        setMaxMin(6);
        $("#Duree").prop( "disabled", false );
    } else if ($("#DureeU").val()==ordreUnitee[3]){
        $("#Duree").val(3);
        setMaxMin(3);
        $("#Duree").prop( "disabled", false );
    } else if ($("#DureeU").val()==ordreUnitee[4]){
        $("#Duree").val(12);
        setMaxMin(12);
        $("#Duree").prop( "disabled", false );
    }
}

//When changing the value of an input check if there was an error if yes delete it
$(".commandes").on("change",function () {
    let monErreur = this.id+"3";
    $("#"+monErreur).html("");
});


$("#cliquezMoi").on("click",function (){
    //Initiate an error value to false (no problem encountered)
    let erreur = false;
    for (let ii = 0; ii < $(".commandes").length; ii++) {
        //Check if the current input checked is empty if yes return an error message an set the error to true (problem encountered)
        if(!remplie($(".commandes")[ii].value)){
            $(".commandes2")[ii].innerHTML="(Veuillez saisir une valeur)";
            erreur = true;
        }
    }
    //If no problem encountered when submitting the form then launch a save
    if(!erreur){
        sauvegarde();
    }
});

//Check if all input are not empty
function remplie(champ){
    if(champ!=""){
        return true
    } else {
        return false
    }
}

//Create a temporary array an push an object in the array of commands an item created from the temporary array
function sauvegarde(){
    let tableau = [];
    for (let i = 0; i < $(".commandes").length; i++) {
        tableau.push($(".commandes")[i].value);
    }
    resultForm.push(new Commandes(tableau[0],tableau[1],tableau[2],tableau[3],tableau[4],tableau[5],tableau[6]));
    tableau = [];
    ajoutPanier();
}

//Delete an item with the clicked button from the array of commands
function jaiClique(idBouton){
    console.log(idBouton);
    resultForm.splice( idBouton, 1 );
    ajoutPanier();
};


function ajoutPanier(){
    let panier = "";
    let totalPrixHT = 0;
    let totalPrixTTC = 0;
    let hr = "<hr class=\"border-white w-75 mx-auto\">";
    let id = 0;
    if(resultForm.length>=1){
        //Go through each item in the form and show it in the basket if there's something in it
        for (let i = 0; i < resultForm.length; i++) {
            if(resultForm.length == i+1){
                hr = "";
            }
            panier += "<div class=\"col-12\">" +
                "<p class=\"text-white\">"+resultForm[i].style+" x"+resultForm[i].quantite+" - "+resultForm[i].duree+" "+resultForm[i].uniteDuree+"</p>" +
                "</div>" +
                "<div class=\"col-12 \"><p class=\"text-white\"> A partir du "+resultForm[i].pour+" à "+resultForm[i].heure+"</p>" +
                "</div>" +
                "<div class=\"col-8\">" +
                "<h4 class=\"text-white\">"+resultForm[i].getPrix()+" €</h4>" +
                "</div><div class=\"col-4 text-center mb-3\"><button onclick=\"jaiClique(this.id)\" type=\"button\" id=\""+id+"\" class=\"btn btn-danger deletons\">delete</button></div>"+hr;
            totalPrixHT += resultForm[i].getPrix();
            id++;
        }
        totalPrixTTC = totalPrixHT+(totalPrixHT*TVA);
        totalPrixHT = Math.round(totalPrixHT*100)/100;
        totalPrixTTC = Math.round(totalPrixTTC*100)/100;
        $("#commandesPanier").html(panier);
    } else {
        $("#commandesPanier").html("<h5 class=\"text-white\">- Rien actuellement</h5>");
    }
    $("#prixHT").html("<p class=\"text-white ml-auto h5\">"+totalPrixHT+" €</p>");
    $("#prixTTC").html("<p class=\"text-white ml-auto h4\">"+totalPrixTTC+" €</p>");
    myMarkers();
}

let i=0;
let markers;
let map;
let contentString;
let infowindow;
let lastInfoWindow;
let createdMarker="";
let directionsDisplay="";
let handler = function(event) {
    //check if this is the first time the function is called
    if(createdMarker == ""){
        //create a new marker with the user selected position
        createdMarker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            icon: new google.maps.MarkerImage("../libs/img/creaMarker.png")
        });
        createRoad();
    } else {
        //delete the actual marker previously placed by the user
        createdMarker.setMap(null);
        //create a new marker with the user selected position
        createdMarker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            icon: new google.maps.MarkerImage("../libs/img/creaMarker.png")
        });
        createRoad();
    }
};
function createRoad(){
    let roadColor = ["red","blue","brown","green","pink"];
    //if there's already a path shown delete it
    if(directionsDisplay != ""){
        directionsDisplay.setMap(null);
    }

    //setting the option of how the path should be done
    let directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({'map': map});
    let request = {
        origin: {lat:createdMarker.getPosition().lat(),lng:createdMarker.getPosition().lng()},
        destination: {lat:markers[0].getPosition().lat(),lng:markers[0].getPosition().lng()},
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.DirectionsUnitSystem.METRIC
    };
    //create and show the path
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions({polylineOptions: {
                    strokeColor: roadColor[Math.floor(Math.random() * roadColor.length)],
                },'suppressMarkers': true});
        }
    });
}

$('#Borne').on("change",()=>{
    //when choosing a terminals
    //call to change the displayed marker
    myMarkers($('#Borne')[0].value);
    //if there's already a marker created
    if(directionsDisplay != ""){
        directionsDisplay.setMap(null);
        directionsDisplay = "";
    }
    //call handler() when the user click on the map
    google.maps.event.addListener(map, 'click', handler);
});

//Called when calling the Google API
function initMap() {
    //initiate the map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 50.6333, lng: 3.0667}
    });
    //call to iniate the markers
    myMarkers();
}

function myMarkers(bornVal){
    //if there's already marker defined delete them all
    if(markers!=undefined){
        for (let j = 0; j < markers.length; j++) {
            markers[j].setMap(null);
        }
    }
    //get all the infos of the terminals from a json
    let locations = [];
    $.post("../libs/php/get_places.php", {table:"myLocations"}).done(function(resp){
        locations = Pos.fromJsonToArray(JSON.parse(resp));
        //check if we come from changing the select terminal
        //if yes you only take the corresponding positions
        if(bornVal != undefined){
            locations=[locations[parseInt(bornVal)-1]];
        }
        //create an array of marker corresponding to the object in the array of terminals
        markers = locations.map(function(location, i) {
            bornVal?i=bornVal:i++;
            i = i.toString();
            return new google.maps.Marker({
                position: location,
                map: map,
                icon: new google.maps.MarkerImage("../libs/img/iconMaison.png")
            });
        });

        
        for (let j = 0; j < markers.length; j++) {
            //Open InfoWindow onClick
            /*markers[j].addListener('click', function() {
                currentBorne = markers[j];
                contentString = locations[j].info;
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                if(lastInfoWindow!=undefined){
                    lastInfoWindow.close(map, markers[j]);
                }
                if(infowindow.opened==undefined){
                    infowindow.opened = false;
                }
                    infowindow.open(map, markers[j]);
                    lastInfoWindow=infowindow;
            });*/
            //Open InfoWindow onMouseOver
            markers[j].addListener("mouseover", function(){
                currentBorne = markers[j];
                contentString = locations[j].info;
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                infowindow.open(map, markers[j]);
                lastInfoWindow=infowindow;
            });
            //Close Window onMouseOut
            markers[j].addListener("mouseout", function(){
                lastInfoWindow.close(map, markers[j]);
            })
        }
    });
}