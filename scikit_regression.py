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

MEDICINE = [
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

    def predict_region(self, month=None, year=None, region=None, medicine=None, 
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

        Y = df_train['medicine_sales']
        X = df_train
        X = X.drop('medicine_sales', axis=1)
        X = X.drop('recorded_cases', axis=1)
        X = X.drop('disease', axis=1)

        NAMES2.remove('recorded_cases')
        NAMES2.remove('disease')
        NAMES2.remove('medicine_sales')

        lm = LinearRegression()
        lm.fit(X, Y)

        i = 0
        while i < len(MEDICINE):
            medicine = MEDICINE[i]
            sales = int(population * 0.75)
            param = np.array([[month, year, region, medicine, population, density]])

            df_train = pd.DataFrame(param, index=[0], columns=NAMES2)
            df_train['region'] = r_le.transform(df_train['region'])
            df_train['medicine'] = med_le.transform(df_train['medicine'])

            dis[medicine] = int(lm.predict(df_train)[0])
            i = i + 1

        return dis

r = Regressor()
ls = sys.argv[0:]

if int(ls[9]) == 1:
    a = r.predict(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))
elif int(ls[9]) == 2:
    a = r.predict_cases(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))
else:
    a = r.predict_region(ls[1], ls[2], ls[3], ls[4], ls[5], int(ls[6]), int(ls[7]), int(ls[8]))

print(a)
sys.stdout.flush()