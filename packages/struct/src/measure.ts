export declare namespace Measure {
  enum WeightModifier {
    positive = 'positive',
    negative = 'negative',
  }

  enum WeightUnit {
    kg = 'kg',
    lbs = 'lbs',
  }

  enum DistanceUnit {
    km = 'km',
    miles = 'miles',
  }

  enum IFields {
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
}

