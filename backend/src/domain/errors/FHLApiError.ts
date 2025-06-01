import { Nullable } from "@/util";

export class FHLApiError extends Error {
  message: string;
  code: number;
  // severity: Severity;
  debugInformation?: Record<string, unknown>;

  constructor(args: {
    message: string;
    code: number;
    // severity: Severity,
    debugInformation?: Record<string, unknown>;
  }) {
    super(args.message);
    this.message = args.message;
    this.code = args.code;
    // this.severity = args.severity ?? Severity.HIGH;
    this.debugInformation = args.debugInformation;
  }
}

export class ApiError {
  code: number;
  stacktrace: Nullable<string>;

  constructor(code: number, stack: Nullable<string>) {
    this.code = code;
    this.stacktrace = stack;
  }
}
