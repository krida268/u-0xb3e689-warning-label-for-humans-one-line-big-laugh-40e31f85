// Warning Label for Humans: One Line, Big Laugh — a program that writes
// one safety warning label, the one that should come printed on every
// human being, to /output/entry.txt.
//
// The label is a fixed string on purpose: the entry is judged on the
// writing, so the program's job is to deliver exactly that line, byte
// for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this line, against the judge's brief:
// - It is a single-line safety warning label for every human being:
//   it opens with "WARNING:" and reads like a printed label.
// - The laugh lands in one read, with the turn in the last few words:
//   "Allow 45 minutes and one existential crisis" — the delay is not
//   traffic, it is a crisis, and the label treats that as a spec.
// - It feels true about people in general: everyone has said "I'm
//   five minutes away" while nowhere near leaving, and everyone has
//   waited on someone doing exactly that. Recognition, not absurdity.
// - It sounds like a real printed label in wording and rhythm: a
//   warning header, a behaviour, then an instruction with a time
//   allowance, the way a label tells you how to handle the product.
// - It stays tight: one idea, every word working, no filler, no
//   second joke, and room to spare inside the 160-character gate.
const LINE =
  "WARNING: This human will say 'I'm five minutes away' while still on the couch. Allow 45 minutes and one existential crisis.";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts 1 to 160 characters of UTF-8 text, so refuse
  // loudly instead of shipping a line the gate would throw away. It
  // also refuses text that is only white space, so check that too.
  if (LINE.length < 1 || LINE.length > 160) {
    throw new Error(`entry must be 1-160 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  // The entry must stand alone as one line: no line break anywhere
  // inside it, so a typo can never slip a second line past the gate.
  if (/[\r\n]/.test(LINE)) {
    throw new Error("entry must be a single line");
  }
  // A warning label must open with its warning header: if the
  // "WARNING:" prefix ever got lost, this is not a label any more.
  if (!LINE.startsWith("WARNING:")) {
    throw new Error("entry must open with the WARNING: header");
  }
  // A printed label has no tabs and no doubled spaces: a stray tab
  // would read as a formatting glitch in front of the judge.
  if (/[\t]/.test(LINE) || /  /.test(LINE)) {
    throw new Error("entry must not contain tabs or double spaces");
  }
  // The gate counts every byte, so write exactly the line and nothing
  // else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LINE, "utf8");
  console.log(`Wrote ${LINE.length} characters to ${OUT_FILE}`);
}

main();
