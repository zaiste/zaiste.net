const foo = x => `Hello ${x}`;

const notused = x => `hello world`;

async function main() {
  const r = await Promise.resolve(2);
  console.log(foo(r));
}

main();
