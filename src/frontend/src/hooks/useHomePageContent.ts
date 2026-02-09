import { useGetFullHomePageContent, useUpdateHomePageContent } from './useQueries';
import { defaultContent } from '../components/RoyalCafe/data/content';
import type { HomePageContent } from '../backend';

export function useHomePageContent() {
  const { data, isLoading, error } = useGetFullHomePageContent();
  const updateMutation = useUpdateHomePageContent();

  const content: HomePageContent = data || defaultContent;

  const saveContent = async (newContent: HomePageContent) => {
    await updateMutation.mutateAsync(newContent);
  };

  return {
    content,
    isLoading,
    error,
    saveContent,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
  };
}
