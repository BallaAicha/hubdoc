

export function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-primary-600 animate-spin"></div>
        <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-4 border-b-4 border-primary-300 animate-ping opacity-20"></div>
      </div>
    </div>
  );
}