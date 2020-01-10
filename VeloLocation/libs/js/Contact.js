let resultForm = [];
let input = 0;
let erreur = false;
let ordreInput = ["Nom","Prenom","Email","Message"];

$(".contactons").on("change",function () {
    let monErreur = this.id+"2";
    $("#"+monErreur).html("");
});

$("#cliquezMoi").on("click",function(){
    console.log("coucou");
    erreur = false;
    let monErreur = this.id+"2";
    for (let i = 0; i < $(".contactons").length; i++) {

        if(!remplie($(".contactons")[i].value)){
            let monErreur = $(".contactons")[i].id+"2";
            $("#"+monErreur).html("(Veuillez saisir une valeur)")
        } else {
            sauvegarde($(".contactons")[i].value);
        }
        input++;
    }
    if(!erreur){
        if($("#emailF2").val()!="(Veuillez saisir une valeur)"){
            if(!verifMail($(".contactons")[2].value)){
                $("#emailF2").html("(Veuillez saisir une addresse mail valable !)");
                erreur = true;
            }
        }
        if(!erreur){
            this.form.reset();
            alert("Votre message à bien était envoyé, merci à vous !");
        }
    }
});
function remplie(champ){
    if(champ!=""){
        return true
    } else {
        return false
    }
}
function sauvegarde(valeur){
    resultForm.push(valeur);
}

function verifMail(email){
    var myRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/;
    if(!myRegex.test(email)){
        return false;
    } else {
        return true;
    }
}