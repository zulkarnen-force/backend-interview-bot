function isTime(str) {
    if (isNotEmpty(obj, 'wake_up_time')) {
        return obj.wake_up_time === "HH:MM"
    }
}



function isComplete(data = {})
{

    for (let i in data) {
        if (data[i].length === 0 && data[i] !== undefined) {
            return false;
        }
    }
    return true;
    
}

export const isObject = (prop) => {
    return typeof prop === "object" && typeof prop !== null && !Array.isArray(prop);
}

// (
function isNotEmpty(object = {}, key = "") {
    if (object.hasOwnProperty(key) && object[key] !== null && object[key] !== undefined && object[key] !== '') {
      return true;
    } else {
      return false;
    }
  }

let data = {name: "lengkap", nim: 1900016072, kelas: 'asd'};

const fields = ["name", "nim", "kelas"]

export const isCompleteData = (obj, fields) => {
    console.log('isCompleteData', obj);
    let objectData = obj;
    let isComplete = true;

    if (!isObject(objectData)) {
        objectData = JSON.parse(objectData);
    }
    for (let key of fields) {
        if(!isNotEmpty(objectData, key)) {
            console.log(objectData, key)
            isComplete = false;
            break;
        }    
    }
    return { isComplete, objectData };
}
console.log(isCompleteData(data, fields))
export default {isObject, isCompleteData}
