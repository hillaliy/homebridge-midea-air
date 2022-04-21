// MideaErrorCodes enum – This is a list of errors and their meaning to better understand them in code
export enum MideaErrorCodes {
	NoOpenIdOrUnionId = 3002,
	ValueIllegal = 3004,
	InvalidPassword = 3101,
	InvalidUsername = 3102,
	InvalidSession = 3106,
	DeviceUnreachable = 3123,
	RestartFull = 3144,
	CommandNotAccepted = 3176, // The asyn reply does not exist
	SignIllegal = 3301, // Invalid app key
	RetryLater = 7610,
	SystemError = 9999
}