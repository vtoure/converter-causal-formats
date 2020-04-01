# converter-causal-formats
[![Build Status](https://travis-ci.org/vtoure/converter-causal-formats.svg?branch=master)](https://travis-ci.org/vtoure/converter-causal-formats)
[![codecov](https://codecov.io/gh/vtoure/converter-causal-formats/branch/master/graph/badge.svg)](https://codecov.io/gh/vtoure/converter-causal-formats)
[![npm version](https://img.shields.io/npm/v/converter-causal-formats)](https://www.npmjs.com/package/converter-causal-formats)
[![Downloads](https://img.shields.io/npm/dm/converter-causal-formats)](https://www.npmjs.com/package/converter-causal-formats)
[![License](https://img.shields.io/npm/l/converter-causal-formats)](LICENSE.md)


The `converter-causal-formats` is a converter to generate different formats handling molecular interaction causal statements. 
It enables the three following types of conversion:
* flat template JSON to causal-json
* flat template JSON to PSI-MITAB2.8
* causal-json to PSI-MITAB2.8

## Usage

### Initialisation
```javascript
var ConverterCausalFormats = require('./ConverterCausalFormats')
const causalExport = new ConvertCausalFormats();
```
### Setting the type of conversion (mandatory)
The conversion type must be specified with: 
```javascript
causalExport.choice = <CONVERSION TYPE STRING>;
```
The conversion types supported are: `flatjson2causaljson`, `causaljson2mitab` and `flatjson2mitab`

### Setting the object to convert (mandatory)
The input object (i.e., data to convert) must be specified with:
```javascript
causalExport.input = <INPUT OBJECT>;
```
It should be either a flat template JSON or a causal-json object

### Setting the output object (optional)
The output object (i.e., that will contain the converted data) can be specified:
```javascript
causalExport.output = <OUTPUT OBJECT>;
```
It can be an array in the case of a conversion to a causal-json or a string in the case of a conversion to PSI-MITAB2.8.

### Call function to do the conversion
```javascript
var convertedObject = causalExport.doConversion();
```


## Build configuration
`converter-causal-formats` is published as an npm package.

### Use ConverterCausalFormats in Node.js
1. run ```npm install converter-causal-formats```
2. use ```require('./ConverterCausalFormats')```

### Use ConverterCausalFormats in an HTML file
1. run`npm install converter-causal-formats`
2. run`npm build`. This generates the build file converter-causal-formats.min.js in the dist folder.
3. Include `<script src="../dist/converter-causal-formats.min.js">`

## The different formats

### The flat template JSON format
The flat template JSON is a flattened JSON version of a VSM JSON. A VSM JSON can generated when data is curated in a [VSM-box](https://github.com/vsmjs/vsm-box).
In this project, a flat template JSON handles causal statements, generated in the [causalBuilder](https://mi2cast.github.io/causalBuilder/) curation interface using the VSM technology.


#### Example of a VSM JSON

```json
{
  "terms": [
    {
      "queryOptions": {
        "filter": {
          "dictID": []
        }
      },
      "tag": "source",
      "placeholder": "source",
      "str": "AKT1_HUMAN",
      "classID": "https://www.uniprot.org/uniprot/P31749",
      "instID": null,
      "dictID": "https://www.uniprot.org",
      "descr": "AKT1 is one of 3 closely related serine/threonine-protein kinases (AKT1, AKT2 and AKT3) called the AKT kinase, and which regulate many processes including metabolism, proliferation, cell survival, growth and angiogenesis (PubMed:15526160, PubMed:11882383, PubMed:21620960, PubMed:21432781). This is mediated through serine and/or threonine phosphorylation of a range of downstream substrates (PubMed:15526160, PubMed:11882383, PubMed:21620960, PubMed:21432781). Over 100 substrate candidates have been reported so far, but for most of them, no isoform specificity has been reported (PubMed:15526160, PubMed:11882383, PubMed:21620960, PubMed:21432781). AKT is responsible of the regulation of glucose uptake by mediating insulin-induced translocation of the SLC2A4/GLUT4 glucose transporter to the cell surface (By similarity). Phosphorylation of PTPN1 at 'Ser-50' negatively modulates its phosphatase activity preventing dephosphorylation of the insulin receptor and the attenuation of insulin signaling (By similarity). Phosphorylation of TBC1D4 triggers the binding of this effector to inhibitory 14-3-3 proteins, which is required for insulin-stimulated glucose transport (PubMed:11994271). AKT regulates also the storage of glucose in the form of glycogen by phosphorylating GSK3A at 'Ser-21' and GSK3B at 'Ser-9', resulting in inhibition of its kinase activity (By similarity). Phosphorylation of GSK3 isoforms by AKT is also thought to be one mechanism by which cell proliferation is driven (By similarity). AKT regulates also cell survival via the phosphorylation of MAP3K5 (apoptosis signal-related kinase) (PubMed:11154276). Phosphorylation of 'Ser-83' decreases MAP3K5 kinase activity stimulated by oxidative stress and thereby prevents apoptosis (PubMed:11154276). AKT mediates insulin-stimulated protein synthesis by phosphorylating TSC2 at 'Ser-939' and 'Thr-1462', thereby activating mTORC1 signaling and leading to both phosphorylation of 4E-BP1 and in activation of RPS6KB1 (PubMed:12150915). AKT is involved in the phosphorylation of members of the FOXO factors (Forkhead family of transcription factors), leading to binding of 14-3-3 proteins and cytoplasmic localization (PubMed:10358075). In particular, FOXO1 is phosphorylated at 'Thr-24', 'Ser-256' and 'Ser-319' (PubMed:10358075). FOXO3 and FOXO4 are phosphorylated on equivalent sites (PubMed:10358075). AKT has an important role in the regulation of NF-kappa-B-dependent gene transcription and positively regulates the activity of CREB1 (cyclic AMP (cAMP)-response element binding protein) (PubMed:9829964). The phosphorylation of CREB1 induces the binding of accessory proteins that are necessary for the transcription of pro-survival genes such as BCL2 and MCL1 (PubMed:9829964). AKT phosphorylates 'Ser-454' on ATP citrate lyase (ACLY), thereby potentially regulating ACLY activity and fatty acid synthesis (By similarity). Activates the 3B isoform of cyclic nucleotide phosphodiesterase (PDE3B) via phosphorylation of 'Ser-273', resulting in reduced cyclic AMP levels and inhibition of lipolysis (By similarity). Phosphorylates PIKFYVE on 'Ser-318', which results in increased PI(3)P-5 activity (By similarity). The Rho GTPase-activating protein DLC1 is another substrate and its phosphorylation is implicated in the regulation cell proliferation and cell growth. AKT plays a role as key modulator of the AKT-mTOR signaling pathway controlling the tempo of the process of newborn neurons integration during adult neurogenesis, including correct neuron positioning, dendritic development and synapse formation (By similarity). Signals downstream of phosphatidylinositol 3-kinase (PI(3)K) to mediate the effects of various growth factors such as platelet-derived growth factor (PDGF), epidermal growth factor (EGF), insulin and insulin-like growth factor I (IGF-I) (PubMed:12176338, PubMed:12964941). AKT mediates the antiapoptotic effects of IGF-I (By similarity). Essential for the SPATA13-mediated regulation of cell migration and adhesion assembly and disassembly (PubMed:19934221). May be involved in the regulation of the placental development (By similarity). Phosphorylates STK4/MST1 at 'Thr-120' and 'Thr-387' leading to inhibition of its: kinase activity, nuclear translocation, autophosphorylation and ability to phosphorylate FOXO3 (PubMed:17726016). Phosphorylates STK3/MST2 at 'Thr-117' and 'Thr-384' leading to inhibition of its: cleavage, kinase activity, autophosphorylation at Thr-180, binding to RASSF1 and nuclear translocation (PubMed:20086174, PubMed:20231902). Phosphorylates SRPK2 and enhances its kinase activity towards SRSF2 and ACIN1 and promotes its nuclear translocation (PubMed:19592491). Phosphorylates RAF1 at 'Ser-259' and negatively regulates its activity (PubMed:10576742). Phosphorylation of BAD stimulates its pro-apoptotic activity (PubMed:10926925). Phosphorylates KAT6A at 'Thr-369' and this phosphorylation inhibits the interaction of KAT6A with PML and negatively regulates its acetylation activity towards p53/TP53 (PubMed:23431171). Phosphorylates palladin (PALLD), modulating cytoskeletal organization and cell motility (PubMed:20471940). Phosphorylates prohibitin (PHB), playing an important role in cell metabolism and proliferation (PubMed:18507042). Phosphorylates CDKN1A, for which phosphorylation at 'Thr-145' induces its release from CDK2 and cytoplasmic relocalization (PubMed:16982699). These recent findings indicate that the AKT1 isoform has a more specific role in cell motility and proliferation (PubMed:16139227). Phosphorylates CLK2 thereby controlling cell survival to ionizing radiation (PubMed:20682768). {ECO:0000250|UniProtKB:P31750, ECO:0000250|UniProtKB:P47196, ECO:0000269|PubMed:10358075, ECO:0000269|PubMed:10576742, ECO:0000269|PubMed:10926925, ECO:0000269|PubMed:11154276, ECO:0000269|PubMed:11994271, ECO:0000269|PubMed:12150915, ECO:0000269|PubMed:12176338, ECO:0000269|PubMed:12964941, ECO:0000269|PubMed:16139227, ECO:0000269|PubMed:16982699, ECO:0000269|PubMed:17726016, ECO:0000269|PubMed:18507042, ECO:0000269|PubMed:19592491, ECO:0000269|PubMed:19934221, ECO:0000269|PubMed:20086174, ECO:0000269|PubMed:20231902, ECO:0000269|PubMed:20471940, ECO:0000269|PubMed:20682768, ECO:0000269|PubMed:23431171, ECO:0000269|PubMed:9829964, ECO:0000303|PubMed:11882383, ECO:0000303|PubMed:15526160, ECO:0000303|PubMed:21432781, ECO:0000303|PubMed:21620960}."
    },
    {
      "queryOptions": {
        "filter": {
          "dictID": [
            "http://data.bioontology.org/ontologies/MI",
            "http://data.bioontology.org/ontologies/OBOREL"
          ]
        }
      },
      "tag": "effect",
      "placeholder": "effect",
      "str": "down-regulates activity",
      "classID": "http://purl.obolibrary.org/obo/MI_2241",
      "instID": null,
      "dictID": "http://data.bioontology.org/ontologies/MI",
      "descr": "The effect of a modulator entity A on a modulated entity B that  decreases the frequency, rate or extent of the molecular function of B, an elemental biological activity occurring at the molecular level, such as catalysis or binding (GO:0044093)."
    },
    {
      "queryOptions": {
        "filter": {
          "dictID": []
        }
      },
      "tag": "target",
      "placeholder": "target",
      "str": "FOXO3_HUMAN",
      "classID": "https://www.uniprot.org/uniprot/O43524",
      "instID": null,
      "dictID": "https://www.uniprot.org",
      "descr": "Transcriptional activator that recognizes and binds to the DNA sequence 5'-[AG]TAAA[TC]A-3' and regulates different processes, such as apoptosis and autophagy (PubMed:10102273, PubMed:16751106, PubMed:21329882). Acts as a positive regulator of autophagy in skeletal muscle: in starved cells, enters the nucleus following dephosphorylation and binds the promoters of autophagy genes, such as GABARAP1L, MAP1LC3B and ATG12, thereby activating their expression, resulting in proteolysis of skeletal muscle proteins (By similarity). Triggers apoptosis in the absence of survival factors, including neuronal cell death upon oxidative stress (PubMed:10102273, PubMed:16751106). Participates in post-transcriptional regulation of MYC: following phosphorylation by MAPKAPK5, promotes induction of miR-34b and miR-34c expression, 2 post-transcriptional regulators of MYC that bind to the 3'UTR of MYC transcript and prevent its translation (PubMed:21329882). In response to metabolic stress, translocates into the mitochondria where it promotes mtDNA transcription (PubMed:23283301). {ECO:0000250|UniProtKB:Q9WVH4, ECO:0000269|PubMed:10102273, ECO:0000269|PubMed:16751106, ECO:0000269|PubMed:21329882, ECO:0000269|PubMed:23283301}."
    },
    {
      "str": "has reference",
      "classID": null,
      "instID": null
    },
    {
      "queryOptions": {
        "filter": {
          "dictID": [
            "https://www.ncbi.nlm.nih.gov/pubmed"
          ]
        }
      },
      "tag": "reference__0",
      "placeholder": "reference",
      "str": "PMID:19188143",
      "classID": "https://www.ncbi.nlm.nih.gov/pubmed/19188143",
      "instID": null,
      "dictID": "https://www.ncbi.nlm.nih.gov/pubmed",
      "descr": "Yang JY (Clin Cancer Res 2009), A new fork for clinical application: targeting forkhead transcription factors in cancer."
    },
    {
      "str": "is assessed by",
      "classID": null,
      "instID": null
    },
    {
      "queryOptions": {
        "filter": {
          "dictID": [
            "http://data.bioontology.org/ontologies/ECO"
          ]
        }
      },
      "tag": "evidence__0",
      "placeholder": "evidence",
      "str": "manual assertion",
      "classID": "http://purl.obolibrary.org/obo/ECO_0000218",
      "instID": null,
      "dictID": "http://data.bioontology.org/ontologies/ECO",
      "descr": "An assertion method that involves human review."
    }
  ],
  "conns": [
    {
      "type": "T",
      "pos": [
        0,
        1,
        2
      ]
    },
    {
      "type": "T",
      "pos": [
        1,
        3,
        4
      ]
    },
    {
      "type": "T",
      "pos": [
        1,
        5,
        6
      ]
    }
  ]
}
```


#### Example of a flat template JSON generated from the VSM JSON above

```json
{
  "source": {
    "str": "AKT1_HUMAN",
    "id": "https://www.uniprot.org/uniprot/P31749"
  },
  "effect": {
    "str": "down-regulates activity",
    "id": "http://purl.obolibrary.org/obo/MI_2241"
  },
  "target": {
    "str": "FOXO3_HUMAN",
    "id": "https://www.uniprot.org/uniprot/O43524"
  },
  "reference": [
    {
      "str": "PMID:19188143",
      "id": "https://www.ncbi.nlm.nih.gov/pubmed/19188143"
    }
  ],
  "evidence": [
    {
      "str": "manual assertion",
      "id": "http://purl.obolibrary.org/obo/ECO_0000218"
    }
  ]
}
```


### The causal-json format
The causal-json is a JSON-based format that enables the efficient storage of causal interactions following the [MI2CAST guidelines](https://github.com/MI2CAST/MI2CAST). 


#### Example of a causal-json
```json
{
  "causalStatement": [
    {
      "source": {
        "identifier": "https://www.uniprot.org/uniprot/P31749",
        "name": "AKT1_HUMAN"
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
            "identifier": "https://www.ncbi.nlm.nih.gov/pubmed/19188143",
            "name": "PMID:19188143"
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
}
```

### The PSI-MITAB2.8 format
The PSI-MITAB2.8 is a tab-delimited format that retains information about molecular interactions and more specifically causal interactions. 
More information can be found at: [https://psicquic.github.io/MITAB28Format.html](https://psicquic.github.io/MITAB28Format.html).



## License
This project is licensed under the AGPL-3.0 license - see [LICENSE.md](LICENSE.md).
