export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgent = 3,
  Later = 4,
}

export enum ResultCode {
  success = 0,
  error = 1,
  captchaError = 10,
}
