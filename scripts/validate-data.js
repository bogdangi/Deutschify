import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataDir = path.join(projectRoot, 'public', 'data');
const manifestPath = path.join(dataDir, 'topics.json');

console.log('🔍 Validating Deutschify Data Files...');

if (!fs.existsSync(manifestPath)) {
  console.error(`❌ Manifest not found at: ${manifestPath}`);
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
} catch (err) {
  console.error(`❌ Failed to parse manifest ${manifestPath}:`, err.message);
  process.exit(1);
}

if (!Array.isArray(manifest) || manifest.length === 0) {
  console.error('❌ Manifest must be a non-empty array of topics.');
  process.exit(1);
}

let errors = 0;
let warnings = 0;
const seenTopicIds = new Set();
const seenExerciseIds = new Map();
let totalExercisesCount = 0;

for (const topicMeta of manifest) {
  const { id, title, icon, level, color, file, totalExercises } = topicMeta;

  if (!id || typeof id !== 'string') {
    console.error(`❌ Topic manifest entry missing valid 'id':`, topicMeta);
    errors++;
    continue;
  }

  if (seenTopicIds.has(id)) {
    console.error(`❌ Duplicate topic ID found in manifest: '${id}'`);
    errors++;
  }
  seenTopicIds.add(id);

  if (!file) {
    console.error(`❌ Topic '${id}' is missing 'file' property.`);
    errors++;
    continue;
  }

  const topicFilePath = path.join(dataDir, file);
  if (!fs.existsSync(topicFilePath)) {
    console.error(`❌ Topic file not found for '${id}': ${topicFilePath}`);
    errors++;
    continue;
  }

  let topicData;
  try {
    topicData = JSON.parse(fs.readFileSync(topicFilePath, 'utf-8'));
  } catch (err) {
    console.error(`❌ JSON parse error in ${file}:`, err.message);
    errors++;
    continue;
  }

  if (topicData.id !== id) {
    console.error(`❌ ID mismatch: manifest has '${id}', but ${file} has '${topicData.id}'`);
    errors++;
  }

  if (!Array.isArray(topicData.exercises)) {
    console.error(`❌ Topic '${id}' in ${file} has no valid 'exercises' array.`);
    errors++;
    continue;
  }

  if (typeof totalExercises === 'number' && totalExercises !== topicData.exercises.length) {
    console.warn(`⚠️ Manifest totalExercises (${totalExercises}) does not match actual count (${topicData.exercises.length}) in ${file}`);
    warnings++;
  }

  topicData.exercises.forEach((ex, idx) => {
    totalExercisesCount++;
    const loc = `${id}[${idx}]`;

    if (!ex.id) {
      console.error(`❌ ${loc}: Missing exercise 'id'`);
      errors++;
    } else {
      if (seenExerciseIds.has(ex.id)) {
        console.error(`❌ Duplicate exercise ID '${ex.id}' in ${loc}, previously seen in ${seenExerciseIds.get(ex.id)}`);
        errors++;
      } else {
        seenExerciseIds.set(ex.id, loc);
      }
    }

    if (typeof ex.prefix !== 'string' || typeof ex.suffix !== 'string') {
      console.error(`❌ ${loc} (${ex.id}): Missing prefix or suffix strings.`);
      errors++;
    }

    if (!ex.correctAnswer || typeof ex.correctAnswer !== 'string') {
      console.error(`❌ ${loc} (${ex.id}): Missing or invalid 'correctAnswer'.`);
      errors++;
    }

    if (!Array.isArray(ex.options) || ex.options.length < 2) {
      console.error(`❌ ${loc} (${ex.id}): 'options' must be an array of at least 2 choices.`);
      errors++;
    } else {
      const correctLower = ex.correctAnswer.toLowerCase();
      const hasCorrectInOptions = ex.options.some((opt) => opt.toLowerCase() === correctLower);
      if (!hasCorrectInOptions) {
        console.error(`❌ ${loc} (${ex.id}): correctAnswer '${ex.correctAnswer}' is NOT present in options: [${ex.options.join(', ')}]`);
        errors++;
      }
    }

    if (ex.acceptableAnswers && !Array.isArray(ex.acceptableAnswers)) {
      console.error(`❌ ${loc} (${ex.id}): 'acceptableAnswers' must be an array.`);
      errors++;
    }
  });
}

console.log('--------------------------------------------------');
console.log(`Validated ${seenTopicIds.size} topics and ${totalExercisesCount} exercises.`);
if (warnings > 0) {
  console.log(`⚠️ Warnings: ${warnings}`);
}

if (errors > 0) {
  console.error(`❌ Validation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('✅ All data files are valid and conform to schema!');
}
