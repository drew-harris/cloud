export enum JobType {
  EXAMPLE1 = "example1",
}

type BaseJob = {
  type: JobType;
};

export type ExampleJob = BaseJob & {
  type: JobType.EXAMPLE1;
  originalUrl: string;
};

export type PossibleJob = ExampleJob;

// Services & Deployments
export type ServiceType = "isolate" | "database";
export type DeploymentStatus = "pending" | "success" | "failed";

// Isolates
export type IsolateDeployInfo = {
  main: string;
  env: Record<string, string>;
  otherAssets: boolean;
};
