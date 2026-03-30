import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { createCertificate } from "./network/certificate";
import { createDistribution } from "./network/cloudfront";
import { createDnsRecords, lookupHostedZone } from "./network/route53";
import { createBucket } from "./storage/s3";

const DOMAIN = "vuch.vu";

export class VuchVuStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = createBucket(this);

    const hostedZone = lookupHostedZone(this, DOMAIN);

    const certificate = createCertificate(this, DOMAIN, hostedZone);

    const distribution = createDistribution(this, { domain: DOMAIN, bucket, certificate });

    createDnsRecords(this, { domain: DOMAIN, hostedZone, distribution });

    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
    new cdk.CfnOutput(this, "DistributionId", {
      value: distribution.distributionId,
    });
  }
}
