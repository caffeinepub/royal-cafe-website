import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { HomePageContent } from '../backend';
import { ADMIN_STATUS_QUERY_KEY, HOMEPAGE_CONTENT_QUERY_KEY, PUBLISH_STATE_QUERY_KEY } from './queryKeys';
import { initializeAccessControl } from '../utils/accessControlInit';

export function useGetFullHomePageContent() {
  const { actor, isFetching } = useActor();

  return useQuery<HomePageContent>({
    queryKey: HOMEPAGE_CONTENT_QUERY_KEY,
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
      // Ensure access control is initialized before admin operations
      await initializeAccessControl(actor);
      return actor.updateHomePageContent(content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOMEPAGE_CONTENT_QUERY_KEY });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ADMIN_STATUS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return false;
      try {
        // Ensure access control is initialized before checking admin status
        await initializeAccessControl(actor);
        return await actor.isCallerAdmin();
      } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}

export function useGetPublishState() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: PUBLISH_STATE_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return true; // Default to published if actor not available
      try {
        return await actor.getPublishState();
      } catch (error) {
        console.error('Error fetching publish state:', error);
        return true; // Default to published on error
      }
    },
    enabled: !!actor && !isFetching,
    retry: 1,
    staleTime: 0,
    refetchOnMount: true,
  });
}

export function useSetPublishState() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (publishState: boolean) => {
      if (!actor) throw new Error('Actor not available');
      // Ensure access control is initialized before admin operations
      await initializeAccessControl(actor);
      return actor.setPublishState(publishState);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISH_STATE_QUERY_KEY });
    },
  });
}
