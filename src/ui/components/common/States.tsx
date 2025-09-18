interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try Again",
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">{title}</h2>
        <p className="text-red-500 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  const defaultIcon = (
    <svg
      className="w-8 h-8 text-amber-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-2-2m0 0l-2 2m2-2v6"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
          {icon || defaultIcon}
        </div>
        <h2 className="text-2xl font-bold text-amber-600 mb-2">{title}</h2>
        <p className="text-amber-500">{message}</p>
      </div>
    </div>
  );
}
