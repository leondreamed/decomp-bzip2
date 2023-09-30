import fs from "fs";
import path from "path";
import isJpg from "is-jpg";
import test from "ava";
import m from "./index.js";
import { join } from "desm";

test("extract file", async (t) => {
  const buf = await fs.promises.readFile(
    join(import.meta.url, "fixture.jpg.bz2")
  );
  const files = await m({ path: "test.jpg" })(buf);

  t.is(files[0].path, "test.jpg");
  t.true(isJpg(files[0].data));
});

test("throw on wrong input", async (t) => {
  await t.throwsAsync(() => m()("foo"), {
    message: "Expected a Buffer, got string",
  });
});
