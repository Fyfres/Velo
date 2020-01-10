class Commandes{
    constructor(style,pour,heure,quantite,borne,duree,uniteDuree) {
        this.style = style;
        this.pour = pour;
        this.heure = heure;
        this.quantite = quantite;
        this.borne = borne;
        this.duree = duree;
        this.uniteDuree = uniteDuree;
    }
    getPrix(){
        //Create price depending on the unity mesure
        let base;
        let prix;
        if (this.style == "Electrique"){
            base = 10;
        } else if (this.style == "Classique"){
            base = 7
        }
        if(this.uniteDuree == ordreUnitee[0]){
            base /= 24;
            base /= 60;
            prix = base*this.duree*this.quantite;
            return parseFloat(prix.toFixed(2));
        } else if(this.uniteDuree == ordreUnitee[1]){
            base /= 24;
            prix = base*this.duree*this.quantite;
            return parseFloat(prix.toFixed(2));
        } else if(this.uniteDuree == ordreUnitee[2]){
            prix = base*this.duree*this.quantite;
            return parseFloat(prix.toFixed(2));
        } else if(this.uniteDuree == ordreUnitee[3]){
            base *= 7;
            prix = base*this.duree*this.quantite;
            return parseFloat(prix.toFixed(2));
        } else if(this.uniteDuree == ordreUnitee[4]){
            base *= 7;
            base *= 4;
            prix = base*this.duree*this.quantite;
            return parseFloat(prix.toFixed(2));
        }
    }
}