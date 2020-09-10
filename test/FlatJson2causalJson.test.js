const FlatJson2CausalJson = require('../src/FlatTempJson2CausalJson');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('FlatTempJson2CausalJson.js', () => {
    const causalExport = new FlatJson2CausalJson();

    describe('exportCausalJson', () => {
        it('returns the simplest causal json format that can be generated', cb => {
            const vsmJson = {
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
            }

            const causalJson = {
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
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json format with multiple references', cb => {
            const vsmJson = {
                "source": {
                    "str": "AKT1_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/P31750"
                },
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "RFOX2_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/Q8BP71"
                },
                "reference": [
                    {
                        "str": "PMID:31664030",
                        "id": "https://www.ncbi.nlm.nih.gov/pubmed/31664030"
                    },
                    {
                        "str": "PMID:31885633",
                        "id": "https://www.ncbi.nlm.nih.gov/pubmed/31885633"
                    },
                    {
                        "str": "PMID:31209238",
                        "id": "https://www.ncbi.nlm.nih.gov/pubmed/31209238"
                    }
                ],
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "references": [{
                            "reference0": {
                                "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                                "name": "PMID:31664030"
                            },
                            "reference1": {
                                "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31885633",
                                "name": "PMID:31885633"
                            },
                            "reference2": {
                                "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31209238",
                                "name": "PMID:31209238"
                            }
                        }
                        ],
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/Q8BP71",
                            "name": "RFOX2_MOUSE"
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json format with multiple evidence', cb => {
            const vsmJson = {
                "source": {
                    "str": "AKT1_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/P31750"
                },
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "RFOX2_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/Q8BP71"
                },
                "evidence": [
                    {
                        "str": "cell transfection experiment evidence used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0005802"
                    },
                    {
                        "str": "MTT assay evidence used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0001235"
                    },
                    {
                        "str": "reporter gene assay evidence used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0007682"
                    },
                    {
                        "str": "computational inference used in manual assertion",
                        "id": "http://purl.obolibrary.org/obo/ECO_0007631"
                    }
                ],
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "evidences": [{
                            "evidence0": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0005802",
                                "name": "cell transfection experiment evidence used in manual assertion"
                            },
                            "evidence1": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0001235",
                                "name": "MTT assay evidence used in manual assertion"
                            },
                            "evidence2": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0007682",
                                "name": "reporter gene assay evidence used in manual assertion"
                            },
                            "evidence3": {
                                "identifier": "http://purl.obolibrary.org/obo/ECO_0007631",
                                "name": "computational inference used in manual assertion"
                            }
                        }
                        ],
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/Q8BP71",
                            "name": "RFOX2_MOUSE"
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json format with multiple biological modifications', cb => {
            const vsmJson = {
                "source": {
                    "str": "AKT1_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/P31750"
                },
                "sourceActivity": {
                    "str": "JUN kinase kinase activity",
                    "id": "http://purl.obolibrary.org/obo/GO_0008545"
                },
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "RFOX2_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/Q8BP71"
                },
                "targetTaxon": {
                    "str": "Homo heidelbergensis",
                    "id": "http://purl.bioontology.org/ontology/NCBITAXON/1425170"
                },
                "sourceModificationMod": [
                    {
                        "str": "phosphorylated residue",
                        "id": "http://purl.obolibrary.org/obo/MOD_00696"
                    },
                    {
                        "str": "acetylated residue",
                        "id": "http://purl.obolibrary.org/obo/MOD_00394"
                    }
                ],
                "sourceModificationModRes": [
                    {
                        "str": "Serine",
                        "id": "http://www.co-ode.org/ontologies/amino-acid/2006/05/18/amino-acid.owl#S"
                    },
                    {
                        "str": "Histidine",
                        "id": "http://www.co-ode.org/ontologies/amino-acid/2006/05/18/amino-acid.owl#H"
                    }
                ],
                "sourceModificationModPos": [
                    {
                        "str": "123",
                    }

                ],
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "source": {
                            "biologicalActivity": {
                                "identifier": "http://purl.obolibrary.org/obo/GO_0008545",
                                "name": "JUN kinase kinase activity"
                            },
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "biologicalModifications": [{
                                "biologicalModification0": {
                                    "modification": {
                                        "identifier": "http://purl.obolibrary.org/obo/MOD_00696",
                                        "name": "phosphorylated residue"
                                    },
                                    "residue":{
                                        "identifier": "http://www.co-ode.org/ontologies/amino-acid/2006/05/18/amino-acid.owl#S",
                                        "name": "Serine",
                                    },
                                    "position":{
                                        "name": "123"
                                    }
                                },
                                "biologicalModification1": {
                                    "modification":{
                                        "identifier" : "http://purl.obolibrary.org/obo/MOD_00394",
                                        "name": "acetylated residue"
                                    },
                                    "residue":{
                                        "identifier": "http://www.co-ode.org/ontologies/amino-acid/2006/05/18/amino-acid.owl#H",
                                        "name": "Histidine",
                                    }
                                }
                            }]
                        },
                        "target": {
                            "entityTaxon": {
                                "identifier": "http://purl.bioontology.org/ontology/NCBITAXON/1425170",
                                "name": "Homo heidelbergensis"
                            },
                            "identifier": "https://www.uniprot.org/uniprot/Q8BP71",
                            "name": "RFOX2_MOUSE"
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json format with multiple experimental setups in target', cb =>{
            const vsmJson = {
                "source": {
                    "str": "AKT_MLVAT",
                    "id": "https://www.uniprot.org/uniprot/P31748"
                },
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "FOXO3_HUMAN",
                    "id": "https://www.uniprot.org/uniprot/O43524"
                },
                "targetExperiment": [
                    {
                        "str": "engineered",
                        "id": "http://purl.obolibrary.org/obo/MI_0331"
                    },
                    {
                        "str": "over expressed level",
                        "id": "http://purl.obolibrary.org/obo/MI_0506"
                    }
                ]
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31748",
                            "name": "AKT_MLVAT"

                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/O43524",
                            "name": "FOXO3_HUMAN",
                            "experimentalSetups":[{
                                "experimentalSetup0":{
                                    "identifier":"http://purl.obolibrary.org/obo/MI_0331",
                                    "name": "engineered"
                                },
                                "experimentalSetup1":{
                                    "identifier":"http://purl.obolibrary.org/obo/MI_0506",
                                    "name":"over expressed level"
                                }
                            }]
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns a causal json format with several experimental setups in both source and target', cb => {
            const vsmJson = {
                "source": {
                    "str": "AKT1_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/P31750"
                },
                "sourceExperiment": [
                    {
                        "str": "engineered",
                        "id": "http://purl.obolibrary.org/obo/MI_0331"
                    },
                    {
                        "str": "over expressed level",
                        "id": "http://purl.obolibrary.org/obo/MI_0506"
                    }
                ],
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "FOXO1_MOUSE",
                    "id": "https://www.uniprot.org/uniprot/Q9R1E0"
                },
                "targetExperiment": [
                    {
                        "str": "ectopic expression evidence",
                        "id": "http://purl.obolibrary.org/obo/ECO_0000017"
                    }
                ]
            }
            const causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31750",
                            "name": "AKT1_MOUSE",
                            "experimentalSetups": [{
                                "experimentalSetup0":{
                                    "name": "engineered",
                                    "identifier": "http://purl.obolibrary.org/obo/MI_0331"
                                },
                                "experimentalSetup1":{
                                    "name": "over expressed level",
                                    "identifier": "http://purl.obolibrary.org/obo/MI_0506"
                                }
                            }]
                        },
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/Q9R1E0",
                            "name": "FOXO1_MOUSE",
                            "experimentalSetups": [{
                                "experimentalSetup0":{
                                    "name": "ectopic expression evidence",
                                    "identifier": "http://purl.obolibrary.org/obo/ECO_0000017"
                                }
                            }]
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json format with "null" examples handled', cb => {
            const vsmJson = {
                "source": {
                    "str": "AKT_MLVAT",
                    "id": "https://www.uniprot.org/uniprot/P31748"
                },
                "sourceModificationMod": [
                    {
                        "str": "phosphorylated residue",
                        "id": "http://purl.obolibrary.org/obo/MOD_00696"
                    },
                    {
                        "str": "acetylated residue",
                        "id": "http://purl.obolibrary.org/obo/MOD_00394"
                    }
                ],
                "sourceModificationModPos": [
                    null,
                    {
                        "str": "123"
                    }
                ],
                "sourceModificationModRes": [
                    {
                        "str": "histidine",
                        "id": "http://purl.obolibrary.org/obo/CHEBI_27570"
                    }
                ],
                "effect": {
                    "str": "up-regulates",
                    "id": "http://purl.obolibrary.org/obo/MI_2235"
                },
                "target": {
                    "str": "FOXO3_HUMAN",
                    "id": "https://www.uniprot.org/uniprot/O43524"
                }
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "effect": {
                            "identifier": "http://purl.obolibrary.org/obo/MI_2235",
                            "name": "up-regulates"
                        },
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/P31748",
                            "name": "AKT_MLVAT",
                            "biologicalModifications": [{
                                "biologicalModification0": {
                                    "modification": {
                                        "identifier": "http://purl.obolibrary.org/obo/MOD_00696",
                                        "name": "phosphorylated residue"
                                    },
                                    "residue":{
                                        "identifier": "http://purl.obolibrary.org/obo/CHEBI_27570",
                                        "name": "histidine",
                                    }
                                },
                                "biologicalModification1": {
                                    "modification":{
                                        "identifier" : "http://purl.obolibrary.org/obo/MOD_00394",
                                        "name": "acetylated residue"
                                    },
                                    "position":{
                                        "name": "123",
                                    }
                                }
                            }]
                        },
                        "target": {
                            "identifier": "https://www.uniprot.org/uniprot/O43524",
                            "name": "FOXO3_HUMAN"
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });

        it('returns the causal json for incomplete data', cb => {
            const vsmJson = {
                "source": {
                    "str": "E2F8_HUMAN",
                    "id": "https://www.uniprot.org/uniprot/A0AVK6"
                },
                "effect": null,
                "target": null,
                "reference": [],
                "evidence": []
            }

            const causalJson = {
                "causalStatement": [
                    {
                        "source": {
                            "identifier": "https://www.uniprot.org/uniprot/A0AVK6",
                            "name": "E2F8_HUMAN"
                        }
                    }
                ]
            }

            causalExport.exportCausalJson(vsmJson).should.deep.equal(causalJson);
            cb();
        });
    });
});
