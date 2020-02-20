module.exports = {generateMitab};
const { getDbName, getId, getDbnameAndId } = require('./fun');

let header =    "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n"

/**
 * Column by column, the MITAB file is filled with data.
 * @param file
 * @returns {string}
 */
function generateMitab(file){
    //set header
    let mitab = "";
    mitab = mitab + header;

    if(file.causalStatement){

        //1. source id
        mitab = mitab + getDbnameAndId(file.causalStatement[0].source.identifier) + "\t";

        //2. target id
        mitab = mitab + getDbnameAndId(file.causalStatement[0].target.identifier) + "\t";

        //3. and 4. no alternative identifiers for source and target
        mitab = mitab + "-\t-\t";

        //5. alias for source
        mitab = mitab +  getDbName(file.causalStatement[0].source.identifier) + ":" + file.causalStatement[0].source.name + "(synonym)\t";

        //6. alias for target
        mitab = mitab +  getDbName(file.causalStatement[0].target.identifier) + ":" + file.causalStatement[0].target.name + "(synonym)\t";

        //7. interaction detection method
        mitab = mitab + "psi-mi:\"MI:0364\"(inferred by curator)\t";

        //8. TODO: possibly add publication first author
        mitab = mitab + "-\t";

        //9. publication identifier(s)
        var publications = "";
        for(var i = 0; i < file.causalStatement[0].references.length; i++){
            publications = publications + getDbnameAndId(file.causalStatement[0].references[i]["reference"+i].identifier) + "|";
        }

        mitab = mitab + publications.slice(0, -1) + "\t"; //slice removes the last "|" character

        //10. Taxid source
        "entityTaxon" in file.causalStatement[0].source ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].source.entityTaxon.identifier) + "(" + file.causalStatement[0].source.entityTaxon.name + ")\t" : mitab = mitab + "-\t";

        //11. Taxid target
        "entityTaxon" in file.causalStatement[0].target ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].target.entityTaxon.identifier) + "(" + file.causalStatement[0].target.entityTaxon.name + ")\t" : mitab = mitab + "-\t";

        //12. Interaction type(s) TODO
        mitab = mitab + "-\t";

        // 13. Source database(s) - 14. Interaction identifier(s) - 15. Confidence value(s) - 16. Expansion method(s)
        mitab = mitab + "-\t-\t-\t-\t";

        //17. Biological role(s) source
        mitab = mitab + "psi-mi:\"MI:2274\"(regulator)\t";

        //18. Biological role(s) target
        mitab = mitab + "psi-mi:\"MI:2275\"(regulator target)\t";

        //19. Experimental role(s) source
        mitab = mitab + "psi-mi:\"MI:0499\"(unspecified role)\t";

        //20. Experimental role(s) target
        mitab = mitab + "psi-mi:\"MI:0499\"(unspecified role)\t";

        //21. Interactor type source
        "biologicalType" in file.causalStatement[0].source ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].source.biologicalType.identifier) + "(" + file.causalStatement[0].source.biologicalType.name + ")\t" : mitab = mitab + "-\t";
        //22. Interactor type target
        "biologicalType" in file.causalStatement[0].target ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].target.biologicalType.identifier) + "(" + file.causalStatement[0].target.biologicalType.name + ")\t" : mitab = mitab + "-\t";

        //23. Xref(s) source
        mitab = mitab + "-\t";
        //24. Xref(s) target
        mitab = mitab + "-\t";
        //25. Xref interaction
        mitab = mitab + "-\t";
        //26. Annotations source
        mitab = mitab + "-\t";
        //27. Annotations target
        mitab = mitab + "-\t";
        //28. Annotations interaction
        mitab = mitab + "-\t";

        //29. NCBI Taxid host organism
        mitab = mitab + "-\t";
        //30.Parameters of the interaction
        mitab = mitab + "-\t";

        //31. Creation date
        var date = new Date();
        var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // adds double digit in the month

        var today = date.getFullYear()+'/'+month+'/'+date.getDate();
        mitab = mitab + today + "\t";

        //32. Update date
        mitab = mitab + "-\t";

        //33. Checksum source, 34. Checksum target, 35. Checksum interaction
        mitab = mitab + "-\t-\t-\t";

        //36. negative
        mitab = mitab + "-\t";

        //37. Feature source
        var list_modifs = "";
        if("biologicalModifications" in file.causalStatement[0].source){
            for(var i = 0; i < file.causalStatement[0].source.biologicalModifications.length; i++){
                "modification" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i].modification.name : "";
                "pos" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i].pos.name + "-" + list_modifs + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i].pos.name : "";
                "residue" in file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + "(" + file.causalStatement[0].source.biologicalModifications[i]["biologicalModification"+i].residue.name + ")" : "";
                list_modif = list_modifs + "|";
            }
            list_modifs.slice(0, -1);
            mitab = mitab + list_modifs;
        }
        else{
            mitab = mitab + "-\t";
        }


        //38. Feature target
        list_modifs = "";
        if("biologicalModifications" in file.causalStatement[0].target){
            for(var i = 0; i < file.causalStatement[0].target.biologicalModifications.length; i++){
                "modification" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i].modification.name : "";
                "pos" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i].pos.name + "-" + list_modifs + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i].pos.name : "";
                "residue" in file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i] ?
                    list_modifs = list_modifs + "(" + file.causalStatement[0].target.biologicalModifications[i]["biologicalModification"+i].residue.name + ")" : "";
                list_modif = list_modifs + "|";
            }
            list_modifs.slice(0, -1);
            mitab = mitab + list_modifs;
        }
        else{
            mitab = mitab + "-\t";
        }
        //39. Stoichiometry source
        mitab = mitab + "-\t";

        //40. Stoichiometry target
        mitab = mitab + "-\t";

        //41. Participant identification method source
        mitab = mitab + "-\t";

        //42. Participant identification method target
        mitab = mitab + "-\t";

        //43. Biological effect source
        "biologicalActivity" in file.causalStatement[0].source ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].source.biologicalActivity.identifier) + "(" + file.causalStatement[0].source.biologicalActivity.name + ")\t" : mitab = mitab + "-\t";

        //44. Biological effect target
        "biologicalActivity" in file.causalStatement[0].target ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].target.biologicalActivity.identifier) + "(" + file.causalStatement[0].target.biologicalActivity.name + ")\t" : mitab = mitab + "-\t";

        //45. Causal regulatory mechanism
        "biologicalMechanism" in file.causalStatement[0].effect ?
            mitab = mitab + getDbnameAndId(file.causalStatement[0].effect.biologicalMechanism.identifier) + "(" + file.causalStatement[0].target.biologicalMechanism.name + ")\t" : mitab = mitab + "-\t";

        //46. Causal statement
        mitab = mitab + getDbnameAndId(file.causalStatement[0].effect.identifier) + "(" + file.causalStatement[0].effect.name + ")";

        //console.log(file.causalStatement[0].evidences)
        // var list_evidence = "";
        // for(var i = 0; i < file.causalStatement[0].evidences.length; i++){
        //     list_evidence = list_evidence + file.causalStatement[0].evidences[i]["evidence"+i].identifier
        //     console.log(file.causalStatement[0].evidences[i]["evidence"+i].identifier)
        // }
        //
        }
    return mitab;

}

