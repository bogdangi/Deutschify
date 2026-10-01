import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TOPICS } from '../public/js/data/topics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.join(projectRoot, 'public', 'data');
const topicsDir = path.join(dataDir, 'topics');

if (!fs.existsSync(topicsDir)) {
  fs.mkdirSync(topicsDir, { recursive: true });
}

const topicsManifest = [];

for (const topic of TOPICS) {
  const { exercises, ...meta } = topic;
  const filename = `${topic.id}.json`;
  const topicFilePath = path.join(topicsDir, filename);

  const topicData = {
    ...meta,
    totalExercises: exercises ? exercises.length : 0,
    exercises: exercises || []
  };

  fs.writeFileSync(topicFilePath, JSON.stringify(topicData, null, 2), 'utf-8');
  console.log(`Exported topic '${topic.id}' with ${topicData.totalExercises} exercises -> ${filename}`);

  topicsManifest.push({
    ...meta,
    totalExercises: topicData.totalExercises,
    file: `topics/${filename}`
  });
}

const manifestPath = path.join(dataDir, 'topics.json');
fs.writeFileSync(manifestPath, JSON.stringify(topicsManifest, null, 2), 'utf-8');
console.log(`Exported topics manifest -> ${manifestPath}`);
