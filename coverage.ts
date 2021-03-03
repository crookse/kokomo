import { readLines } from "https://deno.land/std@0.89.0/io/mod.ts";

const args = Deno.args.slice();

const decoder = new TextDecoder();
const encoder = new TextEncoder();

let filesRaw: {[key: string]: Deno.Reader} = {};

args.forEach((file: string) => {
  filesRaw[file] = new Deno.Buffer(Deno.readFileSync(file));
});

// contents = `const encoder = new TextEncoder();

// function markStatementCovered(num: number) {
//   Deno.writeFileSync("coverage.txt", encoder.encode(num as unknown as string), {append: true});
// }

// ${contents}`;

// Deno.writeFileSync("./mod.rhumcoverage.ts", encoder.encode(contents));






// const r = Deno.readFileSync("./mod_test.ts")

// const f = [];

for (const 
for await (let line of readLines(new Deno.Buffer(r.buffer))) {
  if (line.includes(".ts;")) {
    line = line.replace(".ts;", ".rhumcoverage.ts;");
  }

  f.push(line);
}

// Deno.writeFileSync("./mod_test.rhumcoverage.ts", encoder.encode(f.join("\n")));








// Deno.run({
//   cmd: [
//     "deno",
//     "run",
//     "-A",
//     "./mod_test.rhumcoverage.ts",
//   ]
// });
