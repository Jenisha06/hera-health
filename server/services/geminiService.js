const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


exports.parseSymptoms = async (rawInput) => {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a women's health assistant. Analyze this text and extract symptoms.
Text: "${rawInput}"

Return ONLY a JSON array like this, nothing else, no markdown:
[
  {"tag": "fatigue", "severity": "moderate"},
  {"tag": "bloating", "severity": "mild"}
]

Severity must be one of: mild, moderate, severe.
Only include actual physical or emotional symptoms.
If no symptoms found return empty array [].`
        }
      ],
      temperature: 0.1
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.log('Groq parse error:', err.message);
    return [];
  }
};

// Generate weekly insight
exports.generateWeeklyInsight = async (logs) => {
  try {
    const logSummary = logs.map(l =>
      `Date: ${new Date(l.date).toDateString()}, Symptoms: ${l.parsedSymptoms?.map(s => s.tag).join(', ') || 'none'}, Mood: ${l.mood}/5, Sleep: ${l.sleep}hrs`
    ).join('\n');

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a compassionate women's health assistant.
Based on these daily logs, write a warm 2-3 sentence weekly insight summary in plain language.
Focus on patterns you notice. Do not diagnose. Be encouraging.

Logs:
${logSummary}

Return only the insight text, no extra formatting.`
        }
      ],
      temperature: 0.7
    });

    return completion.choices[0].message.content.trim();
  } catch (err) {
    console.log('Groq insight error:', err.message);
    return 'Keep logging daily — Hera will generate your weekly insight once it has enough data.';
  }
};

// Generate doctor prep sheet
exports.generateDoctorPrep = async (logs, cycles, riskFlags) => {
  try {
    const logSummary = logs.slice(0, 28).map(l =>
      `${new Date(l.date).toDateString()}: ${l.rawInput} (Mood: ${l.mood}/5, Sleep: ${l.sleep}hrs)`
    ).join('\n');

    const cycleSummary = cycles.slice(0, 3).map(c =>
      `Period: ${new Date(c.periodStartDate).toDateString()}, Flow: ${c.flowLevel}/3, Pain: ${c.painLevel}/5`
    ).join('\n');

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a medical assistant helping a woman prepare for a gynecology appointment.
Based on her health logs, create a professional doctor prep sheet.

Daily Logs (last 28 days):
${logSummary}

Cycle History:
${cycleSummary}

Risk Flags: ${riskFlags.join(', ') || 'none'}

Return a JSON object like this, no markdown:
{
  "summary": "2-3 sentence professional patient summary",
  "highlights": [
    {"icon": "📅", "label": "Cycle", "value": "brief value"},
    {"icon": "😴", "label": "Avg Sleep", "value": "X hours"},
    {"icon": "😐", "label": "Avg Mood", "value": "X/5"},
    {"icon": "⚠️", "label": "Risk Flag", "value": "brief flag"}
  ],
  "questions": [
    "Question 1 to ask doctor",
    "Question 2 to ask doctor",
    "Question 3 to ask doctor",
    "Question 4 to ask doctor",
    "Question 5 to ask doctor"
  ]
}

Return only valid JSON, nothing else.`
        }
      ],
      temperature: 0.3
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.log('Groq doctor prep error:', err.message);
    return null;
  }
};

// Generate dismiss-proof response
exports.generateDismissProof = async (doctorSaid, symptoms) => {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'user',
          content: `You are a women's health advocate helping a patient respond to their doctor.
The doctor said: "${doctorSaid}"
The patient's tracked symptoms include: ${symptoms.join(', ')}

Return a JSON object like this, no markdown:
{
  "message": "2-3 sentences of evidence-based context about why these symptoms deserve investigation",
  "tests": [
    "Specific test 1 to request by name",
    "Specific test 2 to request by name",
    "Specific test 3 to request by name",
    "Specific test 4 to request by name"
  ],
  "script": "A polite but firm 2-3 sentence script the patient can say to their doctor"
}

Return only valid JSON, nothing else.`
        }
      ],
      temperature: 0.3
    });

    const text = completion.choices[0].message.content;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.log('Groq dismiss proof error:', err.message);
    return null;
  }
};