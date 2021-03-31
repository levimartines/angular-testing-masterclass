import { fakeAsync, tick } from '@angular/core/testing';

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
});
