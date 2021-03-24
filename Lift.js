// Check move() method below if you need some context
class Lift {
  floorsToVisitInCurrentFlow = [];
  floorsToVisitQueue = [];
  destination = null;
  currentFloor = 0;
  isMoving = false;

  constructor(numOfFloors) {
    this.numOfFloors = numOfFloors;
  }

  canCoverInSameFlow(floorNum) {
    return (
      (floorNum > this.currentFloor && floorNum < this.destination) ||
      (floorNum < this.currentFloor && floorNum > this.destination)
    );
  }

  pushtoQueue(floorNum) {
    floorNum--;
    if (floorNum >= this.numOfFloors || floorNum < 0) {
      return;
    }
    if (this.destination === null) {
      this.floorsToVisitQueue = [floorNum];
      this.move();
    } else if (this.canCoverInSameFlow(floorNum)) {
      this.floorsToVisitInCurrentFlow.push(floorNum);
    } else if (
      floorNum === this.currentFloor ||
      floorNum === this.destination
    ) {
      // pass
    } else {
      // will visit in time based priority
      this.floorsToVisitQueue.push(floorNum);
    }
    console.log(
      ` current flow : ${this.floorsToVisitInCurrentFlow.map(
        (x) => x + 1
      )} \n upcoming dest: ${this.floorsToVisitQueue.map((x) => x + 1)}`
    );
  }

  getNextDestination() {
    this.destination = this.floorsToVisitQueue.shift();
    let sameFlowIndex = null;
    for (let i = 0; i < this.floorsToVisitQueue.length; i++) {
      if (this.canCoverInSameFlow(this.floorsToVisitQueue[i])) {
        sameFlowIndex = i;
      } else {
        break;
      }
    }
    if (sameFlowIndex !== null) {
      this.floorsToVisitInCurrentFlow.push(
        this.floorsToVisitQueue.slice(0, sameFlowIndex + 1)
      );
      this.floorsToVisitQueue = this.floorsToVisitQueue.slice(
        sameFlowIndex + 1
      );
    }
  }

  gotoNextFloor() {
    if (this.destination < this.currentFloor) {
      this.currentFloor--;
    } else {
      this.currentFloor++;
    }
    console.log(`lift has reached ${this.currentFloor + 1}`);
  }

  /*
  move() is the brain of this class
  I don't know why I always get confused with new questions
    - programs do not have memory, there is no continous state
    - we need to store some state and keep it updated with latest data,
    and use them to build memory
    - is it confusing future me? (type yes/no) []
  In this problems context
    - Initially I was confused that, lift is continously moving hence we need a thread just to move lift,
    that is true but, it kinda doesn't matter for you to solve this problem.
    - Here setInterval emulates lift changing floors and 
        - floorsToVisitInCurrentFlow
        - floorsToVisitQueue
        - destination
        - currentFloor
        - isMoving
    are the state required to make informed decision, on:
        - should the new request for lift be handled in current flow
        - if the lift need to stop/not
        - setInterval should be removed when there are not more floors to visit
        - get next destination based on FCFS basis
        - see if we could pick any other user requests in between
*/
  move() {
    let intervalId;
    intervalId = setInterval(() => {
      if (this.destination === null) {
        // lift started from idle
        this.getNextDestination();
        console.log(`next destination ${this.destination + 1}`);
        this.moving = true;
        return;
      }
      //next floor
      this.gotoNextFloor();

      if (this.destination === this.currentFloor) {
        console.log(`destination ${this.currentFloor + 1}`);

        //reached destination
        if (this.floorsToVisitQueue.length === 0) {
          // queue is blank
          this.moving = false;
          this.destination = null;
          clearTimeout(intervalId);
        } else {
          this.getNextDestination();
          console.log(`next destination ${this.destination + 1}`);
        }
      } else if (this.floorsToVisitInCurrentFlow.includes(this.currentFloor)) {
        console.log(`stopping at ${this.currentFloor + 1}`);
        this.floorsToVisitInCurrentFlow = this.floorsToVisitInCurrentFlow.filter(
          (x) => this.currentFloor !== x
        );
      }
    }, 500);
  }
}
