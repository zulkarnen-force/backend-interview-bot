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

const isObject = (prop) => {
    return typeof prop === "object" && typeof prop !== null && !Array.isArray(prop);
}


function isNotEmpty(object, key) {
    if (object.hasOwnProperty(key) && object[key] !== null && object[key] !== undefined && object[key] !== '') {
      return true;
    } else {
      return false;
    }
  }

let data = {name: "lengkap", nim: 1900016072, kelas: "100"};

const fields = ["name", "nim", "kelas"]

const isCompleteData = (obj, fields) => {
    let objectData = obj;
    let isExist = true;

    if (!isObject(objectData)) {
        objectData = JSON.parse(objectData);
    }
    for (let key in objectData) {
        if(!isNotEmpty(objectData, key)) {
            isExist = false;
            break;
        }    
    }
    return isExist;
}



export default isCompleteData;