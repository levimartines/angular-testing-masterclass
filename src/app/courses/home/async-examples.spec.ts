import {fakeAsync, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from "rxjs";
import {delay} from "rxjs/operators";

fdescribe('Async Testing Examples', () => {

  it('Async test example with Jasmine done', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log('Running async test assertions');
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Async test example with setTimeout', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log('Running async test inside fakeAsync zone');
      test = true;
    }, 1000);
    // controla a evolução de tempo 'fake'. Pode ser chamada mais de uma vez.
    tick(500);
    tick(500);

    // flush() completa todas as subscriptions pendentes na fila do fakeAsyncZone

    expect(test).toBeTruthy();
  }));

  it('Async test example - Promise + setTimeout', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => counter += 1, 1000);
    });
    console.log('Running test assertions');

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(1000);
    expect(counter).toBe(11);
  }));

  it('Async test exampel - Observables', fakeAsync(() => {
    let test = false;
    console.log('Creating Observable');
    const test$ = of(test).pipe(delay(500));
    test$.subscribe(() => test = true);

    console.log('Running test assertions');
    tick(500);
    expect(test).toBe(true);
  }));
});
