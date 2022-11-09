export class CustomError extends Error {
  name: string;
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
    this.status = 500;
  }

  toJson() {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }
}
