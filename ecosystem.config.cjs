module.exports = {
  apps: [
    {
      name: "NAME_OF_APPLICATION",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork", // or "cluster" if using multiple instances
    }
  ]
}
