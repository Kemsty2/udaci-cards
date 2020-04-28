import { SUCCESS, FAILED, PENDING } from ".";

export function pending() {
  return {
    type: PENDING,
  };
}

export function success(message) {
  return {
    type: SUCCESS,
    message,
  };
}

export function failed(message) {
  return {
    type: FAILED,
    message,
  };
}
