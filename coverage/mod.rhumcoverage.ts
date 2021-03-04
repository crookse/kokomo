const encoder = new TextEncoder();
const decoder = new TextDecoder();

function markAsCovered(file: string, lineNumber: number, count: number): void {
  const filename = "./coverage/" + file + ".coverage";
  try {
    const contents = Deno.readFileSync(filename);
    let json = JSON.parse(decoder.decode(contents));
    if (!json[lineNumber]) {
      json[lineNumber] = 0;
    }
    json[lineNumber]++;
    Deno.writeFileSync(filename, encoder.encode(JSON.stringify(json)));
  } catch (error) {
    Deno.writeFileSync(filename, encoder.encode(JSON.stringify({
      [lineNumber]: count
    })));
  }
}

export function a(a: boolean = false): boolean { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 1, 1);
if (a) { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 2, 1);
    return true;
  }

  return false;
}
