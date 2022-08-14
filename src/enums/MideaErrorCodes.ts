// MideaErrorCodes enum – This is a list of errors and their meaning to better understand them in code
export enum MideaErrorCodes {
	// MideaAir / NetHomePlus
	DeviceUnreachable = 3123,
	CommandNotAccepted = 3176,
	InvalidLogin = 3101,
	InvalidSession = 3106,
	SignIllegal = 3301,
	ValueIllegal = 3004,
	NoOpenIdOrUnionId = 3002,
	// MSmartHome
	UnknownError = 1,
	InvalidArgument = 30005,
	NoAccessTokenSupplied = 40001,
	NoRouteMatchedWithThoseValues = 40404,
	BadSignature = 44003,
}