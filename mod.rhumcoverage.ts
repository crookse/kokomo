const encoder = new TextEncoder();

function markStatementCovered(num: number) {
  Deno.writeFileSync("coverage.txt", encoder.encode(num as unknown as string), {append: true});
}

export function a(a: boolean = false): boolean {
  if (a) { markStatementCovered(1);
    return true;
  }

  return false;
}
