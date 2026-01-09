import content from '@/config/content.json';

const CategoriesMenuSkeleton = () => {
  return (
    <div role="status" className="flex items-center gap-2 text-sm text-gray-400" aria-live="polite">
      <span className="sr-only">{content.app.categoriesMenu.loading}</span>
      <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
      <div className="h-3 w-3 animate-pulse rounded-full bg-white/10" />
    </div>
  );
};

export default CategoriesMenuSkeleton;
