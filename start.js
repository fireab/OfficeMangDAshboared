// const { exec } = require('child_process');
import {exec} from "child_process";

exec('npm run start', (error, stdout, stderr) => {
  if (error) {
    return;
  }
});
