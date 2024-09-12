declare enum WeightModifier {
  positive = 'positive',
  negative = 'negative',
}

declare enum WeightUnit {
  kg = 'kg',
  lbs = 'lbs',
}

declare enum DistanceUnit {
  km = 'km',
  miles = 'miles',
}

declare enum IFields {
  reps = 'reps',
  time = 'time',
  distance = 'distance',
  weight = 'weight',
}

interface Measure {
  requiredFields: (keyof typeof IFields)[];
  optionalFields?: (keyof typeof IFields)[];
  weightModifier?: keyof typeof WeightModifier;
  weightUnit?: keyof typeof WeightUnit;
  distanceUnit?: keyof typeof DistanceUnit;
}
