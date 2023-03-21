import Dexie, { Table } from "dexie";
import { TaskV2 } from "../types/z";

class Database extends Dexie {
  tasks!: Table<TaskV2>;

  constructor() {
    super("Database");
    this.version(1).stores({
      tasks: "++taskId, [taskId+taskLogId]",
    });
  }
}

export const db = new Database();
