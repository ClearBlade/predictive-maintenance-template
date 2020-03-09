/**
 * Type: Micro Service
 * Description: A short-lived service which is expected to complete within a fixed period of time.
 * @param {CbServer.BasicReq} req
 * @param {string} req.systemKey
 * @param {string} req.systemSecret
 * @param {string} req.userEmail
 * @param {string} req.userid
 * @param {string} req.userToken
 * @param {boolean} req.isLogging
 * @param {[id: string]} req.params
 * @param {CbServer.Resp} resp
 */

function TrainingService(req,resp){
    
    var training_data = [];
    var min_pow = 0;
    var max_pow = 0;
    var min_temp = 0;
    var max_temp = 0;
    var min_acc = 0;
    var max_acc = 0;

    function normalize(training_data){
        var d3 = getD3();
        
        var power = []
        var temp = []
        var acc = []

        for(var i=0; i<training_data.length; i++){
            power.push(training_data[i]["input"]["powersensor"])
            temp.push(training_data[i]["input"]["temperaturesensor"])
            acc.push(training_data[i]["input"]["accelerometer"])
        }

        min_pow = d3.min(power);
        max_pow = d3.max(power);
        min_temp = d3.min(temp);
        max_temp = d3.max(temp);
        min_acc = d3.min(acc);
        max_acc = d3.max(acc);

        for(var i=0; i<training_data.length; i++){    
            norm_pow = (training_data[i]["input"]["powersensor"] - min_pow) / (max_pow - min_pow)
            norm_temp = (training_data[i]["input"]["temperaturesensor"] - min_temp) / (max_temp - min_temp)
            norm_acc = (training_data[i]["input"]["accelerometer"] - min_acc) / (max_acc - min_acc)

            training_data[i]["input"]["powersensor"] = norm_pow
            training_data[i]["input"]["temperaturesensor"] = norm_temp
            training_data[i]["input"]["accelerometer"] = norm_acc
        }

        return training_data;
    }

    function trainModel(training_data){
        var brain = BrainJS();
        var net = new brain.NeuralNetwork({ activation: "sigmoid", hiddenLayers: [64, 128] });
        train_output = net.train( training_data, { iterations: 100, learningRate: 0.1});
        var output = net.run({ "accelerometer": 1.8120, "powersensor": 1780, "temperaturesensor": 95.5 });
        json_net = net.toJSON();

        var date = new Date();
        var data = {
            architecture : JSON.stringify(json_net),
            time_stamp : date,
            error : train_output['error'],
            epochs : train_output['iterations'],
            normalize_data : JSON.stringify({
                "min_pow" : min_pow,
                "max_pow" : max_pow,
                "min_temp" : min_temp,
                "max_temp" : max_temp,
                "min_acc" : min_acc,
                "max_acc" : max_acc
            })
        }

        var col = ClearBlade.Collection({collectionName: "NeuralNetModels"});
        col.create(data, function (err, data) {
            if (err) {
                resp.error("creation error : " + JSON.stringify(data));
            }
        });

        return json_net
    }

    var callback = function (err, data) {
        if (err) {
            resp.error("fetch error : " + JSON.stringify(data));
        } else {
            var temp = data['DATA'];
            for (var i=0; i<temp.length; i++){
                var maintenance = temp[i]['maintenance']
                delete temp[i]['item_id']
                delete temp[i]['maintenance']
                if (maintenance == "required")
                {
                    training_data.push({ input : temp[i], output : {"required" : 1}});
                } else {
                    training_data.push({ input : temp[i], output : {"not_required" : 1}});
                }
            }

            var norm_training_data = normalize(training_data);
            var json_net = trainModel(norm_training_data);
            resp.success("Success")
        }
    };

    ClearBlade.init({request:req});
    var query = ClearBlade.Query({collectionName:"TrainingCollection"});
    query.fetch(callback);
}
