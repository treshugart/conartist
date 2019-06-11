const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const { bin } = require("..");

const output = path.join(__dirname, "..", "__output__");
const output1 = path.join(output, "1");
const output2 = path.join(output, "2");

async function read(...paths) {
  return (await fs.readFile(path.join(output, ...paths))).toString();
}

test("bin [...input]", async () => {
  process.argv.push(output1);
  process.argv.push(output2);
  await bin({
    name: "test",
    description: "testing",
    conartist: {
      files: {
        "index.js": "// testing"
      }
    }
  });
  expect(await read("1", "index.js")).toBe("// testing\n");
  expect(await read("2", "index.js")).toBe("// testing\n");
});