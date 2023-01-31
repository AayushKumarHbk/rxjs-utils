import { from, Observable } from "rxjs";
import { concatMap } from "rxjs/operators";

export function sequential<T>(observables: Observable<T>[]): Observable<T> {
    if (!observables || observables.length === 0) {
        return new Observable(subscriber => subscriber.complete());
    }
    return from(observables).pipe(
        concatMap(observable => observable)
    )
}