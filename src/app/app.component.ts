import { Component } from '@angular/core';
import { TimeAndDateHandlingService } from './time-and-date-handling.service';
import { ElapsedTimeDetails } from './elapsed-time-details.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private timeAndDateHandlingService: TimeAndDateHandlingService) { }

  /** Stores the elapsed time as a string */
  elapsedTimeText = "00:00";

  /** Stores the reference to the elapsed time interval*/
  elapsedTimeIntervalRef;

  /** Stores the start time of timer */
  startTime;

  /** Determines whether or not to display the start button */
  displayStartButton = true;

  /** Stores the details of elapsed time when paused */
  elapsedTimeWhenPaused: ElapsedTimeDetails;

  /** Starts the stopwatch */
  startStopwatch() {
    // Set start time based on whether it's stopped or resetted
    this.setStartTime();

    // Every second
    this.elapsedTimeIntervalRef = setInterval(() => {
      // Compute the elapsed time & display
      this.elapsedTimeText = this.timeAndDateHandlingService.getElapsedTime(this.startTime); //pass the actual record start time

      // Improvement: Can Stop elapsed time and resert when a maximum elapsed time
      //              has been reached.
    }, 1000);

    // Hide the start button, which will be replace by stop
    this.displayStartButton = false;
  }

  /** Sets the start time value */
  private setStartTime() {
    if (this.elapsedTimeWhenPaused) {
      this.startTime = new Date();
      // Subtract the elapsed hours, minutes and seconds from the current date
      // To get correct elapsed time to resume from it
      this.startTime.setHours(this.startTime.getHours() - this.elapsedTimeWhenPaused.hours);
      this.startTime.setMinutes(this.startTime.getMinutes() - this.elapsedTimeWhenPaused.minutes);
      this.startTime.setSeconds(this.startTime.getSeconds() - this.elapsedTimeWhenPaused.seconds);
    } else {
      this.startTime = new Date();
    }
  }

  /** Pauses stopwatch */
  stopStopwatch() {
    // Clear interval
    if (typeof this.elapsedTimeIntervalRef !== "undefined") {
      clearInterval(this.elapsedTimeIntervalRef);
      this.elapsedTimeIntervalRef = undefined;
    }

    // Store the elapsed time on pause
    this.storeElapsedTimeOnPause();

    // Display Start button
    this.displayStartButton = true;
  }

  /** Stores the elapsed time hours, minutes and seconds details
   * on pause
   */
  private storeElapsedTimeOnPause() {
    // Break down elapsed time from display test
    const brokenDownElapsedTime: string[] = this.elapsedTimeText.split(":");

    // Convert list to numbers
    const brokenDownElapsedTimeAsNumbers: number[] = brokenDownElapsedTime.map(numberAsString => parseInt(numberAsString));

    // Store the hours minutes and seconds from that time
    this.elapsedTimeWhenPaused = {
      hours: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[0] : 0,
      minutes: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[1] : brokenDownElapsedTimeAsNumbers[0],
      seconds: brokenDownElapsedTimeAsNumbers.length === 3 ? brokenDownElapsedTimeAsNumbers[2] : brokenDownElapsedTimeAsNumbers[1]
    }
  }

  /** Resets stopwatch */
  resetStopwatch() {
    // Clear interval
    if (typeof this.elapsedTimeIntervalRef !== "undefined") {
      clearInterval(this.elapsedTimeIntervalRef);
      this.elapsedTimeIntervalRef = undefined;
    }

    // Reset elapsed time when paused object
    this.elapsedTimeWhenPaused = undefined

    // Display Start button
    this.displayStartButton = true;

    // Reset elapsed time text
    this.elapsedTimeText = "00:00";
  }
}
