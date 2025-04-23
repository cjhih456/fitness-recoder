import type { MigrationQueryBus } from '..';
import type Sqlite3 from '../Sqlite3'
import { isNewVersion } from './Version';

const createExercisePresetExerciseTableSql = `CREATE TABLE IF NOT EXISTS exercisePreset_exercise (
  exercisePresetId INTEGER REFERENCES exercisePreset(id) ON DELETE CASCADE,
  exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE
)`

const deleteTriggerOnExercisePresetExercise = `CREATE TRIGGER IF NOT EXISTS delete_exercises_after_exercisePreset_delete
BEFORE DELETE ON exercisePreset
FOR EACH ROW
BEGIN
    DELETE FROM exercise 
    WHERE id IN (
        SELECT exerciseId 
        FROM exercisePreset_exercise 
        WHERE exercisePresetId = OLD.id
    );
END;`

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version
  db.exec(`CREATE TABLE IF NOT EXISTS exercisePreset (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      deps INTEGER
    )`)
  db.exec(createExercisePresetExerciseTableSql)
  db.exec(deleteTriggerOnExercisePresetExercise)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  if (isNewVersion(v, '1.3.0')) {
    const queryList = db.get('1.3.0') || []
    queryList.push({
      sql: 'alter table exercisePreset_exercise rename to exercisePreset_exercise_old',
      args: []
    })
    queryList.push({
      sql: createExercisePresetExerciseTableSql,
      args: []
    })
    queryList.push({
      sql: 'insert into exercisePreset_exercise (exercisePresetId, exerciseId) select exercisePresetId, exerciseId from exercisePreset_exercise_old',
      args: []
    })
    queryList.push({
      sql: 'drop table exercisePreset_exercise_old',
      args: []
    })
    queryList.push({
      sql: deleteTriggerOnExercisePresetExercise,
      args: []
    })
    db.set('1.3.0', queryList)
  }
}