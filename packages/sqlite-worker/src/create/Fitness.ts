import { MigrationQueryBus, QueryType } from '..'
import FlatData from './fitness-datas/fitness-flat-data.json'
import type Sqlite3 from '../Sqlite3'

export default function create(db: Sqlite3) {
  db.exec(`CREATE TABLE IF NOT EXISTS fitness (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      aliases TEXT CHECK( json_valid(aliases) ),
      primaryMuscles TEXT CHECK( json_valid(primaryMuscles) ),
      secondaryMuscles TEXT CHECK( json_valid(secondaryMuscles) ),
      force TEXT CHECK( force IN (null, 'pull','push','static') ),
      level TEXT CHECK( level IN ('beginner','intermediate','expert') ),
      mechanic TEXT CHECK( mechanic in (null, 'compound','isolation') ),
      equipment TEXT CHECK( equipment in (null, 'body_only','machine','kettlebells','dumbbell','cable','barbell','bands','medicine_ball','exercise_ball','e-z_curl_bar','foam_roll') ),
      category TEXT CHECK( category in ('strength','stretching','plyometrics','strongman','powerlifting','cardio','olympic_weightlifting','crossfit','weighted_bodyweight','assisted_bodyweight') ),
      instructions TEXT CHECK( json_valid(instructions) ),
      description TEXT,
      tips TEXT CHECK( json_valid(tips) )
    )`)
}

export function migrate(bus: MigrationQueryBus, v: Versions) {
  switch (v) {
    case '0.1.0': {
      const loadData = async () => {
        const sql = Array(FlatData.length / 12).fill('(?,?,?,?,?,?,?,?,?,?,?,?)').join(',')
        return {
          sql,
          value: FlatData
        }
      }
      const list = bus.get(v) || []
      list.push(loadData().then(({ sql, value }) => {
        return {
          sql: `insert into fitness (
            name,
            aliases,
            primaryMuscles,
            secondaryMuscles,
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
}