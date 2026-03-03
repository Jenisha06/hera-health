from flask import Flask, request, jsonify
from flask_cors import CORS
from hera_pattern_model import analyze_patterns
from hera_risk_model import check_risk_flags

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Hera ML Service is running 🌸'})

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        logs = data.get('logs', [])
        cycles = data.get('cycles', [])

        if len(logs) < 3:
            return jsonify({
                'correlations': [],
                'weeklyInsight': 'Keep logging daily — Hera needs at least 3 days of data to find patterns.',
                'riskFlags': []
            })

        correlations = analyze_patterns(logs)
        risk_flags = check_risk_flags(logs, cycles)

        return jsonify({
            'correlations': correlations,
            'riskFlags': risk_flags,
            'weeklyInsight': f'Based on your last {len(logs)} days of logging, Hera has found {len(correlations)} patterns.'
        })

    except Exception as e:
        print('Error:', e)
        return jsonify({'error': str(e)}), 500

@app.route('/riskflag', methods=['POST'])
def riskflag():
    try:
        data = request.get_json()
        logs = data.get('logs', [])
        cycles = data.get('cycles', [])
        risk_flags = check_risk_flags(logs, cycles)
        return jsonify({'riskFlags': risk_flags})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)