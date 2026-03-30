#!/usr/bin/env node
import "source-map-support/register";
import * as dotenv from "dotenv";
dotenv.config({ override: true });
import * as cdk from "aws-cdk-lib";
import { VuchVuStack } from "../lib/vuch-vu-stack";

const app = new cdk.App();
new VuchVuStack(app, "VuchVuStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});
