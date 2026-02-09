import { useIsCallerAdmin } from './useQueries';

export function useAdminAuth() {
  const { data: isAdmin, isLoading, error } = useIsCallerAdmin();

  return {
    isAdmin: isAdmin ?? false,
    isLoading,
    error,
  };
}
