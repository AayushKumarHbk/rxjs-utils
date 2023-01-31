
## Operators

Below is the list of operators that this library has to offer:

 - batchForkJoin
 - sequential

### 1. batchForkJoin

This operator is used to process a forkJoin in batches. The regular rxjs operator 'forkJoin' has a major drawback i.e. it executes all observables at once and there is no way to make them execute in batches. This custom operator 'batchForkJoin' overcomes this drawback.

#### Parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `observables` | `Observable<T>` | **Required**. Array of observables that need to be processed in batches |
| `batchCount` | `Number` | **Optional**. This number tells the operator to split input `observables` into how many batches. If this parameter is empty, `batchForkJoin` will operate like a regular `forkJoin` |

#### batchForkJoin(observables, batchCount)

Takes an array of observables, execute them into a user-defined number of batches, executes them and returns the responses in the same way i.e. in  batches


#### Example

Let us consider a scenario where a developer wants to process 20 requests in batches where each batch contains 5 requests.

To achieve this, we will use `batchForkJoin` operator with two parameters where first parameter `observables` is a single array of 20 observables and second parameter `batchCount` is 5.
With this info, `batchForkJoin` will split the input array into a 4 batches with 5 observables in each batch and will sequentially execute all batches. This is demonstrated in the code below:

Example below explains how to use the operator:

```
 /**
  * Function to execute requests in batches of 5.
  *
  * Note: `InputType` is the type of request in each observable and
  * and `OutputType` is the type of response resulting from execution of each input observable
  */
  function processRequests(requests: Array<Observable<InputType>>): void {
    const subscription = batchForkJoin(requests, 5).subscribe({
        next: (resultInBatches: Array<OutputType>) => {
            // As we have x number  of batches, next callback is execute x times.
            // Now handle the response same way as you would in a regular forkJoin
        },
        complete: () => {
            // This will indicate completion of batchForkJoin.
            // If `sequential` operator is piped then there are other ways to wait for its completion.
        }
    })
  }
```

### 2. sequential

This operator is used to process an array of observables sequentially one-by-one. Normally you would use rxjs's `from` and `concatMap` opertors in a combination to achieve this but to get rid of that mess and have a clean code, you can use this custom operator.

#### Parameters

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `observables` | `Observable<T>` | **Required**. Array of observables that need to be processed sequentially one-by-one |

#### sequential(observables)

Takes an array of observables, and executes them one-by-one sequentially


#### Example

Let us consider a scenario where a developer wants to process 20 requests one by one sequentially where second request is triggered only when response of first request is achieved.

To achieve this, we will use `sequential` operator with only one parameter `observables` which is an array of 20 observables.
With this info, `sequential` will execute each observable one-by-one and return response in the same way i.e. one-by-one. This is demonstrated in the code below:

Example below explains how to use the operator:

```
 /**
  * Function to execute requests one-by-one.
  *
  * Note: `InputType` is the type of request in each observable and
  * and `OutputType` is the type of response resulting from execution of each input observable
  */
  function processRequests(requests: Array<Observable<InputType>>): void {
    const subscription = sequential(requests).subscribe({
        next: (resultOfEachRequest: OutputType) => {
            // As we have x number requests, next callback is execute x times.
            // Now handle the response same way as you would in a `from` operator
        },
        complete: () => {
            // This will indicate completion of from operator.
            // If `sequential` operator is piped then there are other ways to wait for its completion.
        }
    })
  }
```



