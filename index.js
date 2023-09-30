import fileType from "file-type";
import seekBzip from "seek-bzip";

export default (opts) => (input) => {
  opts = opts || {};

  if (!Buffer.isBuffer(input)) {
    return Promise.reject(
      new TypeError(`Expected a Buffer, got ${typeof input}`)
    );
  }

  if (fileType(input)?.ext !== "bz2") {
    return Promise.resolve([]);
  }

  return new Promise((resolve, reject) => {
    try {
      const data = seekBzip.decode(input);

      resolve([
        {
          data,
          path: opts.path,
        },
      ]);
    } catch (err) {
      reject(err);
    }
  });
};
