export class unableToSaveError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidUserNameOrPasswordError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BookDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}
