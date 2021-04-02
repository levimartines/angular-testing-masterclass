import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {CoursesModule} from '../courses.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CoursesService} from '../services/courses.service';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {click} from '../common/test-utils';


describe('HomeComponent', () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;
  let service: any;

  beforeEach(waitForAsync(() => {
    const serviceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule
      ],
      providers: [
        {provide: CoursesService, useValue: serviceSpy}
      ]
    }).compileComponents()
    .then(() => {
      service = TestBed.inject(CoursesService);
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });

  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should display only beginner courses', () => {
    service.findAllCourses.and.returnValue(of(setupCourses()
    .filter(course => course.category === 'BEGINNER')));
    fixture.detectChanges();
    const labels = el.queryAll(By.css('.mat-tab-label'));
    expect(labels.length).toBe(1);
  });


  it('should display only advanced courses', () => {
    service.findAllCourses.and.returnValue(of(setupCourses()
    .filter(course => course.category === 'ADVANCED')));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1);
  });


  it('should display both tabs', () => {
    service.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2);
  });


  it('should display advanced courses when tab clicked', fakeAsync(() => {
    service.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = el.queryAll(By.css('.mat-tab-label'));
    click(tabs[1]);
    fixture.detectChanges();

    flush();
    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
    expect(cardTitles.length).toBeGreaterThan(0);
    expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course');
  }));

});
