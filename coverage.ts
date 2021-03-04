import { readLines } from "https://deno.land/std@0.89.0/io/mod.ts";
const decoder = new TextDecoder();
const encoder = new TextEncoder();

const markAsCovered = `// START AUTO-GENERATED CODE ///////////////////////////////////////////////////

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const totalLines = {{ total_lines }};

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

`;

try {
  Deno.removeSync("./coverage", {recursive: true});
} catch (error) {
}
Deno.mkdirSync("./coverage");
Deno.writeFileSync("./coverage/coverage.json", encoder.encode("{}"));

const args = Deno.args.slice();

let filesRaw: {[key: string]: Deno.Reader} = {};

args.forEach((file: string) => {
  filesRaw[file] = new Deno.Buffer(Deno.readFileSync(file));
});

let filesInstrumented: any = [];
let filesToInstrument: string[] = [];

// Change all import statements to include .rhumcoverage.ts
for (const name in filesRaw) {
  const lines: string[] = [];
  for await (let line of readLines(filesRaw[name])) {
    if (line.trim().includes(`.ts";`)) {
      const match = line.match(/".+"/);
      filesToInstrument.push(match![0].replace(/"/g, ""));
      line = line.replace(`.ts";`, `.rhumcoverage.ts";`);
    }
    lines.push(line);
  }
  filesInstrumented.push({
    filename: name,
    contents: lines.join("\n"),
  });
}

// Instrument all files to include `markAsCovered()`
// console.log(filesInstrumented);
filesToInstrument.forEach(async (file: string) => {
  const fileRaw = new Deno.Buffer(Deno.readFileSync(file));
  const lines: string[] = [];
  let lineNumber = 1;

  for await (let line of readLines(fileRaw)) {
    if (line.includes("{")) {
      line = line + ` /** AUTO-GENERATED LINE **/ markAsCovered("${file}", ${lineNumber}, 1);`;
    }
    lines.push(line);
    lineNumber++;
  }

  let contents = markAsCovered.replace("{{ total_lines }}", lineNumber.toString());
  contents += lines.join("\n");
  const encoded = encoder.encode(contents);

  Deno.writeFileSync("./coverage/" + file.replace(".ts", ".rhumcoverage.ts"), encoded);
});

filesInstrumented.forEach(async (fileInfo: any) => {
  const contents = encoder.encode(fileInfo.contents);
  Deno.writeFileSync("./coverage/" + fileInfo.filename, contents);
});

filesInstrumented.forEach(async (file: any, index: number) => {
  const filename = `./coverage/${file.filename}`;
  console.log("Running " + filename);
  const p = Deno.run({
    cmd: [
      "deno",
      "run",
      "-A",
      filename
    ],
    stderr: "piped",
    stdout: "piped",
  });

  await p.status();

  if (index + 1 == filesInstrumented.length) {
    const coverage = JSON.parse(decoder.decode(Deno.readFileSync("./coverage/coverage.json")));
    for (const file in coverage) {
      const data = coverage[file];
      const total = data.lines.total;
      let totes = 0;
      for (const line in data.lines) {
        if (line != "total") {
          totes += data.lines[line];
        }
      }
      console.log();
      console.log(`${file}\n  ` + ((totes / total) * 100).toFixed(2) + "% lines covered");
    }
  }
});
