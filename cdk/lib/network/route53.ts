import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export function lookupHostedZone(
  scope: Construct,
  domain: string,
): route53.IHostedZone {
  // 既存のホストゾーンを参照（管理対象外）
  return route53.HostedZone.fromLookup(scope, "HostedZone", {
    domainName: domain,
  });
}

interface DnsRecordsProps {
  domain: string;
  hostedZone: route53.IHostedZone;
  distribution: cloudfront.Distribution;
}

// cdk import 時: スキップして cdk deploy で上書き可能
export function createDnsRecords(
  scope: Construct,
  props: DnsRecordsProps,
): void {
  const { domain, hostedZone, distribution } = props;
  const cfTarget = route53.RecordTarget.fromAlias(
    new targets.CloudFrontTarget(distribution),
  );

  new route53.ARecord(scope, "ARecord", {
    zone: hostedZone,
    target: cfTarget,
  });

  new route53.AaaaRecord(scope, "AaaaRecord", {
    zone: hostedZone,
    target: cfTarget,
  });
}
