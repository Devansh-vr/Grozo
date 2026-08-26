export function ProductCardSkeleton() {
  return (
    <div className="card p-3">
      <div className="skeleton h-48 w-full mb-3" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-3 w-1/2 mb-3" />
      <div className="skeleton h-6 w-1/3 mb-3" />
      <div className="skeleton h-9 w-full" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="skeleton h-96 w-full rounded-2xl" />
      <div className="space-y-4">
        <div className="skeleton h-8 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-6 w-1/4" />
        <div className="skeleton h-20 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3"><div className="skeleton h-4 w-full" /></td>
      ))}
    </tr>
  );
}
