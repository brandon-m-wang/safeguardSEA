import pandas as pd
import numpy as np
from flask import jsonify


hate_crimes = pd.read_csv("D:\Symbolized_Bias_Full_Data_data.csv")
locations = pd.read_csv("D:\MCPP_Map_data.csv")
locations = locations[["Neighborho", "Latitude (generated)", "Longitude (generated)"]]
hate_crimes = hate_crimes[~(hate_crimes['Mcpp'] == "UNKNOWN")]
hate_crimes = hate_crimes[~(hate_crimes['Mcpp'] == "NULL")]
hate_crimes = hate_crimes[~(hate_crimes['Mcpp'] == "null")]


locations_dict = {}
for i in range(len(locations.index)):
    locations_dict[locations.at[i, "Neighborho"]] = [locations.at[i, "Latitude (generated)"], locations.at[i, "Longitude (generated)"]]


hate_crimes = hate_crimes[['Specific Bias Type', 'Mcpp', 'Incident Date']]
hate_crimes = hate_crimes[~hate_crimes['Specific Bias Type'].str.contains("Disability")]

for i in range(len(hate_crimes.index)):
    if i in hate_crimes.index and type(hate_crimes.at[i, "Mcpp"]) != float:
        print(i)
        print(type(hate_crimes.at[i, "Mcpp"]))
        hate_crimes.at[i, "Mcpp"] = locations_dict[hate_crimes.at[i, "Mcpp"]]


hate_crimes_final = pd.read_csv(r"D:\update102020.csv")


hate_crimes_json = []


for i in range(len(hate_crimes_final.index)):
    if i in hate_crimes_final.index and isinstance(hate_crimes_final.at[i, "Specific Bias Type"], str):
        hate_crimes_json.append({"Bias": hate_crimes_final.at[i, "Specific Bias Type"], "Location": hate_crimes_final.at[i, "Mcpp"], "Incident Date": hate_crimes_final.at[i, "Incident Date"]})

print(hate_crimes_json)