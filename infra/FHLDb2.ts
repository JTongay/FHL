const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "ec2" });
const rds = new sst.aws.Postgres("fhlDb2", { vpc, proxy: true });

// new sst.aws.Function("MyApi", {
//   vpc,
//   url: true,
//   link: [rds],
//   handler: "src/api.handler",
// });

new sst.x.DevCommand("Studio", {
  link: [rds],
  dev: {
    command: "npx drizzle-kit studio",
  },
});
