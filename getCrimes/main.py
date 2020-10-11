from google.cloud import firestore
from flask import jsonify

def getAllCrimes(request):

    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)
    
    db = firestore.Client()
    doc_ref = db.collection('Crime').document('Crimes')
    crimes = doc_ref.get()
    crimes = crimes.to_dict()
    api = []
    
    neighborhoods = {}
    for i in range(len(crimes)):
            split = crimes[str(i)].split(", ")
            coord = split[1] + (', ') + split[2]
            if coord in neighborhoods:
                neighborhoods[coord] += 1
            else:
                neighborhoods[coord] = 1
            
    api.append(neighborhoods)
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    return (jsonify(api), 200, headers)