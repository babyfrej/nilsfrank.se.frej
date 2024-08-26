export function assert(truthy: unknown, msg: string): asserts truthy {
  if (false === truthy) {
    throw new Error(msg);
  }
}
