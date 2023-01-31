import { Observable } from "rxjs";

/**
 * Function to convert a 1D array of observables into array of batches i.e. a 2D array.
 * 
 * Note: If param {@link batchCount} doesn't contain a value, then all observables will be processed in a single batch.
 * 
 * @param observables list of observables to be converted to batches
 * @param batchCount max number of observables to be executed in a single batch
 * @returns 
 */
export function formBatches<T>(observables: Observable<T>[], batchCount: number): Observable<T>[][] {
    if (!observables || observables.length === 0) {
        return [[]];
    }
    if (!batchCount) {
        return [observables];
    }
    const result = [];
    let index = 0;
    while (index < observables.length) {
        result.push(
            observables.slice(index, index + batchCount)
        );
        index += batchCount
    }
    return result;
}