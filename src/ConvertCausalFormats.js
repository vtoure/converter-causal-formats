const causalJson2Mitab28= require("./CausalJson2Mitab28");
const flatTempJson2Mitab28 = require("./FlatTempJson2CausalJson");

module.exports = class ConvertCausalFormats {

    constructor(choice, input, output) {
        this.choice = choice; //type of conversion
        this.input = input; // input file with data
        this.output = output; // output file to be filled
    }

    doConversion(){
        switch (this.choice) {
            case "flatjson2causaljson":
                var causalJsonObj = new flatTempJson2Mitab28(this.output);
                causalJsonObj.exportCausalJson(this.input);
                return causalJsonObj;
            case "causaljson2mitab":;
                var mitabObj = new causaljson2Mitab(this.output);
                mitabObj.fillMitab(this.input);
                return mitabObj;
            case "flatjson2mitab":
                var causalJsonObj = new flatTempJson2Mitab28(this.output);
                var mitabObj = new causalJson2Mitab28(this.input);
                mitabObj.fillMitab(causalJsonObj);
                return mitabObj;
            default:
                console.log("error choice of conversion");

        }


    }
}