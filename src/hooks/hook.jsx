import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else console.log(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};

// to handle mutation reuest functions
const useAsyncMutation = (mutationHook, flag = true) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const handlerFunction = async (toastMessage, ...args) => {
    setIsLoading(true);

    const toastId = flag
      ? toast.loading(toastMessage || "Processing your request...")
      : null;

    try {
      const res = await mutate(...args);
      setData(res?.data);

      if (flag) {
        if (res?.data) {
          toast.success(res?.data?.message || "Process completed!", {
            id: toastId,
          });
        } else {
          toast.error(res?.error?.data?.message || "Something went wrong!", {
            id: toastId,
          });
        }
      }
    } catch (err) {
      console.error(err);
      if (flag) {
        toast.error("Something went wrong", { id: toastId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [handlerFunction, isLoading, data];
};


const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket?.on(event, handler);
    });

    return () => {
      // exit function
      Object.entries(handlers).forEach(([event, handler]) => {
        socket?.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useAsyncMutation, useErrors, useSocketEvents };

