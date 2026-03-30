import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export function createCertificate(
  scope: Construct,
  domain: string,
  hostedZone: route53.IHostedZone,
): acm.ICertificate {
  return new acm.Certificate(scope, "Certificate", {
    domainName: domain,
    validation: acm.CertificateValidation.fromDns(hostedZone),
  });
}
