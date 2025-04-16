import type { MigrationQueryBus } from '..';
import type Sqlite3 from '../Sqlite3'

const createScheduleExerciseTableSql = `CREATE TABLE IF NOT EXISTS schedule_exercise (
  scheduleId INTEGER REFERENCES schedule(id) ON DELETE CASCADE,
  exerciseId INTEGER REFERENCES exercise(id) ON DELETE CASCADE
)`

const deleteTriggerOnScheduleExercise = `CREATE TRIGGER IF NOT EXISTS delete_exercises_after_schedule_delete
BEFORE DELETE ON schedule
FOR EACH ROW
BEGIN
    DELETE FROM exercise 
    WHERE id IN (
        SELECT exerciseId 
        FROM schedule_exercise 
        WHERE scheduleId = OLD.id
    );
END;`

export default function create(db: Sqlite3) {
  // TODO: add migration steps by Process Version

  db.exec(`CREATE TABLE IF NOT EXISTS schedule (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      year INTEGER,
      month INTEGER,
      date INTEGER,
      start INTEGER,
      beforeTime INTEGER,
      breakTime INTEGER,
      workoutTimes INTEGER,
      type TEXT
    )`)
  db.exec(createScheduleExerciseTableSql)
  db.exec(deleteTriggerOnScheduleExercise)
}

export function migrate(db: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '1.1.0': {
      const queryList = db.get('1.1.0') || []
      queryList.push({
        sql: 'alter table schedule_exercise rename to schedule_exercise_old',
        args: []
      })
      queryList.push({
        sql: createScheduleExerciseTableSql,
        args: []
      })
      queryList.push({
        sql: 'insert into schedule_exercise (scheduleId, exerciseId) select scheduleId, exerciseId from schedule_exercise_old',
        args: []
      })
      queryList.push({
        sql: 'drop table schedule_exercise_old',
        args: []
      })
      queryList.push({
        sql: deleteTriggerOnScheduleExercise,
        args: []
      })
      db.set('1.1.0', queryList)
    } break
  }
}