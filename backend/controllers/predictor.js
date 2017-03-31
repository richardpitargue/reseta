'use strict';

import shell from 'python-shell';
import winston from 'winston';
import fs from 'fs';

exports.send_prediction = (req, res, next) => {

    const data = {
        month: req.query.month,
        year: req.query.year,
        region: req.query.region,
        medicine: req.query.medicine,
        disease: req.query.disease,
        cases: req.query.cases,
        population: req.query.population,
        density: req.query.density
    }

    function predict() {
        let dirname = __dirname + '/../../linear_regressor.py';
        let python = require("child_process").spawn(
            'python',
            [dirname, data.month, data.year, data.region, data.medicine, 
             data.disease, data.cases, data.population, data.density]
        );

        let output = '';
        let response;
        let type = '';

        python.stdout.on('data', (data) => {
            output += data;
            output = output.split('\n');
            output = output[output.length-1];

            response = {
                region: data.region,
                expected_demand: parseFloat(output)
            }
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