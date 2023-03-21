import Dexie, { Table } from "dexie";
import { Task } from "../types";

class Database extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super("Database");
    this.version(1).stores({
      tasks: "++taskId, [taskId+taskLogId]",
    });
  }
}

export const db = new Database();
