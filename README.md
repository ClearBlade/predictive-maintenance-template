# Predictive Maintenance Template

## Contents

### [Overview](#overview-1)
### [System Installation](#system-installation)
### [Usage](#usage-1)
### [Assets](#assets-1)

## Overview

This template demonstrates how [BrainJS Library](https://github.com/ClearBlade/brain-js) can be used to perform predictive maintenance on the ClearBlade Platform with the help of interactive Portals.

This is an ipm package, which contains one or more reusable assets within the ipm Community. The 'package.json' in this repo is a ipm spec's package.json, [here](https://docs.clearblade.com/v/3/6-ipm/spec), which is a superset of npm's package.json spec, [here](https://docs.npmjs.com/files/package.json).

[Browse ipm Packages](https://ipm.clearblade.com)

## System Installation

1. Open the ClearBlade Platform and enter your login credentials
```
https://platform.clearblade.com/
```
2. Click on **Add System** -> **Advanced** and copy the link of this repository in the box.
```
https://github.com/ClearBlade/predictive-maintenance-template
```
3. Click **Create**
4. You can now access this system in the platform.

## Usage
- Once the system is installed, go to **Users**, create a new user and provide *Authenticated* permission to the user.
- Go to **Portal** and click on the **PredictiveMaintenance** Portal and login to the portal using the credentials for the newly created user.
- Once logged in successfully, you can now access the portal. The portal is essentially divided into three sections:
  - The first section displays the sensor readings of three different sensors viz. Accelerometer, pressure sensor and temperature sensor. The values for these sensors are randomly generated after every 5 seconds for a demonstrative purpose.
  - The second section is further divided into two sub-sections. The first sub-section, which is on the left hand side, allows you to subscribe to a topic and provide a publish interval (Default interval value is 5 seconds). The publish interval specifies the time interval after which you want to publish a message. For example, if you provide a publish time interval as 3, the system will publish a message after every 3 seconds on the subscribed topic unless you press the **Stop Publishing** button to stop publishing. The second sub-section in the right side displays the live device data feed. It shows the messages published, their timestamp and the topic to which these messages were published.
  - The third section displays latest alerts i.e if a maintenance is required or not.
- The messages published are sent to the PredictionService and the trained model designed using BrainJS predicts whether a maintenance is required for these messages and the corresponding results are sent in the form of alerts. 
- The alerts in **Green** colour indicate that *Maintenance is not required*, whereas alerts in **Red** colour indicate that *Maintenance is required*.

## Assets

### Libraries 

``` BrainJS ``` : A Library to Implement Neural Networks. Click [here](https://github.com/ClearBlade/brain-js) for more info.

### Code Services

``` TrainingService ``` : A code service to design and train a machine learning model using BrainJS.

``` PredictionService``` : A code service to predict if a maintenance is required using the trained model.

### Collections

``` Alerts ``` : A collection that stores all the alerts generated.

``` Messages``` : A collection that stores all the messages generated and published.

``` NeuralNetModels``` : A collection that stores the trained neural network models.

``` TrainingCollection``` : A collection that stores the training data.

### Portals

``` PredictiveMaintenance ``` : An interactive portal to demonstrate the working of the predictive maintenance template.
