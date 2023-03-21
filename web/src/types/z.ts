import { z } from "zod";

export const valueStatusV2 = z.enum(["unchaged", "new", "updated"]);

export const taskIdV2 = z.string().ulid().brand<"TaskId">();

export const taskV2 = z.object({
  taskId: taskIdV2,
  taskLogId: z.string().ulid().brand<"TaskLogId">().optional(),
  title: z.string(),
  detail: z.string().optional(),
  done: z.boolean(),
  deadline: z.date().optional(),
  valueStatus: valueStatusV2,
  synced: z.boolean(),
  offline: z.boolean(),
});

export type TaskV2 = z.infer<typeof taskV2>;
