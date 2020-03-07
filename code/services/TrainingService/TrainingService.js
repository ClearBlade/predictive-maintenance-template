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

    function trainModel(training_data){
        var brain = BrainJS();
        var net = new brain.NeuralNetwork({ activation: "sigmoid", hiddenLayers: [64, 128] });
        train_output = net.train( training_data, { iterations: 300, learningRate: 0.01, log: true, logPeriod: 10 });
        // var output = net.run({ "accelerometer": 1.8120, "powersensor": 1780, "temperaturesensor": 95.5 });
        json_net = net.toJSON();

        var date = new Date();
        var data = {
        architecture : JSON.stringify(json_net),
        time_stamp : date,
        error : train_output['error'],
        epochs : train_output['iterations'] 
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

            var json_net = trainModel(training_data);
            resp.success("Success")
        }
    };

    ClearBlade.init({request:req});
    var query = ClearBlade.Query({collectionName:"TrainingCollection"});
    query.fetch(callback);
}
