const ConvertCausalFormats = require('../src/ConvertCausalFormats');

const chai = require('chai');
chai.should();
const expect = chai.expect;

var date = new Date();
var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // adds double digit in the month
var today = date.getFullYear() + '/' + month + '/' + date.getDate();

describe('ConvertCausalFormat.js', () =>{
    const causalExport = new ConvertCausalFormats();

    describe('doConversion', () => {
        it('translates a flat template json into a causal json format', cb =>{
            causalExport.choice = "flatjson2causaljson";
            //input is a vsm json object
            causalExport.input  = {
                "source": {
                    "str": "E2F8_HUMAN",
                    "id": "https://www.uniprot.org/uniprot/A0AVK6"
                },
                "effect": {
                    "str": "down-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2240"
                },
                "target": {
                    "str": "CCNE1",
                    "id": "https://www.ensembl.org/id/ENSG00000105173"
                },
                "reference": [
                    {
                        "str": "PMID:16179649",
                        "id": "https://www.ncbi.nlm.nih.gov/pubmed/16179649"
                    }
                ],
                "evidence": [
                    {
                        "str": "luciferase reporter gene assay evidence used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0005648"
                    }
                ]
            };
            causalExport.output = [];

            const converted = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN"
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2240",
                            "name": "down-regulates"
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000105173",
                            "name": "CCNE1"
                        },
                        "references": [{
                            "reference0": {
                                "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/16179649",
                                "name": "PMID:16179649"
                            }
                        }],
                        "evidences": [{
                            "evidence0": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0005648",
                                "name": "luciferase reporter gene assay evidence used in manual assertion"
                            }
                        }]
                    }
                ]
            };
            causalExport.doConversion().should.deep.equal(converted);

            cb();
        })

        it('translate a flat template json into a mitab2.8 format', cb =>{
            causalExport.choice = "flatjson2mitab";
            causalExport.input = {
                "source": {
                    "str": "E2F8_HUMAN",
                    "id": "https://www.uniprot.org/uniprot/A0AVK6"
                },
                "effect": {
                    "str": "down-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2240"
                },
                "target": {
                    "str": "CCNE1",
                    "id": "https://www.ensembl.org/id/ENSG00000105173"
                },
                "reference": [
                    {
                        "str": "PMID:16179649",
                        "id": "https://www.ncbi.nlm.nih.gov/pubmed/16179649"
                    }
                ],
                "evidence": [
                    {
                        "str": "luciferase reporter gene assay evidence used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0005648"
                    }
                ]
            };
            causalExport.output = "";

            var converted = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2240\"(down-regulates)\n"
            expect(causalExport.doConversion().toString()).to.equal(converted.toString());
            cb();
        })

        it('translate a causal json into a mitab2.8 format', cb =>{
            causalExport.choice = "causaljson2mitab";
            causalExport.input = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN"
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2240",
                            "name": "down-regulates"
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000105173",
                            "name": "CCNE1"
                        },
                        "references": [{
                            "reference0": {
                                "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/16179649",
                                "name": "PMID:16179649"
                            }
                        }],
                        "evidences": [{
                            "evidence0": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0005648",
                                "name": "luciferase reporter gene assay evidence used in manual assertion"
                            }
                        }]
                    }
                ]
            };
            causalExport.output = "";

            var converted = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2240\"(down-regulates)\n"
            expect(causalExport.doConversion().toString()).to.equal(converted.toString());
            cb();
        })

    });
});