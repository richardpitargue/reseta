'use strict';

import shell from 'python-shell';
import winston from 'winston';
import fs from 'fs';

exports.send_prediction_sales = (req, res, next) => {

    const data = {
        month: req.query.month || 1,
        year: req.query.year || 2016,
        region: req.query.region || 'Region I',
        medicine: req.query.medicine || 'ALBENDAZOLE 400MG TABLET',
        disease: req.query.disease || 'Malaria',
        cases: req.query.cases || 0,
        population: req.query.population || 0,
        density: req.query.density || 0
    }

    function predict() {
        let dirname = __dirname + '/../../scikit_regression.py';
        let arr = [dirname, data.month, data.year, data.region, data.medicine, 
                   data.disease, data.cases, data.population, data.density, 1]
        let python = require("child_process").spawn('python', arr);

        let output = '';
        let response;
        let type = '';

        python.stdout.on('data', (_data) => {
            output += _data.toString();

            response = {
                region: data.region,
                expected_demand: parseInt(output)
            }
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
        medicine: req.query.medicine || 'ALBENDAZOLE 400MG TABLET',
        disease: req.query.disease || '-',
        population: req.query.population || 0,
        density: req.query.density || 0
    }

    function predict() {
        let dirname = __dirname + '/../../scikit_regression.py';
        let arr =  [dirname, data.month, data.year, data.region, data.medicine, 
                    data.disease, data.population, data.population, data.density, 2]
        let python = require("child_process").spawn('python', arr);

        let output = '';
        let response;
        let type = '';

        python.stdout.on('data', (_data) => {
            output = _data.toString();
            output = JSON.stringify(output);
            let s = output.replace(/\\n/g, "\\n")  
                            .replace(/\\'/g, "\\'")
                            .replace(/\\"/g, '\\"')
                            .replace(/\\&/g, "\\&")
                            .replace(/\\r/g, "\\r")
                            .replace(/\\t/g, "\\t")
                            .replace(/\\b/g, "\\b")
                            .replace(/\\f/g, "\\f");
            s = s.replace(/\\n/g, '');
            s = s.replace(/\\'/g, '"');
            s = s.replace(/[\u0000-\u0019]+/g,"");
            // remove non-printable and other non-valid JSON chars
            let o = JSON.parse(s);
            response = {
                region: data.region,
                expected_cases: o
            }

            // winston.log('info', response);
        });

        python.on('close', (code) => { 
            if (code !== 0) {  
                return res.status(500).send({ERROR: 'Server error'}); 
            }

            return res.status(200).send(response);
        }); 
    }
    
    predict();
}