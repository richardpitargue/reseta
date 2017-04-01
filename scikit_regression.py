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

NAMES2 = [
    'month', 'year', 'region', 'medicine', 'disease', 'recorded_cases',
    'population', 'population_density', 'medicine_sales'
]

COLS = [
    'month', 'year', 'region', 'medicine', 'disease', 'recorded_cases',
    'population', 'population_density'
]

TEMP = [
    'month', 'year', 'region'
]

DISEASES = [
    'HIV/STI', 'Neonatal Tetanus', 'Pertussis', 'Cholera', 'Typhoid',
    'Rotavirus', 'Leptospirosis', 'Diptheria', 'Dengue', 'Chikungunya',
    'Measles', 'Acute Flaccid Paralysis', 'Hand Foot and Mouth Disease',
    'Influenza', 'Malaria'
]

class Regressor(object):

    def __init__(self):
        pass

    def predict(self, month=None, year=None, region=None, medicine=None, 
                disease=None, cases=None, population=None, density=None):
        train_file='data.csv'

        df_train = pd.read_csv(train_file, names=NAMES, skipinitialspace=True)

        r_le = LabelEncoder()
        r_le.fit(df_train['region'])
        df_train['region'] = r_le.transform(df_train['region'])
        med_le = LabelEncoder()
        med_le.fit(df_train['medicine'])
        df_train['medicine'] = med_le.transform(df_train['medicine'])
        d_le = LabelEncoder()
        d_le.fit(df_train['disease'])
        df_train['disease'] = d_le.transform(df_train['disease'])

        Y = df_train['medicine_sales']
        X = df_train.drop('medicine_sales', axis=1)

        lm = LinearRegression()
        lm.fit(X, Y)

        param = np.array([[month, year, region, medicine, disease, cases, population, density]])
        df_train = pd.DataFrame(param, index=[0], columns=COLS)
        df_train['region'] = r_le.transform(df_train['region'])
        df_train['medicine'] = med_le.transform(df_train['medicine'])
        df_train['disease'] = d_le.transform(df_train['disease'])

        return lm.predict(df_train)[0]

    def append(self, month, year, region, medicine, disease, cases, population, density):
        prediction = self.predict(month, year, region, medicine, disease, cases, population, density)

        with open('data.csv', 'a') as f:
            writer = csv.writer(f)
            fields = [month, year, region, medicine, disease, cases, population, density, int(prediction)]
            writer.writerow(fields)

        return int(prediction)

    def predict_cases(self, month=None, year=None, region=None, medicine=None, 
                      disease=None, cases=None, population=None, density=None):
        train_file='data.csv'

        df_train = pd.read_csv(train_file, names=NAMES, skipinitialspace=True)

        dis = {}

        r_le = LabelEncoder()
        r_le.fit(df_train['region'])
        df_train['region'] = r_le.transform(df_train['region'])
        med_le = LabelEncoder()
        med_le.fit(df_train['medicine'])
        df_train['medicine'] = med_le.transform(df_train['medicine'])
        d_le = LabelEncoder()
        d_le.fit(df_train['disease'])
        df_train['disease'] = d_le.transform(df_train['disease'])

        Y = df_train['recorded_cases']
        X = df_train.drop('recorded_cases', axis=1)
        lm = LinearRegression()
        lm.fit(X, Y)

        NAMES2.remove('recorded_cases')
        i = 0
        while i < len(DISEASES):
            disease = DISEASES[i]
            sales = self.predict(month, year, region, medicine, disease, population, population, density)
            param = np.array([[month, year, region, medicine, disease, population, density, sales]])

            df_train = pd.DataFrame(param, index=[0], columns=NAMES2)
            df_train['region'] = r_le.transform(df_train['region'])
            df_train['medicine'] = med_le.transform(df_train['medicine'])
            df_train['disease'] = d_le.transform(df_train['disease'])

            dis[disease] = int(lm.predict(df_train)[0])
            i = i + 1

        return dis

r = Regressor()
ls = sys.argv[0:]

if int(ls[9]) == 1:
    a = r.predict(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))
else:
    a = r.predict_cases(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))

print(a)
sys.stdout.flush()