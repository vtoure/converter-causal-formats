const causalJson2Mitab28= require("./CausalJson2Mitab28");
const flatTempJson2causaljson = require("./FlatTempJson2CausalJson");

module.exports = class ConvertCausalFormats {

    constructor(choice, input, output) {
        this.choice = choice; //type of conversion
        this.input = input; // input file with data
        this.output = output; // output file to be filled
    }

    doConversion(){
        switch (this.choice) {
            case "flatjson2causaljson":
                var causalJsonObj = new flatTempJson2causaljson(this.output);
                causalJsonObj.exportCausalJson(this.input);
                return causalJsonObj.causalJson;
            case "causaljson2mitab":
                var mitabObj = new causalJson2Mitab28(this.output);
                mitabObj.fillMitab(this.input);
                return mitabObj.mitab;
            case "flatjson2mitab":
                var tempOutput = [];
                var causalJsonObj = new flatTempJson2causaljson(tempOutput);
                causalJsonObj.exportCausalJson(this.input);
                var mitabObj = new causalJson2Mitab28(this.output);
                mitabObj.fillMitab(causalJsonObj.causalJson);
                return mitabObj.mitab;
            default:
                console.log("error choice of conversion");

        }


    }
}