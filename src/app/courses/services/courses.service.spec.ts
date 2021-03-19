import {CoursesService} from './courses.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {COURSES} from '../../../../server/db-data';
import {Course} from '../model/course';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CoursesService
      ]
    });
    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all courses', () => {
    service.findAllCourses().subscribe(courses => {
      expect(courses).toBeTruthy();
      expect(courses.length).toBe(12);
    });
    const req = httpTestingController.expectOne('/api/courses');
    expect(req.request.method).toEqual('GET');
    req.flush({payload: Object.values(COURSES)});
  });

  it('should retrieve a course by id', () => {
    service.findCourseById(12).subscribe((course: Course) => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });
    const req = httpTestingController.expectOne('/api/courses/12');
    expect(req.request.method).toEqual('GET');
    req.flush(COURSES[12]);
  });

  afterEach(() =>     httpTestingController.verify());
});
