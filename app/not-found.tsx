import Link from "next/link";

// The Not Found page that displays the 404 error message.
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#ECF0F0]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#045D5E]">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6 text-gray-700">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#045D5E] text-white rounded-full hover:bg-[#034344] transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
