import pandas as pd
from google.cloud import firestore

def updateDatabase(request):
   
    data = pd.read_csv("https://drive.google.com/uc?export=download&id=17cckqbkP20FU2CKqXrGU_IL0_oTcO0cD")
    hateCrimes = pd.DataFrame(data)

    #Add a new document
    db = firestore.Client()
    doc_ref = db.collection('Crime').document('Crimes')

    hate_crimes_json = {}

    for i in range(len(hateCrimes.index)):
        bias = str(hateCrimes.loc[hateCrimes.index[i]].get('Bias'))
        lat = str(hateCrimes.loc[hateCrimes.index[i]].get('Latitude'))
        lon = str(hateCrimes.loc[hateCrimes.index[i]].get('Longitude'))
        dat = str(hateCrimes.loc[hateCrimes.index[i]].get('Incident Date'))
        hate_crimes_json[str(i)] = bias + ', ' + lat + ', ' + lon + ', ' + dat

    doc_ref.set(hate_crimes_json, merge = False)
    
    
    return 'database has updated'
