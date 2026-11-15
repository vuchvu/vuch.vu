import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createCertificate } from "./network/certificate";
import { createDistribution } from "./network/cloudfront";
import { createDnsRecords, createHostedZone } from "./network/route53";
import { createGitHubDeployRole } from "./security/github-deploy-role";
import { createBucket } from "./storage/s3";

const DOMAIN = "vuch.vu";
const GITHUB_REPOSITORY = "vuchvu/vuch.vu";

export class VuchVuStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = createBucket(this);

    const hostedZone = createHostedZone(this, DOMAIN);

    const certificate = createCertificate(this, DOMAIN, hostedZone);

    const distribution = createDistribution(this, {
      domain: DOMAIN,
      bucket,
      certificate,
    });

    createDnsRecords(this, { domain: DOMAIN, hostedZone, distribution });

    const deployRole = createGitHubDeployRole(this, {
      repository: GITHUB_REPOSITORY,
      branch: "main",
      bucket,
    });

    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
    new cdk.CfnOutput(this, "GitHubDeployRoleArn", {
      value: deployRole.roleArn,
    });
    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });
  }
}
