const {getDbName, getId, getDbnameAndId} = require('./Fun');

function setHeader(mitab) {
    let header = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
        "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
        "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
        "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
        "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
        "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
        "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n"

    if(!(mitab.includes(header))){
        mitab = mitab + header;
        return mitab
    }
    else{
        return mitab;
    }
}

module.exports = class CausalJson2Mitab28 {
    constructor(mitab) {
        if (mitab) {
            this.mitab = mitab;
        } else {
            this.mitab = "";
        }
    }

    /**
     * Column by column, the MITAB file is filled with data.
     * @param file
     * @returns {string}
     */
    fillMitab(file) {
         this.mitab = setHeader(this.mitab);

        if (file.causalStatement) {
            //1. source id
            this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].source.identifier) + "\t";

            //2. target id
            this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].target.identifier) + "\t";

            //3. and 4. no alternative identifiers for source and target
            this.mitab = this.mitab + "-\t-\t";

            //5. alias for source
            this.mitab = this.mitab + getDbName(file.causalStatement[0].source.identifier) + ":" + file.causalStatement[0].source.name + "(synonym)\t";

            //6. alias for target
            this.mitab = this.mitab + getDbName(file.causalStatement[0].target.identifier) + ":" + file.causalStatement[0].target.name + "(synonym)\t";

            //7. interaction detection method
            this.mitab = this.mitab + "psi-mi:\"MI:0364\"(inferred by curator)\t";

            //8. TODO: possibly add publication first author
            this.mitab = this.mitab + "-\t";

            //9. publication identifier(s)
            var publications = "";
            for (var i = 0; i < file.causalStatement[0].references.length; i++) {
                publications = publications + getDbnameAndId(file.causalStatement[0].references[i]["reference" + i].identifier) + "|";
            }

            this.mitab = this.mitab + publications.slice(0, -1) + "\t"; //slice removes the last "|" character

            //10. Taxid source
            "entityTaxon" in file.causalStatement[0].source ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].source.entityTaxon.identifier) + "(" + file.causalStatement[0].source.entityTaxon.name + ")\t" : this.mitab = this.mitab + "-\t";

            //11. Taxid target
            "entityTaxon" in file.causalStatement[0].target ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].target.entityTaxon.identifier) + "(" + file.causalStatement[0].target.entityTaxon.name + ")\t" : this.mitab = this.mitab + "-\t";

            //12. Interaction type(s) TODO
            this.mitab = this.mitab + "-\t";

            // 13. Source database(s) - 14. Interaction identifier(s) - 15. Confidence value(s) - 16. Expansion method(s)
            this.mitab = this.mitab + "-\t-\t-\t-\t";

            //17. Biological role(s) source
            this.mitab = this.mitab + "psi-mi:\"MI:2274\"(regulator)\t";

            //18. Biological role(s) target
            this.mitab = this.mitab + "psi-mi:\"MI:2275\"(regulator target)\t";

            //19. Experimental role(s) source
            this.mitab = this.mitab + "psi-mi:\"MI:0499\"(unspecified role)\t";

            //20. Experimental role(s) target
            this.mitab = this.mitab + "psi-mi:\"MI:0499\"(unspecified role)\t";

            //21. Interactor type source
            "biologicalType" in file.causalStatement[0].source ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].source.biologicalType.identifier) + "(" + file.causalStatement[0].source.biologicalType.name + ")\t" : this.mitab = this.mitab + "-\t";
            //22. Interactor type target
            "biologicalType" in file.causalStatement[0].target ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].target.biologicalType.identifier) + "(" + file.causalStatement[0].target.biologicalType.name + ")\t" : this.mitab = this.mitab + "-\t";

            //23. Xref(s) source
            "entityCompartment" in file.causalStatement[0].source ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].source.entityCompartment.identifier) + "(cellular component)\t" : this.mitab = this.mitab + "-\t";
            //mitab = mitab + "-\t";
            //24. Xref(s) target
            "entityCompartment" in file.causalStatement[0].target ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].target.entityCompartment.identifier) + "(cellular component)\t" : this.mitab = this.mitab + "-\t";
            // mitab = mitab + "-\t";
            //25. Xref interaction
            "effectCompartment" in file.causalStatement[0].effect ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].effect.effectCompartment.identifier) + "(cellular component)\t" : this.mitab = this.mitab + "-\t";
            //mitab = mitab + "-\t";
            //26. Annotations source
            this.mitab = this.mitab + "-\t";
            //27. Annotations target
            this.mitab = this.mitab + "-\t";
            //28. Annotations interaction
            this.mitab = this.mitab + "-\t";

            //29. NCBI Taxid host organism
            this.mitab = this.mitab + "-\t";
            //30.Parameters of the interaction
            this.mitab = this.mitab + "-\t";

            //31. Creation date
            var date = new Date();
            var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // adds double digit in the month

            var today = date.getFullYear() + '/' + month + '/' + date.getDate();
            this.mitab = this.mitab + today + "\t";

            //32. Update date
            this.mitab = this.mitab + "-\t";

            //33. Checksum source, 34. Checksum target, 35. Checksum interaction
            this.mitab = this.mitab + "-\t-\t-\t";

            //36. negative
            this.mitab = this.mitab + "-\t";

            //37. Feature source

            if ("biologicalModifications" in file.causalStatement[0].source) {
                let list_modif_s = "";
                for (var i = 0; i < file.causalStatement[0].source.biologicalModifications.length; i++) {
                    "modification" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modif_s = list_modif_s + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i].modification.name : "";
                    "position" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modif_s = list_modif_s + ":" + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i].position.name + "-" + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i].position.name : "";
                    "residue" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modif_s = list_modif_s + "(" + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification" + i].residue.name + ")" : "";
                    list_modif_s = list_modif_s + "|";
                }
                list_modif_s = list_modif_s.slice(0, -1);
                this.mitab = this.mitab + list_modif_s + "\t";
            } else {
                this.mitab = this.mitab + "-\t";
            }

            //38. Feature target

            if ("biologicalModifications" in file.causalStatement[0].target) {
                let list_modifs = "";
                for (var i = 0; i < file.causalStatement[0].target.biologicalModifications.length; i++) {
                    "modification" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modifs = list_modifs + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i].modification.name : "";
                    "position" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modifs = list_modifs + ":" + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i].position.name + "-" + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i].position.name : "";
                    "residue" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i] ?
                        list_modifs = list_modifs + "(" + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification" + i].residue.name + ")" : "";
                    list_modifs = list_modifs + "|";
                }

                list_modifs = list_modifs.slice(0, -1);
                this.mitab = this.mitab + list_modifs + "\t";
            } else {
                this.mitab = this.mitab + "-\t";
            }
            //39. Stoichiometry source
            this.mitab = this.mitab + "-\t";

            //40. Stoichiometry target
            this.mitab = this.mitab + "-\t";

            //41. Participant identification method source
            this.mitab = this.mitab + "-\t";

            //42. Participant identification method target
            this.mitab = this.mitab + "-\t";

            //43. Biological effect source
            "biologicalActivity" in file.causalStatement[0].source ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].source.biologicalActivity.identifier) + "(" + file.causalStatement[0].source.biologicalActivity.name + ")\t" : this.mitab = this.mitab + "-\t";

            //44. Biological effect target
            "biologicalActivity" in file.causalStatement[0].target ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].target.biologicalActivity.identifier) + "(" + file.causalStatement[0].target.biologicalActivity.name + ")\t" : this.mitab = this.mitab + "-\t";

            //45. Causal regulatory mechanism
            "biologicalMechanism" in file.causalStatement[0].effect ?
                this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].effect.biologicalMechanism.identifier) + "(" + file.causalStatement[0].effect.biologicalMechanism.name + ")\t" : this.mitab = this.mitab + "-\t";

            //46. Causal statement
            this.mitab = this.mitab + getDbnameAndId(file.causalStatement[0].effect.identifier) + "(" + file.causalStatement[0].effect.name + ")\n";

            //console.log(file.causalStatement[0].evidences)
            // var list_evidence = "";
            // for(var i = 0; i < file.causalStatement[0].evidences.length; i++){
            //     list_evidence = list_evidence + file.causalStatement[0].evidences[i]["evidence"+i].identifier
            //     console.log(file.causalStatement[0].evidences[i]["evidence"+i].identifier)
            // }
            //
        }
        return this.mitab;

    }
}

