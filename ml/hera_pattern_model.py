import numpy as np
from collections import defaultdict

def analyze_patterns(logs):
    correlations = []
    symptom_days = defaultdict(list)
    
    for i, log in enumerate(logs):
        symptoms = [s['tag'] for s in log.get('parsedSymptoms', [])]
        for symptom in symptoms:
            symptom_days[symptom].append(i)
    
    symptoms_list = list(symptom_days.keys())
    
    for i in range(len(symptoms_list)):
        for j in range(i + 1, len(symptoms_list)):
            sym_a = symptoms_list[i]
            sym_b = symptoms_list[j]
            days_a = set(symptom_days[sym_a])
            days_b = set(symptom_days[sym_b])
            overlap = len(days_a & days_b)
            total = len(days_a | days_b)
            if total > 0:
                strength = round(overlap / total, 2)
                if strength >= 0.3:
                    correlations.append({
                        'symptomA': sym_a,
                        'symptomB': sym_b,
                        'strength': strength,
                        'insight': f'{sym_a.capitalize()} and {sym_b} appear together {int(strength * 100)}% of the time'
                    })
    
    correlations.sort(key=lambda x: x['strength'], reverse=True)
    
    moods = [log.get('mood', 0) for log in logs]
    sleeps = [log.get('sleep', 0) for log in logs]
    
    if len(moods) >= 3:
        mood_arr = np.array(moods)
        sleep_arr = np.array(sleeps)
        if mood_arr.std() > 0 and sleep_arr.std() > 0:
            correlation = np.corrcoef(mood_arr, sleep_arr)[0, 1]
            if correlation > 0.3:
                correlations.append({
                    'symptomA': 'mood',
                    'symptomB': 'sleep',
                    'strength': round(float(correlation), 2),
                    'insight': f'Your mood improves when you sleep more — {int(correlation * 100)}% correlation'
                })
    
    return correlations[:5]