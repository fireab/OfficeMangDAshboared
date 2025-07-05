export interface IpaginateResponse{
    data: any[];
    metadata: {
        pagination: {
            page: number;
            limit: number;
            numberOfPages: number;
            numberOfResults: number;
        };
    };
}