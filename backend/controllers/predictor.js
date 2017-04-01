'use strict';

import shell from 'python-shell';
import winston from 'winston';
import fs from 'fs';
import async from 'async';

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

exports.send_prediction_all_sales = (req, res, next) => {

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

    const MEDICINE = [
                        'PARACETAMOL 325MG TABLET',
                        'PARACETAMOL 500MG TABLET',
                        'ALBENDAZOLE 400MG TABLET',
                        'MEBENDAZOLE 100MG TABLET/CAPSULE',
                        'DIPHENHYDRAMINE 25MG TABLET/CAPSULE',
                        'CHLORPHENAMINE 4MG TABLET',
                        'MEFENAMIC ACID 250MG TABLET/CAPSULE',
                        'IBUPROFEN 200MG TABLET',
                        'ASPIRIN 300MG TABLET',
                        'ASPIRIN 325MG TABLET',
                        'ASPIRIN 80MG TABLET',
                        'LAGUNDI 300MG TABLET',
                        'LAGUNDI 600MG TABLET',
                        'SAMBONG 250MG TABLET',
                        'SAMBONG 500MG TABLET',
                        'DEXTROMETHORPHAN 10MG TABLET',
                        'LOPERAMIDE 2MG CAPSULE',
                        'MECLOZINE (MECLIZINE) (as hydrochloride) 12.5MG TABLET',
                        'MECLOZINE (MECLIZINE) (as hydrochloride) 25MG TABLET',
                        'BISACODYL 5MG TABLET',
                        'STANDARD SENNA (Concentrate) 187MG TABLET',
                        'FERROUS SULFATE 60MG TABLET',
                        'ASCORBIC ACID (Vitamin C) 100MG TABLET',
                        'ASCORBIC ACID (Vitamin C) 250MG TABLET',
                        'ASCORBIC ACID (Vitamin C) 500MG TABLET',
                        'VITAMIN B1 + B6 + B12 155MG TABLET/CAPSULE',
                        'AMOXICILLIN (as trihydrate) 250MG CAPSULE',
                        'AMOXICILLIN (as trihydrate) 500MG CAPSULE',
                        'COTRIMOXAZOLE (sulfamethoxazole + trimethoprim) 480MG TABLET/CAPSULE',
                        'COTRIMOXAZOLE (sulfamethoxazole + trimethoprim) 960MG TABLET/CAPSULE',
                        'METFORMIN (as hydrochloride) 500MG TABLET',
                        'GLIBENCLAMIDE 5MG TABLET',
                        'METOPROLOL (as tartrate) 50MG TABLET',
                        'CAPTOPRIL 25MG TABLET',
                        'SALBUTAMOL (as sulfate) 2MG TABLET'
    ]

    function predict() {
        let dirname = __dirname + '/../../scikit_regression.py';
        let arr = [dirname, data.month, data.year, data.region, '-', 
                   '-', 0, data.population, data.density, 3]
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
                expected_demand: o
            }
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