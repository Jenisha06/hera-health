from collections import Counter

def check_risk_flags(logs, cycles):
    risk_flags = []
    
   
    all_symptoms = []
    for log in logs:
        symptoms = [s['tag'] for s in log.get('parsedSymptoms', [])]
        all_symptoms.extend(symptoms)
    
    symptom_counts = Counter(all_symptoms)
    total_logs = len(logs)
    
    if total_logs == 0:
        return risk_flags
    
    
    pcos_symptoms = ['irregular periods', 'acne', 'weight gain', 'fatigue', 'hair fall']
    pcos_matches = sum(1 for s in pcos_symptoms if symptom_counts.get(s, 0) > 0)
    if pcos_matches >= 3:
        risk_flags.append({
            'condition': 'PCOS',
            'confidence': 'moderate' if pcos_matches == 3 else 'high',
            'message': f'You have logged {pcos_matches} symptoms commonly associated with PCOS. Consider discussing this with a gynecologist.'
        })
    
   
    thyroid_symptoms = ['fatigue', 'weight gain', 'hair fall', 'mood swings', 'cold sensitivity']
    thyroid_matches = sum(1 for s in thyroid_symptoms if symptom_counts.get(s, 0) > 0)
    if thyroid_matches >= 3:
        risk_flags.append({
            'condition': 'Thyroid',
            'confidence': 'moderate' if thyroid_matches == 3 else 'high',
            'message': f'You have logged {thyroid_matches} symptoms that may indicate a thyroid issue. A TSH test is recommended.'
        })
    
   
    anaemia_symptoms = ['fatigue', 'dizziness', 'headache', 'low energy', 'pale skin']
    anaemia_matches = sum(1 for s in anaemia_symptoms if symptom_counts.get(s, 0) > 0)
    if anaemia_matches >= 2:
        risk_flags.append({
            'condition': 'Anaemia',
            'confidence': 'low' if anaemia_matches == 2 else 'moderate',
            'message': f'Frequent fatigue and related symptoms may indicate iron deficiency. Consider a CBC blood test.'
        })
    
  
    if len(cycles) >= 2:
        cycle_lengths = []
        sorted_cycles = sorted(cycles, key=lambda x: x.get('periodStartDate', ''))
        for i in range(1, len(sorted_cycles)):
            try:
                from datetime import datetime
                date_format = '%Y-%m-%dT%H:%M:%S.%fZ'
                prev = datetime.strptime(sorted_cycles[i-1]['periodStartDate'], date_format)
                curr = datetime.strptime(sorted_cycles[i]['periodStartDate'], date_format)
                diff = (curr - prev).days
                cycle_lengths.append(diff)
            except:
                pass
        
        if cycle_lengths:
            avg_length = sum(cycle_lengths) / len(cycle_lengths)
            if avg_length < 21 or avg_length > 35:
                risk_flags.append({
                    'condition': 'Irregular Cycle',
                    'confidence': 'high',
                    'message': f'Your average cycle length is {int(avg_length)} days which is outside the normal range of 21-35 days.'
                })
   
    high_pain_cycles = [c for c in cycles if c.get('painLevel', 0) >= 4]
    if len(high_pain_cycles) >= 2:
        risk_flags.append({
            'condition': 'Severe Period Pain',
            'confidence': 'high',
            'message': 'You have reported severe period pain multiple times. This could indicate endometriosis and should be investigated.'
        })
    
    return risk_flags