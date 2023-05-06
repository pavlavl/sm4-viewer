/* eslint-disable no-plusplus */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-new */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line max-classes-per-file
class Status {
  constructor(public status: string, public value: any) {}
}

class Statuses {
  static statusesQueue: Status[] = [];

  static setStatus(status: string, value: any) {
    const newStatus = new Status(status, value);
    this.statusesQueue.push(newStatus);
  }

  static *getStatus(): Generator<Status> {
    for (let i = 0; i < this.statusesQueue.length; ++i) {
      const status = this.statusesQueue[i];
      if (i < this.statusesQueue.length - 1) yield status;
      else return status;
    }
    return null;
  }

  static clearStatusesQueue() {
    this.statusesQueue = [];
  }
}

export default Statuses;
export { Status };
