const { setValue } = require('./Fun');

module.exports = class FlatTempJson2CausalJson {

    constructor(causalJson) {
        //Array of causal statements in a causalJson format
        this.causalJson = {};
        // A map with VSM terms as keys and causalJson structure as values
        this.mapping = FlatTempJson2CausalJson.initMapping();
    }
    
    /**
     * Map of VSM json objects (keys) to causal json objects (values)
     * @returns {Map<any, any>}
     */
    static initMapping() {
        let VSM_TO_CAUSALJSON = new Map();
        VSM_TO_CAUSALJSON.set("source", ["source"]);
        VSM_TO_CAUSALJSON.set("target", ["target"]);
        VSM_TO_CAUSALJSON.set("effect", ["effect"]);

        VSM_TO_CAUSALJSON.set("sourceType", ["source", "biologicalType"]);
        VSM_TO_CAUSALJSON.set("sourceActivity", ["source", "biologicalActivity"]);
        VSM_TO_CAUSALJSON.set("sourceTaxon", ["source", "entityTaxon"]);
        VSM_TO_CAUSALJSON.set("sourceModificationMod", ["source", "biologicalModifications", "biologicalModification", "modification"]);
        VSM_TO_CAUSALJSON.set("sourceModificationModPos", ["source", "biologicalModifications", "biologicalModification", "position"]);
        VSM_TO_CAUSALJSON.set("sourceModificationModRes", ["source", "biologicalModifications", "biologicalModification", "residue"]);
        VSM_TO_CAUSALJSON.set("sourceCompartment", ["source", "entityCompartment"]);
        VSM_TO_CAUSALJSON.set("sourceExperiment", ["source", "experimentalSetups", "experimentalSetup"]);

        VSM_TO_CAUSALJSON.set("targetType", ["target", "biologicalType"]);
        VSM_TO_CAUSALJSON.set("targetActivity", ["target", "biologicalActivity"]);
        VSM_TO_CAUSALJSON.set("targetTaxon", ["target", "entityTaxon"]);
        VSM_TO_CAUSALJSON.set("targetModificationMod", ["target", "biologicalModifications", "biologicalModification", "modification"]);
        VSM_TO_CAUSALJSON.set("targetModificationModPos", ["target", "biologicalModifications", "biologicalModification", "position"]);
        VSM_TO_CAUSALJSON.set("targetModificationModRes", ["target", "biologicalModifications", "biologicalModification", "residue"]);
        VSM_TO_CAUSALJSON.set("targetCompartment", ["target", "entityCompartment"]);
        VSM_TO_CAUSALJSON.set("targetExperiment", ["target", "experimentalSetups", "experimentalSetup"]);

        VSM_TO_CAUSALJSON.set("effectMechanism", ["effect", "biologicalMechanism"]);
        VSM_TO_CAUSALJSON.set("effectTaxon", ["effect", "effectTaxon"]);
        VSM_TO_CAUSALJSON.set("effectCompartment", ["effect", "effectCompartment"]);
        VSM_TO_CAUSALJSON.set("effectCellLine", ["effect", "cellLine"]);
        VSM_TO_CAUSALJSON.set("effectCellType", ["effect", "cellType"]);
        VSM_TO_CAUSALJSON.set("effectTissueType", ["effect", "tissueType"]);
        VSM_TO_CAUSALJSON.set("reference", ["references", "reference"]);
        VSM_TO_CAUSALJSON.set("evidence", ["evidences", "evidence"]);
        return VSM_TO_CAUSALJSON;
    }

    /**
     * Get a Causal Json from a flat VSM object containing a causal interaction.
     * @param flatVsm
     * @returns {boolean|{}|*}
     */
    exportCausalJson(flatVsm) {
        //Temporary json object that will be filled
        let tempJson = {};
        let path = "";

        for (let vsmTerm in flatVsm) {
            if (flatVsm.hasOwnProperty(vsmTerm)) {
                if (!flatVsm[vsmTerm] || !flatVsm) {
                    return true;
                }
                switch (vsmTerm) {
                    case "source":
                    case "target":
                    case "effect":
                        path = (this.mapping.get(vsmTerm))[0];
                        setValue(path, flatVsm[vsmTerm], tempJson);
                        break;
                    case "targetModificationMod":
                    case "sourceModificationMod":
                    case "sourceModificationModRes":
                    case "targetModificationModRes":
                    case "sourceModificationModPos":
                    case "targetModificationModPos":
                        for (let index of flatVsm[vsmTerm].keys()) {
                            if (index in flatVsm[vsmTerm] !== false) {
                                path = this.mapping.get(vsmTerm)[0] + "." + this.mapping.get(vsmTerm)[1] + "." + this.mapping.get(vsmTerm)[2]+index + "." + this.mapping.get(vsmTerm)[3];
                                setValue(path, flatVsm[vsmTerm][index], tempJson)
                            }
                        }
                        break;
                    case "reference":
                    case "evidence":
                        for (let index of flatVsm[vsmTerm].keys()) {
                            path = this.mapping.get(vsmTerm)[0] + "." + this.mapping.get(vsmTerm)[1]+index;
                            setValue(path, flatVsm[vsmTerm][index], tempJson);
                        }
                        break;
                    case "targetExperiment":
                    case "sourceExperiment":
                        for (let index of flatVsm[vsmTerm].keys()) {
                            if (index in flatVsm[vsmTerm] !== false) {
                                path = this.mapping.get(vsmTerm)[0] + "." + this.mapping.get(vsmTerm)[1] + "." + this.mapping.get(vsmTerm)[2]+index;
                                setValue(path, flatVsm[vsmTerm][index], tempJson)
                            }
                        }
                        break;
                    default: //biologicalActivity, entityTaxon, etc.
                        path = this.mapping.get(vsmTerm)[0] + "." + this.mapping.get(vsmTerm)[1];
                        setValue(path, flatVsm[vsmTerm], tempJson);
                        break;
                }
            }
        }

        //CausalJson object contains an array of causal statements, filled with the temporary json.
        this.causalJson["causalStatement"] = [];
        this.causalJson.causalStatement.push(tempJson);
        return this.causalJson;
    }
}
