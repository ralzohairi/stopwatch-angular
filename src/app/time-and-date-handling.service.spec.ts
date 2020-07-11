import { TestBed, inject } from '@angular/core/testing';

import { TimeAndDateHandlingService } from './time-and-date-handling.service';

// Declarations
let timeAndDateHandlingService: TimeAndDateHandlingService;

describe('TimeAndDateHandlingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeAndDateHandlingService]
    });

    // To Access service 
    timeAndDateHandlingService = TestBed.get(TimeAndDateHandlingService);
  });

  it('should be created', inject([TimeAndDateHandlingService], (service: TimeAndDateHandlingService) => {
    expect(service).toBeTruthy();
  }));

  // getElapsedTime

  it("should compute the elapsed time correctly", () => {
    let today = new Date();
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let dateOverFiveDays = new Date();
    dateOverFiveDays.setDate(dateOverFiveDays.getDate() - 5);
    expect(timeAndDateHandlingService.getElapsedTime(new Date())).toBe("00:00");
    expect(timeAndDateHandlingService.getElapsedTime(yesterday)).toBe("24:00:00");
    expect(timeAndDateHandlingService.getElapsedTime(dateOverFiveDays)).toBe("120:00:00");
  });
});
