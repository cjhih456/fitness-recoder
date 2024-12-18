type FieldValues = import('react-hook-form').FieldValues
type Path<T extends FieldValues> = import('react-hook-form').Path<T>
type PathValue<T extends FieldValues> = import('react-hook-form').PathValue<T, Path<T>>

declare type RHFValues<TFieldValues extends FieldValues = FieldValues> = TFieldValues


declare type RHFDefaultValue<T extends RHFValues> = PathValue<T, Path<T>>