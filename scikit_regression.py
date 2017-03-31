import sys, csv
import numpy as np
import pandas as pd
import scipy.stats as stats
import matplotlib.pyplot as plt
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.linear_model import LinearRegression

LABEL ='label'

NAMES = [
    'month', 'year', 'region', 'medicine', 'disease', 'recorded_cases',
    'population', 'population_density', 'medicine_sales'
]

COLS = [
    'month', 'year', 'region', 'medicine', 'disease', 'recorded_cases',
    'population', 'population_density'
]

class Regressor(object):

    def __init__(self):
        pass

    def predict(self, month, year, region, medicine, disease, cases, population, density):
        train_file='data.csv'

        df_train = pd.read_csv(train_file, names=NAMES, skipinitialspace=True)

        le = LabelEncoder()
        le.fit(df_train['month'])
        df_train['month'] = le.transform(df_train['month'])
        le.fit(df_train['year'])
        df_train['year'] = le.transform(df_train['year'])
        le.fit(df_train['region'])
        df_train['region'] = le.transform(df_train['region'])
        le.fit(df_train['medicine'])
        df_train['medicine'] = le.transform(df_train['medicine'])
        le.fit(df_train['disease'])
        df_train['disease'] = le.transform(df_train['disease'])

        Y = df_train['medicine_sales']
        X = df_train.drop('medicine_sales', axis=1)

        lm = LinearRegression()
        lm.fit(X, Y)

        param = np.array([[month, year, region, medicine, disease, cases, population, density]])
        df_train = pd.DataFrame(param, index=[0], columns=COLS)
        le.fit(df_train['month'])
        df_train['month'] = le.transform(df_train['month'])
        le.fit(df_train['year'])
        df_train['year'] = le.transform(df_train['year'])
        le.fit(df_train['region'])
        df_train['region'] = le.transform(df_train['region'])
        le.fit(df_train['medicine'])
        df_train['medicine'] = le.transform(df_train['medicine'])
        le.fit(df_train['disease'])
        df_train['disease'] = le.transform(df_train['disease'])

        print(lm.coef_)

        return lm.predict(df_train)[0]

    def append(self, month, year, region, medicine, disease, cases, population, density):
        prediction = self.predict(month, year, region, medicine, disease, cases, population, density)

        with open('data.csv', 'a') as f:
            writer = csv.writer(f)
            fields = [month, year, region, medicine, disease, cases, population, density, int(prediction)]
            writer.writerow(fields)

        return int(prediction)

r = Regressor()
ls = sys.argv[0:]
if len(ls) < 9:
    print('error')
else:
    a = r.append(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))
    print(a)
sys.stdout.flush()