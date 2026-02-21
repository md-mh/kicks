// The Loading page that displays the loading indicator.
export default function Loading() {
  return (
    <div className="inset-0 flex items-center justify-center z-50">
      <div className="p-8 rounded-lg flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-b-4 border-[#045D5E] rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground mt-2">Loading...</p>
      </div>
    </div>
  );
}
