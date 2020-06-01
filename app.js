const fs = require('fs/promises');
const fg = require('fast-glob');
const matter = require('gray-matter');
const toml = require('@iarna/toml');

async function main() {
  const files = await fg(['**/*.md']);
  for (const file of files) {
    const content = await fs.readFile(file, 'utf-8');
    const frontmatter = matter(content);
    console.log(frontmatter.data);
    const r = toml.stringify(frontmatter.data);
    const output = `
+++
${r}
+++
${frontmatter.content}`;

    await fs.writeFile(file, output);
  }
}

main()
