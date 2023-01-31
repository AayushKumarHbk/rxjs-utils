import { forkJoin, from, Observable } from "rxjs";
import { concatMap } from "rxjs/operators";
import { formBatches } from "./utils/formBatches";

/**
 * Function to process observables in batches.
 * Each time a batch finishes, this function `batchForkJoin` will return the array of values of that batch.
 * 
 * Note: If param {@link batchCount} doesn't contain a value, then all observables will be processed in a single batch.
 * 
 * @param observables list of observables to be processed as batches
 * @param batchCount max number of observables to be executed in a single batch
 * @returns 
 */
export function batchForkJoin<T>(observables: Observable<T>[], batchCount: number): Observable<T[]> {
    const batches = formBatches(observables, batchCount);
    return from(batches).pipe(
        concatMap((batch) => forkJoin(batch)),
    );
}