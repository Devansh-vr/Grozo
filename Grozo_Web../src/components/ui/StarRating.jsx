export default function StarRating({ rating, max = 5, size = 'sm' }) {
  const sizes = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
  return (
    <div className={`flex items-center gap-0.5 ${sizes[size]}`}>
      {Array.from({ length: max }).map((_, i) => {
        const full = i + 1 <= Math.floor(rating);
        const half = !full && i + 0.5 < rating;
        return (
          <span key={i} className={full || half ? 'text-amber-400' : 'text-gray-300'}>
            {full ? '★' : half ? '⯨' : '★'}
          </span>
        );
      })}
    </div>
  );
}
