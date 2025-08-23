export enum PrismaErrorCode {
	// Common Constraint & Validation Errors
	ValueTooLong = 'P2000',
	UniqueConstraintFailed = 'P2002',
	ForeignKeyConstraintFailed = 'P2003',
	ConstraintFailed = 'P2004',
	InvalidStoredValue = 'P2005',
	NullConstraintFailed = 'P2011',
	MissingRequiredValue = 'P2012',
	MissingRelation = 'P2018',

	// Record & Query Errors
	RecordDoesNotExist = 'P2001',
	RecordNotFound = 'P2025',
	QueryInterpretationError = 'P2010',
	ArgumentError = 'P2009',

	// Input & Data Errors
	InputError = 'P2014',
	RelationViolation = 'P2015',
	InvalidInput = 'P2022',
	ValueOutOfRange = 'P2023',

	// Initialization & Configuration
	InitializationError = 'P1000',
	AuthenticationFailed = 'P1001',
	DatabaseNotFound = 'P1003',
	DatabaseAccessDenied = 'P1005',
	DatabaseDoesNotExist = 'P1008',
	TimedOutFetchingSchema = 'P1011',

	// Internal Errors
	InternalServerError = 'P5000',
	UnknownError = 'P5001',
}
