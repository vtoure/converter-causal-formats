const Causaljson2Mitab = require('../src/CausalJson2Mitab28');
const {getDbName, getId, getDbnameAndId} = require('../src/Fun');

const chai = require('chai');
chai.should();
const expect = chai.expect;


var date = new Date();
var month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // adds double digit in the month
var today = date.getFullYear() + '/' + month + '/' + date.getDate();

describe('CausalJson2Mitab28.js', () => {

    describe('fillMitab', () => {

        it('converts a causal JSON with most minimum causal information (source, target, effect, 1 reference, 1 evidence) into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/O43524",
                            "name": "FOXO3_HUMAN"
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                                    "name": "PMID:31664030"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000218",
                                    "name": "manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:P31750\tuniprot:O43524\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tuniprot:FOXO3_HUMAN(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:31664030\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();

        });

        it('converts a causal JSON with minimum info + biological activity at source & target into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "biologicalActivity": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0016301",
                                "name": "kinase activity"
                            }
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/O43524",
                            "name": "FOXO3_HUMAN",
                            "biologicalActivity": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0001216",
                                "name": "DNA-binding transcription activator activity"
                            }
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                                    "name": "PMID:31664030"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000218",
                                    "name": "manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:P31750\tuniprot:O43524\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tuniprot:FOXO3_HUMAN(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:31664030\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tgo:\"GO:0016301\"(kinase activity)\tgo:\"GO:0001216\"(DNA-binding transcription activator activity)\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();

        });

        it('converts a causal JSON with minimum info + biological type at source & target into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "biologicalType": {
                                "identifier": "http://purl.obolibrary.org/obo/MI_0326",
                                "name": "protein"
                            }
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000118689",
                            "name": "FOXO3",
                            "biologicalType": {
                                "identifier": "http://purl.obolibrary.org/obo/MI_0318",
                                "name": "nucleic acid"
                            }
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                                    "name": "PMID:31664030"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000218",
                                    "name": "manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:P31750\tensembl:ENSG00000118689\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tensembl:FOXO3(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:31664030\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0326\"(protein)\tpsi-mi:\"MI:0318\"(nucleic acid)\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();

        });

        it('converts a causal JSON with minimum info + taxon at source & target into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "entityTaxon": {
                                "identifier": "http://purl.bioontology.org/ontology/NCBITAXON/10090",
                                "name": "Mus musculus"
                            }
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000118689",
                            "name": "FOXO3",
                            "entityTaxon": {
                                "identifier": "http://purl.bioontology.org/ontology/NCBITAXON/3702",
                                "name": "Arabidopsis thaliana"
                            }
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/30462164",
                                    "name": "PMID:30462164"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000302",
                                    "name": "author statement used in manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:P31750\tensembl:ENSG00000118689\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tensembl:FOXO3(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:30462164\ttaxid:10090(Mus musculus)\ttaxid:3702(Arabidopsis thaliana)\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();

        });

        it('converts a causal JSON with minimum info + mechanism into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN"
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2240",
                            "name": "down-regulates",
                            "biologicalMechanism": {
                                "identifier": "http://purl.obolibrary.org/obo/MI_2247",
                                "name": "transcriptional regulation"
                            }
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000105173",
                            "name": "CCNE1"
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/16179649",
                                    "name": "PMID:16179649"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0005648",
                                    "name": "luciferase reporter gene assay evidence used in manual assertion"
                                }
                            }
                        ]
                    }
                ]
            }

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2247\"(transcriptional regulation)\tpsi-mi:\"MI:2240\"(down-regulates)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();
        });

        it('converts a causal JSON with minimum info + compartment of entities into a string object structured in the MITAB2.8 format', cb => {
            //Test with mitab string containing the header
            let mitab = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n"

            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN",
                            "entityCompartment": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0005634",
                                "name": "nucleus"
                            }
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2240",
                            "name": "down-regulates",
                            "biologicalMechanism": {
                                "identifier": "http://purl.obolibrary.org/obo/MI_2247",
                                "name": "transcriptional regulation"
                            }
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000105173",
                            "name": "CCNE1",
                            "entityCompartment": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0005634",
                                "name": "nucleus"
                            }
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/16179649",
                                    "name": "PMID:16179649"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0005648",
                                    "name": "luciferase reporter gene assay evidence used in manual assertion"
                                }
                            }
                        ]
                    }
                ]
            }

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\tgo:\"GO:0005634\"(cellular component)\tgo:\"GO:0005634\"(cellular component)\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2247\"(transcriptional regulation)\tpsi-mi:\"MI:2240\"(down-regulates)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();
        });

        it('converts a causal JSON with minimum info + biological modification into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "biologicalModifications": [
                                {
                                    "biologicalModification0": {
                                        "modification": {
                                            "identifier": "http://purl.obolibrary.org/obo/MOD_00696",
                                            "name": "phosphorylated residue"
                                        },
                                        "residue": {
                                            "identifier": "http://purl.obolibrary.org/obo/CHEBI_27570",
                                            "name": "histidine"
                                        },
                                        "position": {
                                            "name": "1"
                                        }
                                    }
                                }
                            ]
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000118689",
                            "name": "FOXO3",
                            "biologicalModifications": [
                                {
                                    "biologicalModification0": {
                                        "modification": {
                                            "identifier": "http://purl.obolibrary.org/obo/MOD_00695",
                                            "name": "sulfated residue"
                                        },
                                        "residue": {
                                            "identifier": "http://purl.obolibrary.org/obo/CHEBI_16235",
                                            "name": "guanine"
                                        },
                                        "position": {
                                            "name": "2"
                                        }
                                    }
                                }
                            ]
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/30462164",
                                    "name": "PMID:30462164"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000302",
                                    "name": "author statement used in manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:P31750\tensembl:ENSG00000118689\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tensembl:FOXO3(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:30462164\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\tphosphorylated residue:1-1(histidine)\tsulfated residue:2-2(guanine)\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();

        });

        it('converts a causal JSON with minimum info + compartment of interaction into a string object structured in the MITAB2.8 format', cb => {
            let mitab = "";
            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN"
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2240",
                            "name": "down-regulates",
                            "biologicalMechanism": {
                                "identifier": "http://purl.obolibrary.org/obo/MI_2247",
                                "name": "transcriptional regulation"
                            },
                            "effectCompartment": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0005634",
                                "name": "nucleus"
                            }
                        },
                        "target": {
                            "identifier": "https://www.ensembl.org/id/ENSG00000105173",
                            "name": "CCNE1"
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/16179649",
                                    "name": "PMID:16179649"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0005648",
                                    "name": "luciferase reporter gene assay evidence used in manual assertion"
                                }
                            }
                        ]
                    }
                ]
            }

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\tgo:\"GO:0005634\"(cellular component)\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2247\"(transcriptional regulation)\tpsi-mi:\"MI:2240\"(down-regulates)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();
        });


        it('converts a causal JSON into a MITAB2.8 format in a file that already contains an interaction', cb => {
            let mitab = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\tgo:\"GO:0005634\"(cellular component)\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2247\"(transcriptional regulation)\tpsi-mi:\"MI:2240\"(down-regulates)\n"

            const mitabExport = new Causaljson2Mitab(mitab);

            var causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "biologicalActivity": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0016301",
                                "name": "kinase activity"
                            }
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2241",
                            "name": "down-regulates activity"
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/O43524",
                            "name": "FOXO3_HUMAN",
                            "biologicalActivity": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0001216",
                                "name": "DNA-binding transcription activator activity"
                            }
                        },
                        "references": [
                            {
                                "reference0": {
                                    "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                                    "name": "PMID:31664030"
                                }
                            }
                        ],
                        "evidences": [
                            {
                                "evidence0": {
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000218",
                                    "name": "manual assertion"
                                }
                            }
                        ]
                    }
                ]
            };

            var mitabObj = "#ID(s) interactor A\tID(s) interactor B\tAlt. ID(s) interactor A\tAlt. ID(s) interactor B\tAlias(es) interactor A\tAlias(es) interactor B\tInteraction detection method(s)" +
                "\tPublication 1st author(s)\tPublication Identifier(s)\tTaxid interactor A\tTaxid interactor B\tInteraction type(s)\tSource database(s)\tInteraction identifier(s)\tConfidence value(s)" +
                "\tExpansion method(s)\tBiological role(s) interactor A\tBiological role(s) interactor B\tExperimental role(s) interactor A\tExperimental role(s) interactor B\tType(s) interactor A" +
                "\tType(s) interactor B\tXref(s) interactor A\tXref(s) interactor B\tInteraction Xref(s)\tAnnotation(s) interactor A\tAnnotation(s) interactor B\tInteraction annotation(s)\t" +
                "Host organism(s)\tInteraction parameter(s)\tCreation date\tUpdate date\tChecksum(s) interactor A\tChecksum(s) interactor B\tInteraction Checksum(s)\tNegative\tFeature(s) interactor A" +
                "\tFeature(s) interactor B\tStoichiometry(s) interactor A\tStoichiometry(s) interactor B\tIdentification method participant A\tIdentification method participant B" +
                "\tBiological effect(s) interactor A\tBiological effect(s) interactor B\tCausal regulatory mechanism\tCausal statement\n" +
                "uniprot:A0AVK6\tensembl:ENSG00000105173\t-\t-\tuniprot:E2F8_HUMAN(synonym)\tensembl:CCNE1(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:16179649\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\tgo:\"GO:0005634\"(cellular component)\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2247\"(transcriptional regulation)\tpsi-mi:\"MI:2240\"(down-regulates)\n" +
                "uniprot:P31750\tuniprot:O43524\t-\t-\tuniprot:AKT1_MOUSE(synonym)\tuniprot:FOXO3_HUMAN(synonym)\tpsi-mi:\"MI:0364\"(inferred by curator)\t-\tpubmed:31664030\t-\t-\t-\t-\t-\t-\t-\tpsi-mi:\"MI:2274\"(regulator)\tpsi-mi:\"MI:2275\"(regulator target)\tpsi-mi:\"MI:0499\"(unspecified role)\tpsi-mi:\"MI:0499\"(unspecified role)\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t" + today + "\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\t-\tgo:\"GO:0016301\"(kinase activity)\tgo:\"GO:0001216\"(DNA-binding transcription activator activity)\t-\tpsi-mi:\"MI:2241\"(down-regulates activity)\n"

            expect(mitabExport.fillMitab(causalJson).toString()).to.equal(mitabObj.toString());
            cb();
        });

    });
});










