'use strict';

import shell from 'python-shell';
import winston from 'winston';
import fs from 'fs';

exports.send_prediction_sales = (req, res, next) => {

    const data = {
        month: req.query.month || 1,
        year: req.query.year || 2016,
        region: req.query.region || 'Region I',
        medicine: req.query.medicine || 'IBUPROFEN',
        disease: req.query.disease || '-',
        cases: req.query.cases || 0,
        population: req.query.population || 0,
        density: req.query.density || 0
    }
    winston.log('info', req.query);
    function predict() {
        let dirname = __dirname + '/../../linear_regressor.py';
        let arr = [dirname, data.month, data.year, data.region, data.medicine, 
                   data.disease, data.cases, data.population, data.density, 1]
        let python = require("child_process").spawn('python', arr);


        let output = '';
        let response;
        let type = '';

        winston.log('info', arr);
        python.stdout.on('data', (data) => {
            output += data;
            output = output.split('\n');
            output = output[output.length-1];

            response = {
                region: data.region,
                expected_demand: parseFloat(output)
            }
            winston.log('info', response)
        });

        python.on('close', (code) => { 
            winston.log('info', code)
            if (code !== 0) {  
                return res.status(500).send({ERROR: 'Server error'}); 
            }
            winston.log('info', response);
            return res.status(200).send(response);
        }); 
    }
    
    predict();
}

exports.send_prediction_diseases = (req, res, next) => {

    const data = {
        month: req.query.month || 1,
        year: req.query.year || 2016,
        region: req.query.region || 'Region I',
        medicine: req.query.medicine || 'IBUPROFEN',
        disease: req.query.disease || '-',
        population: req.query.population || 0,
        density: req.query.density || 0
    }

    function predict() {
        let dirname = __dirname + '/../../linear_regressor.py';
        let python = require("child_process").spawn(
            'python',
            [dirname, data.month, data.year, data.region, data.medicine, 
             data.disease, data.population, data.density, 2]
        );

        let output = '';
        let response;
        let type = '';

        python.stdout.on('data', (data) => {
            output += data;
            output = output.split('\n');
            cases = output[output.length-1];

            response = {
                region: data.region,
                expected_cases: JSON.parse(cases)
            }
            
            winston.log('info', response);
        });

        python.on('close', (code) => { 
            if (code !== 0) {  
                return res.status(500).send({ERROR: 'Server error'}); 
            }
            console.log(response);
            return res.status(200).send(response);
        }); 
    }
    
    predict();
}