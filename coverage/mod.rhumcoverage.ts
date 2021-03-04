// START AUTO-GENERATED CODE ///////////////////////////////////////////////////

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const totalLines = 9;

function markAsCovered(file: string, lineNumber: number, count: number): void {
  const contents = Deno.readFileSync("./coverage/coverage.json");

  let json = JSON.parse(decoder.decode(contents));

  if (!json[file]) {
    json[file] = {
      branches: {},
      lines: {
        total: totalLines,
      },
      statements: {},
    };
  }

  if (!json[file].lines[lineNumber]) {
    json[file].lines[lineNumber] = 0;
  }

  json[file].lines[lineNumber]++;
  Deno.writeFileSync(
    "./coverage/coverage.json",
    encoder.encode(JSON.stringify(json))
  );
}

// END AUTO-GENERATED CODE /////////////////////////////////////////////////////

export function a(a: boolean = false): boolean { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 1, 1);
  if (a) { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 2, 1);
    return true;
  }

  return false;
}
