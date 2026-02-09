import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { HomePageContent } from '../backend';

export function useGetFullHomePageContent() {
  const { actor, isFetching } = useActor();

  return useQuery<HomePageContent>({
    queryKey: ['homePageContent'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getFullHomePageContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateHomePageContent() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: HomePageContent) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateHomePageContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homePageContent'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
    staleTime: 0, // Always refetch when invalidated
  });
}
