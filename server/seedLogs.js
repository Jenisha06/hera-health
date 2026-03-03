require('dotenv').config();
const mongoose = require('mongoose');
const DailyLog = require('./models/DailyLog');

const userId = '69a6d7baacf2a7dddc9c161a';

const logs = [
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), rawInput: 'Really tired, bloated and headache', mood: 2, sleep: 5, parsedSymptoms: [{ tag: 'fatigue', severity: 'moderate' }, { tag: 'bloating', severity: 'mild' }, { tag: 'headache', severity: 'mild' }] },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), rawInput: 'Feeling okay, little tired', mood: 3, sleep: 7, parsedSymptoms: [{ tag: 'fatigue', severity: 'mild' }] },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), rawInput: 'Bad cramps, very bloated and tired', mood: 1, sleep: 4, parsedSymptoms: [{ tag: 'fatigue', severity: 'severe' }, { tag: 'bloating', severity: 'severe' }, { tag: 'cramps', severity: 'severe' }] },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), rawInput: 'Feeling better, mild headache', mood: 4, sleep: 8, parsedSymptoms: [{ tag: 'headache', severity: 'mild' }] },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), rawInput: 'Tired again, bloated and mood swings', mood: 2, sleep: 5, parsedSymptoms: [{ tag: 'fatigue', severity: 'moderate' }, { tag: 'bloating', severity: 'moderate' }, { tag: 'mood swings', severity: 'mild' }] },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), rawInput: 'Good day, felt energetic', mood: 5, sleep: 9, parsedSymptoms: [] },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  for (const log of logs) {
    await DailyLog.create({ userId, ...log });
  }
  console.log('Seed logs created ✅');
  process.exit();
}).catch(err => console.log(err));