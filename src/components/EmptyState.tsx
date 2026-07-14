interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      {icon && <div className="mb-4 text-warm-gray-light">{icon}</div>}
      <h3 className="text-lg font-medium text-charcoal">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-warm-gray">{description}</p>
      {action && (
        <a
          href={action.href}
          className="mt-6 inline-flex items-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-charcoal-light"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
