import type { MigrationQueryBus, QueryType } from '..';
import type Sqlite3 from '../Sqlite3'
import { isNewVersion } from './Version.ts';

export default function create(db: Sqlite3) {
  db.exec(`CREATE TABLE IF NOT EXISTS fitness (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      aliases TEXT CHECK( json_valid(aliases) and json_type(aliases) = 'array' ),
      primaryMuscles TEXT CHECK( json_valid(primaryMuscles) and json_type(primaryMuscles) = 'array' ),
      secondaryMuscles TEXT CHECK( json_valid(secondaryMuscles) and json_type(secondaryMuscles) = 'array' ),
      totalUseMuscles TEXT CHECK( json_valid(totalUseMuscles) and json_type(totalUseMuscles) = 'array' ),
      force TEXT CHECK( force IN (null, 'pull','push','static') ),
      level TEXT CHECK( level IN ('beginner','intermediate','expert') ),
      mechanic TEXT CHECK( mechanic in (null, 'compound','isolation') ),
      equipment TEXT CHECK( equipment in (null, 'body_only','machine','kettlebells','dumbbell','cable','barbell','bands','medicine_ball','exercise_ball','e-z_curl_bar','foam_roll') ),
      category TEXT CHECK( category in ('strength','stretching','plyometrics','strongman','powerlifting','cardio','olympic_weightlifting','crossfit','weighted_bodyweight','assisted_bodyweight') ),
      instructions TEXT CHECK( json_valid(instructions) and json_type(instructions) = 'array' ),
      description TEXT,
      tips TEXT CHECK( json_valid(tips) and json_type(tips) = 'array' )
    )`)
}

export function migrate(bus: MigrationQueryBus, v: Versions) {
  if (isNewVersion(v, '0.1.0')) {
    const loadData = async () => {
      const data = () => import('./fitness-datas/fitness-flat-data.ts')
      const loaded = await data()
      const json_loaded = loaded.fitnessData
      const sql = Array(json_loaded.length / 13).fill('(?,?,?,?,?,?,?,?,?,?,?,?,?)').join(',')
      return {
        sql,
        value: json_loaded
      }
    }
    const list = bus.get('0.1.0') || []
    list.push(loadData().then(({ sql, value }) => {
      return {
        sql: `insert into fitness (
            name,
            aliases,
            primaryMuscles,
            secondaryMuscles,
            totalUseMuscles,
            force,
            level,
            mechanic,
            equipment,
            category,
            instructions,
            description,
            tips
          ) values ${sql}
        `,
        args: value
      } as QueryType
    }))
    bus.set(v, list)
  }
}