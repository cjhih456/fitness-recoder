enum IMuscle {
  abdominals = 'abdominals',
  hamstrings = 'hamstrings',
  calves = 'calves',
  shoulders = 'shoulders',
  adductors = 'adductors',
  glutes = 'glutes',
  quadriceps = 'quadriceps',
  biceps = 'biceps',
  forearms = 'forearms',
  abductors = 'abductors',
  triceps = 'triceps',
  chest = 'chest',
  lower_back = 'lower back',
  traps = 'traps',
  middle_back = 'middle back',
  lats = 'lats',
  neck = 'neck',
}

enum IForce {
  pull = 'pull',
  push = 'push',
  static = 'static',
}

enum ILevel {
  beginner = 'beginner',
  intermediate = 'intermediate',
  expert = 'expert',
}

enum IMechanic {
  compound = 'compound',
  isolation = 'isolation',
}

enum IEquipment {
  body_only = 'body only',
  machine = 'machine',
  kettlebells = 'kettlebells',
  dumbbell = 'dumbbell',
  cable = 'cable',
  barbell = 'barbell',
  bands = 'bands',
  medicine_ball = 'medicine ball',
  exercise_ball = 'exercise ball',
  e_z_curl_bar = 'e-z curl bar',
  foam_roll = 'foam roll',
}

enum ICategory {
  strength = 'strength',
  stretching = 'stretching',
  plyometrics = 'plyometrics',
  strongman = 'strongman',
  powerlifting = 'powerlifting',
  cardio = 'cardio',
  olympic_weightlifting = 'olympic weightlifting',
  crossfit = 'crossfit',
  weighted_bodyweight = 'weighted bodyweight',
  assisted_bodyweight = 'assisted bodyweight',
}

interface IExercise {
  idx: number
  name: string;
  aliases?: string[];
  primaryMuscles: (keyof typeof IMuscle)[];
  secondaryMuscles: (keyof typeof IMuscle)[];
  force?: keyof typeof IForce;
  level: keyof typeof ILevel;
  mechanic?: keyof typeof IMechanic;
  equipment?: keyof typeof IEquipment;
  category: keyof typeof ICategory;
  instructions: string[];
  description?: string;
  tips?: string[];
}

type SelectedExercise = IExercise & { selected: boolean }