const arrayCompare = function (array1, array2) {

    if (!array1 || !array2) { return false; }
    if (array1.length != array2.length) { return false; }

    let result = true;

    for (let i = 0, l = array1.length; i < l; i++) {
        
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            let subResult = arrayCompare(array1[i],array2[i]);
            if (!subResult) { result = false; break; }
        }           
        else if (array1[i] !== array2[i]) { 
            result = false; 
            break;  
        }           
    }      
    
    return result;
};

export default arrayCompare;