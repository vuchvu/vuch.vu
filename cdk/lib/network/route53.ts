import * as cdk from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

// 既存のホストゾーンを cdk import で取り込んだもの。
// スタック削除時にゾーンが消えるとネームサーバーが変わるため RETAIN にする
export function createHostedZone(
  scope: Construct,
  domain: string,
): route53.PublicHostedZone {
  const hostedZone = new route53.PublicHostedZone(scope, "HostedZone", {
    zoneName: domain,
  });
  hostedZone.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);
  return hostedZone;
}

interface DnsRecordsProps {
  domain: string;
  hostedZone: route53.IHostedZone;
  distribution: cloudfront.Distribution;
}

export function createDnsRecords(
  scope: Construct,
  props: DnsRecordsProps,
): void {
  const { hostedZone, distribution } = props;
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

  // Discord のドメイン認証 (設定 → 接続 → ドメイン)
  new route53.TxtRecord(scope, "DiscordVerificationRecord", {
    zone: hostedZone,
    recordName: "_discord",
    values: ["dh=cdc551352fd712f418b942027a0bfc773cc8819c"],
  });
}
