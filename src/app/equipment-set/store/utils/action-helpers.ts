export function literal(prefix: string): (value: string) => string {
  return (value: string) => `[${prefix}] value`;
}
