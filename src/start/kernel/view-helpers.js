import crypto from 'crypto';

export default {
  json(val) {
    return JSON.stringify(val, null, 2);
  },
  md5(str) {
    return crypto.createHash("md5").update(str).digest("hex");
  },
};
