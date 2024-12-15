export declare namespace Measure {
  type WeightModifier = 'positive' |
    'negative'

  type WeightUnit = 'kg' |
    'lbs'

  type DistanceUnit = 'km' |
    'miles'

  type IFields = 'reps' |
    'time' |
    'distance' |
    'weight'

  interface Measure {
    requiredFields: IFields[];
    optionalFields?: IFields[];
    weightModifier?: WeightModifier;
    weightUnit?: WeightUnit;
    distanceUnit?: DistanceUnit;
  }
}
