const causalJSON2MITAB28= require("./causalJSON2MITAB28");
const flatJSON2MITAB28 = require("./flatJSON2CausalJSON");

module.exports = class ConvertCausalFormats {

    constructor(choice, o) {
        this.choice = choice;
        this.jsonObject = o;
    }

    doConversion(){
        switch (this.choice) {
            case "flatjson2causaljson":
                var causalJsonObj = new flatJSON2MITAB28(this.jsonObject, "test");

            case "causaljson2mitab":
                causalJSON2MITAB28.generateMitab(this.jsonObject);

            case "flatjson2mitab":
                var causalJsonObj = new flatJSON2MITAB28(this.jsonObject, "test");
                Causaljson2Mitab.generateMitab(causalJsonObj.causalJson);
            case "flatjson2mijson":
            case "causaljson2mijson":
            default:
                console.log("error choice of conversion");

        }


    }
}