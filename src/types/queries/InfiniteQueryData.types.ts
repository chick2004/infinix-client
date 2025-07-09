export default interface InfiniteQueryData<T> {

    pages: T[];

    pageParams: (number | undefined)[];
    
}