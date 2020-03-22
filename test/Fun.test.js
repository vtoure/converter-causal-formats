const fun = require('../src/Fun');

const chai = require('chai');
chai.should();
const expect = chai.expect;

describe('Fun.js', () => {
        describe('getDbnameAndId', () =>{
            it('return the databaseName:identifier for several databases', cb =>{
                var url_uniprot = "https://www.uniprot.org/uniprot/P31750";
                var url_ensembl = "https://www.ensembl.org/id/ENSG00000118689";
                var url_emsemblgen = "http://www.ensemblgenomes.org/id/PSE_2791";
                var url_chebi = "http://purl.obolibrary.org/obo/CHEBI_73456";
                var url_rnacentral = "https://www.rnacentral.org/rna/URS000018E088_6239";
                var url_complexportal = "https://www.ebi.ac.uk/complexportal/complex/CPX-603";
                var url_geneontology = "http://purl.obolibrary.org/obo/GO_0071919";
                var url_taxon = "http://purl.bioontology.org/ontology/NCBITAXON/9606";
                var url_pmid = "https://www.ncbi.nlm.nih.gov/pubmed/31664030";
                var url_mi = "http://purl.obolibrary.org/obo/MI_2235";
                var url_eco = "http://purl.obolibrary.org/obo/ECO_0000217";

                fun.getDbnameAndId(url_uniprot).should.equal("uniprot:P31750");
                fun.getDbnameAndId(url_ensembl).should.equal("ensembl:ENSG00000118689");
                fun.getDbnameAndId(url_emsemblgen).should.equal("ensemblgenomes:PSE_2791");
                fun.getDbnameAndId(url_chebi).should.equal("CHEBI:73456");
                fun.getDbnameAndId(url_rnacentral).should.equal("rnacentral:URS000018E088_6239");
                fun.getDbnameAndId(url_complexportal).should.equal("complexportal:CPX-603");
                fun.getDbnameAndId(url_geneontology).should.equal("go:\"GO:0071919\"");
                fun.getDbnameAndId(url_taxon).should.equal("taxid:9606");
                fun.getDbnameAndId(url_pmid).should.equal("pubmed:31664030");
                fun.getDbnameAndId(url_mi).should.equal("psi-mi:\"MI:2235\"");
                fun.getDbnameAndId(url_eco).should.equal("ECO:0000217");

                cb();
            });
        });

    describe('setValue', () => {
        it('fills recursively a "reference" object and its value into a "references" list', cb => {
            const ref_json = {
                "references": [{
                    "reference0": {
                        "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/31664030",
                        "name": "PMID:31664030"
                    }
                }
                ],
            };

            let ref_path = "references.reference0";
            let ref_value = {"str": "PMID:31664030", "id": "https://www.ncbi.nlm.nih.gov/pubmed/31664030"};
            let ref_obj = {};

            fun.setValue(ref_path, ref_value, ref_obj);
            expect(ref_obj.should.deep.equal(ref_json));

            cb();
        });


        it('fills recursively an "experimental setup" object and its value into a "experimentalSetups" list', cb => {
            const ref_json = {
                "experimentalSetups": [{
                    "experimentalSetup0": {
                        "identifier": "http://purl.obolibrary.org/obo/ECO_0000017",
                        "name": "ectopic expression evidence"
                    }
                }
                ],
            };

            let ref_path = "experimentalSetups.experimentalSetup0";
            let ref_value = {"str": "ectopic expression evidence", "id": "http://purl.obolibrary.org/obo/ECO_0000017"};
            let ref_obj = {};

            fun.setValue(ref_path, ref_value, ref_obj);
            expect(ref_obj.should.deep.equal(ref_json));
            cb();
        });

        it('fills recursively a "biological activity" object and its value into a "source" object', cb => {
            const activity_json = {
                "source": {
                    "biologicalActivity": {
                        "identifier": "http://purl.obolibrary.org/obo/GO_0016301",
                        "name": "kinase activity"
                    }
                }
            }

            let activity_path = "source.biologicalActivity";
            let activity_value = {"str": "kinase activity", "id": "http://purl.obolibrary.org/obo/GO_0016301"};
            let activity_obj = {};

            fun.setValue(activity_path, activity_value, activity_obj);
            expect(activity_obj.should.deep.equal(activity_json));

            cb();
        });
        it('fills recursive a "modification" and its value into a "biologicalModification" object', cb => {
            const modif_json = {
                "source": {
                    "biologicalModifications": [{
                        "biologicalModification0": {
                            "modification": {
                                "identifier": "http://purl.obolibrary.org/obo/MOD_00696",
                                "name": "phosphorylated residue"
                            }
                        }
                    }]
                }
            }

            let modif_path = "source.biologicalModifications.biologicalModification0.modification";
            let modif_value = {"str": "phosphorylated residue", "id": "http://purl.obolibrary.org/obo/MOD_00696"};
            let modif_obj = {};

            fun.setValue(modif_path, modif_value, modif_obj);
            expect(modif_obj.should.deep.equal(modif_json));
            cb();
        });
    });
});