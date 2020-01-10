class Pos {
  constructor(lat,lng,infos) {
      this.lat = lat;
      this.lng = lng;
      this.info = infos?infos:"";
  }
    //function convert file from json to js (because no types) to use directly if only one table
    static convertToProduct(objJson) {
        return new Pos(objJson.lat, objJson.lng, objJson.info);
    }

    //function convert file from json to js (because no types)
    static fromJsonToArray(jsonObjArray) {
        return jsonObjArray.map(elt => Pos.convertToProduct(elt));
    }
}