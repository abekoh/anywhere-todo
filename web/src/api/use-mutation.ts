import { useCallback, useState } from "react";

export type UseMutationOption<RequestReturn> = Partial<{
  onSuccess: (data: RequestReturn) => void;
  onError: (error: Error) => void;
  onRequestStarted: () => void;
  onRequestDone: () => void;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMutation = <RequestArg extends any[], RequestReturn>(
  requestFn: (...args: RequestArg) => Promise<RequestReturn>,
  options?: UseMutationOption<RequestReturn>
) => {
  const [requesting, setRequesting] = useState(false);

  const requestStart = useCallback(() => {
    setRequesting(true);
    if (options?.onRequestStarted) {
      options.onRequestStarted();
    }
  }, [options]);

  const requestDone = useCallback(() => {
    setRequesting(false);

    if (options?.onRequestDone) {
      options.onRequestDone();
    }
  }, [options]);

  const request = useCallback(
    async (...args: RequestArg) => {
      try {
        requestStart();
        const data = await requestFn(...args);
        if (options?.onSuccess) {
          options?.onSuccess(data);
        }
        requestDone();
      } catch (e) {
        requestDone();
        if (e instanceof Error && !!options?.onError) {
          options.onError(e);
        }
      }
    },
    [requestFn, requestStart, requestDone, options]
  );

  return { request, requesting };
};
