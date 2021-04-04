// START AUTO-GENERATED CODE ///////////////////////////////////////////////////

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const totalLines = 10;
const autoCovered = {
  "5": 0,
  "7": 0,
  "8": 0,
  "10": 0
};

function markAsCovered(file: string, lineNumber: number, count: number): void {
  const contents = Deno.readFileSync("./coverage/coverage.json");

  let json = JSON.parse(decoder.decode(contents));

  if (!json[file]) {
    json[file] = {
      branches: {},
      lines: Object.assign(autoCovered, {
        total: totalLines,
      }),
      statements: {},
    };
  }

  if (!json[file].lines[lineNumber]) {
    json[file].lines[lineNumber] = 0;
  }

  json[file].lines[lineNumber]++;
  Deno.writeFileSync(
    "./coverage/coverage.json",
    encoder.encode(JSON.stringify(json, null, 2))
  );
}

// END AUTO-GENERATED CODE /////////////////////////////////////////////////////

export function a(a: boolean = false, b: boolean = false): boolean { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 1, 1);
  if (a) { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 2, 1);
    if (b) { /** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 3, 1);
/** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 4, 1);      return true;
    }
/** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 6, 1);    return true;
  }

/** AUTO-GENERATED LINE **/ markAsCovered("./mod.ts", 9, 1);  return true;
}
