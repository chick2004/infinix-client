export default interface ApiResponse<T> {

    data?: T;

    message?: string;

    status?: number;

    errors?: Record<string, string[]>;

}