const variants = {
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  gray: 'bg-gray-100 text-gray-700',
  yellow: 'bg-yellow-100 text-yellow-700',
};

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function OrderStatusBadge({ status }) {
  const map = {
    placed: { label: 'Order Placed', variant: 'blue' },
    confirmed: { label: 'Confirmed', variant: 'purple' },
    preparing: { label: 'Preparing', variant: 'orange' },
    out: { label: 'Out for Delivery', variant: 'blue' },
    delivered: { label: 'Delivered', variant: 'green' },
    cancelled: { label: 'Cancelled', variant: 'red' },
  };
  const { label, variant } = map[status] || { label: status, variant: 'gray' };
  return <Badge variant={variant}>{label}</Badge>;
}
