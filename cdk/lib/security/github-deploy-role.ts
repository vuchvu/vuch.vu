import * as iam from "aws-cdk-lib/aws-iam";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface GitHubDeployRoleProps {
  /** "owner/repo" 形式 */
  repository: string;
  /** デプロイを許可するブランチ */
  branch: string;
  bucket: s3.IBucket;
}

/**
 * GitHub Actions から OIDC で引き受けるデプロイ用ロール。
 * 長期アクセスキーを使わず、指定ブランチのワークフローのみが
 * 対象バケットへの同期 (aws s3 sync --delete) を行える。
 */
export function createGitHubDeployRole(
  scope: Construct,
  props: GitHubDeployRoleProps,
): iam.Role {
  const { repository, branch, bucket } = props;

  const provider = new iam.OidcProviderNative(scope, "GitHubOidcProvider", {
    url: "https://token.actions.githubusercontent.com",
    clientIds: ["sts.amazonaws.com"],
  });

  const role = new iam.Role(scope, "GitHubDeployRole", {
    description: `GitHub Actions deploy role for ${repository}`,
    assumedBy: new iam.WebIdentityPrincipal(provider.oidcProviderArn, {
      StringEquals: {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": `repo:${repository}:ref:refs/heads/${branch}`,
      },
    }),
  });

  role.addToPolicy(
    new iam.PolicyStatement({
      actions: ["s3:ListBucket"],
      resources: [bucket.bucketArn],
    }),
  );
  role.addToPolicy(
    new iam.PolicyStatement({
      actions: ["s3:PutObject", "s3:DeleteObject"],
      resources: [bucket.arnForObjects("*")],
    }),
  );

  return role;
}
