var data = { "name": "Ram", "address": { "door": 56, "street": "45" } }

function getSchema(data) {
    var res = {}
    if (typeof(data) == "undefined") {
        res["message"] = "wrong data type"
        return res

    }
    if (typeof(data) == "string" || typeof(data) == "boolean" || typeof(data) == "number") {
        res[data] = {}
        res[data]["type"] = typeof(data)

        return res
    }

    if (data.length != undefined) {
        res["type"] = "array"
        for (var i = 0; i < data.length; i++) {

            res["items"] = getSchema(data[i])
            res["type"] = "array"
            console.log(res)

        }

    } else {
        var keys = Object.keys(data)
        var values = Object.values(data)
        res["type"] = "object"
        for (var i = 0; i < keys.length; i++) {
            //console.log(keys, values)
            if (typeof(values[i]) == "object") {
                if (values[i].length == undefined) {
                    res[keys[i]] = {}
                    res[keys[i]]["properties"] = getSchema(values[i])

                } else {
                    res[keys[i]] = getSchema(values[i])
                }
            } else {
                res[keys[i]] = { "type": typeof(values[i]) }
            }
        }
    }

    //console.log(res)
    return res

}

getSchema(data)