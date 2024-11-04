export interface IPaginationParams {
	page: number;
	perPage: number;
}

export interface IPaginationResponse {
	page: number;
	perPage: number;
	totalPages: number;
	totalOccurrences: number;
}
