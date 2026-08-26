import { reviews } from '../../data/products';
import StarRating from '../../components/ui/StarRating';

export default function ProfileReviews() {
  return (
    <div className="card p-6 dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center py-8">You haven't reviewed any products yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={r.rating} />
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
