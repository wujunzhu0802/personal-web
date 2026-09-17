import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
await mkdir(path.join(output, "assets"), { recursive: true });
await mkdir(path.join(output, "resume", "assets"), { recursive: true });
for (const file of ["index.html", "styles.css"]) {
  await copyFile(path.join(root, "personal-site", file), path.join(output, file));
}
for (const file of ["index.html", "styles.css", "script.js", "resume.md", "bio.md"]) {
  await copyFile(path.join(root, file), path.join(output, "resume", file));
}
await copyFile(path.join(root, "assets", "portrait.jpg"), path.join(output, "assets", "portrait.jpg"));
await copyFile(path.join(root, "assets", "portrait.jpg"), path.join(output, "resume", "assets", "portrait.jpg"));
await copyFile(path.join(root, "resume.md"), path.join(output, "resume.md"));
await copyFile(path.join(root, "bio.md"), path.join(output, "bio.md"));

// Keep the same resume available inside the personal website's deployment.
const resumePath = path.join(output, "resume", "index.html");
const resume = await readFile(resumePath, "utf8");
await writeFile(resumePath, resume.replace('<span>吴君竹 · 上海杉达学院</span>', '<a href="../">返回个人网站</a>'));
console.log("Personal website built in dist/ (homepage + complete resume).");
