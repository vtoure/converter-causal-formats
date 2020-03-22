module.exports = {getDbName, getId, getDbnameAndId, setValue};

function getDbName(uri){
    if(uri.includes("http://purl.obolibrary.org/obo")){
        //Handle all bioportal cases
        if(uri.includes("http://purl.obolibrary.org/obo/GO_")){
            // Specific case with GO in the representation with MITAB
            return "go";
        }
        else if(uri.includes("http://purl.obolibrary.org/obo/MI_")){
            return "psi-mi";
        }
        else{
            var dbName= uri.split("/").pop().split("_").slice(-2)[0];
            return dbName;
        }
    }
    else if (uri.includes("NCBITAXON")){
        return "taxid";
    }
    else if(uri.includes("pubmed")){
        return "pubmed";
    }
    else if (uri.includes("complexportal")){
        return "complexportal";
    }
    else{
        return uri.split(".").slice(1)[0] ;
    }
}

function getId(uri){
    if(uri.includes("http://purl.obolibrary.org/obo")){
        //Handle all bioportal cases
        if(uri.includes("http://purl.obolibrary.org/obo/GO_")){
            // Specific case with GO in the representation with MITAB
            return "\"GO:" + uri.split("_").pop() + "\"";
        }
        else if(uri.includes("http://purl.obolibrary.org/obo/MI_")){
            return "\"MI:" + uri.split("_").pop() + "\"";
        }
        else{
            var id = uri.split("/").pop().split("_").pop();
            return  id;
        }
    }
    else if (uri.includes("NCBITAXON")){
        return uri.split("/").pop();
    }
    else if(uri.includes("pubmed")){
        return uri.split("/").pop();
    }
    else if (uri.includes("complexportal")){
        return uri.split("/").pop();
    }
    else{
        return uri.split("/").pop();
    }
}

function getDbnameAndId(uri){
    return getDbName(uri) + ":" + getId(uri);
}

//List of properties to be considered as list and not object
const propertyAsList = ["biologicalModifications", "experimentalSetups", "evidences", "references"];

/**
 *  * Parser to handle properties with nested levels
 * Modified from: https://medium.com/data-scraper-tips-tricks/safely-read-write-in-deeply-nested-objects-js-a1d9ddd168c6
 * @param propertyPath
 * @param value
 * @param currentObj
 * @returns {(boolean|undefined)|boolean}
 */
function setValue(propertyPath, value, currentObj) {
    if (value) {
        // splits by the dots at first and then simply pass along the array (on next iterations)
        let properties = Array.isArray(propertyPath) ? propertyPath : propertyPath.split(".");

        if (properties.length > 1) { // Not yet at the last property so keep digging
            //resultObj corresponds to the object to return during a recursive call (at current property)
            let resultObj = currentObj[properties[0]];

            // The property doesn't exists so we create it
            if (!currentObj.hasOwnProperty(properties[0])) {
                if (propertyAsList.includes(properties[0])) { //Property to be set as a list
                    currentObj[properties[0]] = [];
                    resultObj = currentObj[properties[0]];
                } else { // Property set as an object
                    if (Array.isArray((currentObj))) {
                        // Parent of the property is a list --> property needs to be pushed as an object into the list
                        if (!currentObj.length > 0) {
                            //Array without existing object
                            let newObj = {};
                            newObj[properties[0]] = {};
                            currentObj.push(newObj);
                            resultObj = currentObj[0][properties[0]];
                        } else { //Existing object in the list
                            if (typeof currentObj[0][properties[0]] === 'undefined') {
                                // Avoids overwriting of objects (e.g., biologicalModification1 can have  'residue' and 'modification' objects)
                                currentObj[0][properties[0]] = {};
                            }
                            resultObj = currentObj[0][properties[0]];
                        }
                    } else { // Parent is simply an object, the property can be defined as an object
                        currentObj[properties[0]] = {};
                        resultObj = currentObj[properties[0]];
                    }
                }
            }
            // Iteration
            return setValue(properties.slice(1), value, resultObj)

        } else { // This is the last property - the one where to set the value
            //When array: value should be pushed in
            if (Array.isArray((currentObj))) {
                if (!currentObj.length > 0) { //Empty array, create and object to add the value
                    let newObj = {};
                    newObj[properties[0]] = {};
                    newObj[properties[0]]["identifier"] = value.id;
                    newObj[properties[0]]["name"] = value.str;
                    currentObj.push(newObj);

                } else { // Object and value can be added into the array of the current object
                    currentObj[0][properties[0]] = {};
                    currentObj[0][properties[0]]["identifier"] = value.id;
                    currentObj[0][properties[0]]["name"] = value.str;
                }
            } else { // Object and value can be added into the current object
                currentObj[properties[0]] = {};
                if (value.id) {
                    currentObj[properties[0]]["identifier"] = value.id;
                }
                if (value.str) {
                    currentObj[properties[0]]["name"] = value.str;
                }
            }
            return true //end.
        }
    }
}
