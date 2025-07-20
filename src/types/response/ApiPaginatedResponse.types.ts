export default interface ApiPaginatedResponse<T> {

    data: T[];

    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
        links: Array<{ url: string | null, label: string, active: boolean }>;
    };

    links: {
        first: string | null;
        last: string | null;
        prev: string | null;
        next: string | null;
    };

    status: number;

    message: string;

    errors?: Record<string, string[]>;

}