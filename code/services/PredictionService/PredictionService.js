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

function PredictionService(req,resp){
    // These are parameters passed into the code service

    var callback = function (err, data) {
        if (err) {
            resp.error("fetch error : " + JSON.stringify(data));
        } else {
            var temp = data['DATA'][data['TOTAL']-1];
            var parsed = JSON.parse(temp['architecture'])
            
            var msg = ClearBlade.Messaging();
            if(req.params.topic == null){
                resp.success("");
            } else {
                msg.subscribe(req.params.topic, function(err, data) {
                if(err) {
                    resp.error("subscribe error : " + JSON.stringify(data));
                } else {
                    log("subscribed")
                }
                });

                msg.publish(req.params.topic, JSON.stringify(req.params.payload));

                msg.waitForMessage(req.params.topic, function(err, payload, topic) {
                if(err) {
                    resp.error("message history error : " + JSON.stringify(payload));
                } 
                if( topic === req.params.topic ){  
                    var brain = BrainJS();
                    var net = new brain.NeuralNetwork();
                    var model = net.fromJSON(parsed);
                    
                    test = JSON.parse(payload);
                    var prediction = model.run({ "accelerometer": test["acc"], "powersensor": test["pow"], "temperaturesensor": test["temp"] });
                    log(prediction);

                    msg.subscribe("alert", function(err, data) {
                    if(err) {
                        resp.error("subscribe error : " + JSON.stringify(data));
                    } else {
                        var alert_msg = "";
                        if(prediction["not_required"] > prediction["required"]){
                             msg.publish("alert", "Maintenance Not Required");
                             alert_msg = "Maintenance Not Required";
                        } else {
                             msg.publish("alert", "Maintenance Required");
                             alert_msg = "Maintenance Required";
                        }

                        var col = ClearBlade.Collection({collectionName: "Alerts"});
                        var date = new Date();
                        var data = {
                            alert : alert_msg,
                            message : JSON.stringify(req.params.payload),
                            time_stamp : date
                        }

                        if (data["alert"] != "" && data["alert"] != undefined){
                            col.create(data, function (err, data) {
                                if (err) {
                                    resp.error("creation error : " + JSON.stringify(data));
                                }
                            });
                        }

                        resp.success("Success");
                    }
                    });
                } 
                });
            }

            // var prediction = net.run({ "accelerometer": 1.8120, "powersensor": 1780, "temperaturesensor": 95.5 });
            // var prediction = net.run({ "accelerometer": 0.068300001, "powersensor": 1350, "temperaturesensor": 73.4 });
        }
    };

    ClearBlade.init({request:req});
    
    var col = ClearBlade.Collection({collectionName: "Messages"});
    var date = new Date();
    var data = {
        message : JSON.stringify(req.params.payload),
        time_stamp : date,
        topic : req.params.topic
    }

    if (data["message"] != "" && data["message"] != undefined){
        col.create(data, function (err, data) {
            if (err) {
                resp.error("creation error : " + JSON.stringify(data));
            }
        });
    }

    var query = ClearBlade.Query({collectionName:"NeuralNetModels"});
    query.fetch(callback);        
}
