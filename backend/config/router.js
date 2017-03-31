'use strict';

import predictor from '../controllers/predictor';

module.exports = (router) => {

    router.get('/prediction', predictor.send_prediction);

    return router;
}
