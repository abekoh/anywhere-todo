import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  syncTasks: Array<Task>;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: NewTask;
};


export type MutationSyncTasksArgs = {
  input: SyncTasks;
};


export type MutationUpdateTaskArgs = {
  input: UpdatedTask;
};

export type NewTask = {
  deadline?: InputMaybe<Scalars['Time']>;
  detail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  tasks: Array<Task>;
};

export type SubTask = {
  __typename?: 'SubTask';
  deadline?: Maybe<Scalars['Time']>;
  detail?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  subTaskId: Scalars['ID'];
  subTaskLogId: Scalars['ID'];
  title: Scalars['String'];
};

export type SyncTasks = {
  newTasks: Array<NewTask>;
  updatedTasks: Array<UpdatedTask>;
};

export type Task = {
  __typename?: 'Task';
  deadline?: Maybe<Scalars['Time']>;
  detail?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  subTasks: Array<SubTask>;
  taskId: Scalars['ID'];
  taskLogId: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdatedTask = {
  deadline?: InputMaybe<Scalars['Time']>;
  detail?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  taskId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
};

export type AllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', taskId: string, taskLogId: string, title: string, detail?: string | null, done: boolean, deadline?: any | null }> };

export type UpdateTaskMutationVariables = Exact<{
  taskId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<Scalars['String']>;
  done?: InputMaybe<Scalars['Boolean']>;
  deadline?: InputMaybe<Scalars['Time']>;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', taskId: string, taskLogId: string, title: string, detail?: string | null, done: boolean, deadline?: any | null } };

export type SyncTasksMutationVariables = Exact<{
  tasks: SyncTasks;
}>;


export type SyncTasksMutation = { __typename?: 'Mutation', syncTasks: Array<{ __typename?: 'Task', taskId: string, taskLogId: string, title: string, detail?: string | null, done: boolean, deadline?: any | null }> };


export const AllTasksDocument = gql`
    query AllTasks {
  tasks {
    taskId
    taskLogId
    title
    detail
    done
    deadline
  }
}
    `;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($taskId: ID!, $title: String, $detail: String, $done: Boolean, $deadline: Time) {
  updateTask(
    input: {taskId: $taskId, title: $title, detail: $detail, done: $done, deadline: $deadline}
  ) {
    taskId
    taskLogId
    title
    detail
    done
    deadline
  }
}
    `;
export const SyncTasksDocument = gql`
    mutation SyncTasks($tasks: SyncTasks!) {
  syncTasks(input: $tasks) {
    taskId
    taskLogId
    title
    detail
    done
    deadline
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AllTasksDocumentString = print(AllTasksDocument);
const UpdateTaskDocumentString = print(UpdateTaskDocument);
const SyncTasksDocumentString = print(SyncTasksDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    AllTasks(variables?: AllTasksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: AllTasksQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AllTasksQuery>(AllTasksDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AllTasks', 'query');
    },
    UpdateTask(variables: UpdateTaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: UpdateTaskMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateTaskMutation>(UpdateTaskDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTask', 'mutation');
    },
    SyncTasks(variables: SyncTasksMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data: SyncTasksMutation; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<SyncTasksMutation>(SyncTasksDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SyncTasks', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;