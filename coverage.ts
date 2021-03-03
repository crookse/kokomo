import { readLines } from "https://deno.land/std@0.89.0/io/mod.ts";

const args = Deno.args.slice();

const decoder = new TextDecoder();
const encoder = new TextEncoder();

let filesRaw: {[key: string]: string} = {};

args.forEach((file: string) => {
  filesRaw[file] = decoder.decode(Deno.readFileSync(file));
});

const reader = Deno.readFileSync("./mod.ts")

const file = [];

for await (let line of readLines(new Deno.Buffer(reader.buffer))) {
  if (line.includes("if")) {
    file.push(line += " markStatementCovered(1);");
    continue;
  }
  if (line.includes("else")) {
    file.push(line += " markStatementCovered(1);");
    continue;
  }

  file.push(line);
}

let contents = file.join("\n");

contents = `const encoder = new TextEncoder();

function markStatementCovered(num: number) {
  Deno.writeFileSync("coverage.txt", encoder.encode(num as unknown as string), {append: true});
}

${contents}`;

Deno.writeFileSync("./mod.rhumcoverage.ts", encoder.encode(contents));






const r = Deno.readFileSync("./mod_test.ts")

const f = [];

for await (let line of readLines(new Deno.Buffer(r.buffer))) {
  if (line.includes(".ts;")) {
    line = line.replace(".ts;", ".rhumcoverage.ts;");
  }

  f.push(line);
}

Deno.writeFileSync("./mod_test.rhumcoverage.ts", encoder.encode(f.join("\n")));








Deno.run({
  cmd: [
    "deno",
    "run",
    "-A",
    "./mod_test.rhumcoverage.ts",
  ]
});
