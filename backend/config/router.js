'use strict';

import predictor from '../controllers/predictor';

module.exports = (router) => {

    router.get('/prediction/sales', predictor.send_prediction_sales);
    router.get('/prediction/diseases', predictor.send_prediction_diseases);
    router.get('/prediction/region', predictor.send_prediction_all_sales);

    return router;
}
