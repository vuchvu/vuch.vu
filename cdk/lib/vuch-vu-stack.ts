import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { createCertificate } from "./network/certificate";
import { createDistribution } from "./network/cloudfront";
import { createDnsRecords, createHostedZone } from "./network/route53";
import { createGitHubDeployRole } from "./security/github-deploy-role";
import { createBucket } from "./storage/s3";

const DOMAIN = "vuch.vu";
const HOSTED_ZONE_ID = "Z05948382BG17UAFDK70K";
const GITHUB_REPOSITORY = "vuchvu/vuch.vu";

export class VuchVuStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = createBucket(this);

    // ホストゾーン本体は CDK 管理だが、証明書・レコードからは固定 ID で参照する。
    // 既存リソースの HostedZoneId を Ref に書き換えると、値が同じでも
    // CloudFormation が置き換え (requires replacement) と判定するため
    createHostedZone(this, DOMAIN);
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "HostedZoneRef",
      { hostedZoneId: HOSTED_ZONE_ID, zoneName: DOMAIN },
    );

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
