import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface DistributionProps {
  domain: string;
  bucket: s3.Bucket;
  certificate: acm.ICertificate;
}

// cdk import 時: ディストリビューション ID を指定
export function createDistribution(
  scope: Construct,
  props: DistributionProps,
): cloudfront.Distribution {
  const { domain, bucket, certificate } = props;

  return new cloudfront.Distribution(scope, "Distribution", {
    defaultBehavior: {
      origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      compress: true,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
    },
    domainNames: [domain],
    certificate,
    defaultRootObject: "index.html",
    errorResponses: [
      {
        httpStatus: 403,
        responseHttpStatus: 404,
        responsePagePath: "/404.html",
      },
      {
        httpStatus: 404,
        responseHttpStatus: 404,
        responsePagePath: "/404.html",
      },
    ],
    priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
    webAclId: process.env.WAF_WEB_ACL_ARN,
  });
}
