export const isFetchError = <T>(result: T | NextClientEndpointError): result is NextClientEndpointError => {
	return (result as NextClientEndpointError).error !== undefined
}
