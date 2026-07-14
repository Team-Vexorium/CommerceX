export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-2xl bg-cream-dark" />
      <div className="mt-4 space-y-3">
        <div className="h-3 w-16 rounded bg-cream-dark" />
        <div className="h-4 w-3/4 rounded bg-cream-dark" />
        <div className="h-3 w-12 rounded bg-cream-dark" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-cream-dark" />
        <div className="space-y-6">
          <div className="h-3 w-20 rounded bg-cream-dark" />
          <div className="h-8 w-3/4 rounded bg-cream-dark" />
          <div className="h-6 w-24 rounded bg-cream-dark" />
          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-cream-dark" />
            <div className="h-4 w-5/6 rounded bg-cream-dark" />
            <div className="h-4 w-4/6 rounded bg-cream-dark" />
          </div>
          <div className="h-12 w-full rounded-xl bg-cream-dark" />
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 animate-pulse">
      <div className="h-24 w-24 flex-shrink-0 rounded-xl bg-cream-dark" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 rounded bg-cream-dark" />
        <div className="h-3 w-1/4 rounded bg-cream-dark" />
        <div className="h-3 w-1/3 rounded bg-cream-dark" />
      </div>
    </div>
  );
}
