export enum ValibotIssueReason {
    // General
    InvalidType = 'invalid_type',
    Custom = 'custom',
  
    // String
    MinLength = 'min_length',
    MaxLength = 'max_length',
    Length = 'length',
    Pattern = 'pattern',
    StartsWith = 'starts_with',
    EndsWith = 'ends_with',
    Includes = 'includes',
  
    // Number
    MinValue = 'min_value',
    MaxValue = 'max_value',
    MultipleOf = 'multiple_of',
    Integer = 'integer',
  
    // Array
    NonEmpty = 'non_empty',
    MinItems = 'min_items',
    MaxItems = 'max_items',
  
    // Object
    MissingKeys = 'missing_keys',
    UnrecognizedKeys = 'unrecognized_keys',
  
    // Date
    MinDate = 'min_date',
    MaxDate = 'max_date',
  
    // Enum / Union
    InvalidUnion = 'invalid_union',
    InvalidEnumValue = 'invalid_enum_value',
  }
  