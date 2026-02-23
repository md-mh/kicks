import { FaStar } from "react-icons/fa";

// Static review data.
const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatarColor: "bg-purple-300",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatarColor: "bg-blue-300",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatarColor: "bg-teal-300",
  },
];

const galleryColors = [
  "from-red-100 to-red-50",
  "from-amber-100 to-amber-50",
  "from-gray-200 to-gray-100",
];

// Static reviews section matching the KICKS design.
export default function Reviews() {
  return (
    <section className="px-4 md:px-10 mt-14 md:mt-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#232321]">
          REVIEWS
        </h2>
        <button className="bg-[#4A69E2] hover:bg-[#3B57C9] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-colors cursor-pointer">
          SEE ALL
        </button>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-[32px] shadow-none hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col p-0"
            style={{
              borderRadius: "32px",
              boxShadow: "0px 4px 24px rgba(0,0,0,0.05)",
            }}
          >
            {/* Review Top Section */}
            <div className="p-4 md:p-6 flex flex-col gap-4">
              {/* Header Row */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#232321] text-lg md:text-xl leading-tight mb-0.5">
                    {review.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-snug mt-1 mb-0">
                    {review.text}
                  </p>
                </div>
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Reviewer"
                    className="w-11 h-11 md:w-[52px] md:h-[52px] rounded-full object-cover border-2 border-white shadow"
                  />
                </div>
              </div>
              {/* Review Stars */}
              <div className="flex items-center gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-amber-400 text-base md:text-lg"
                  />
                ))}
                <span className="text-sm md:text-base font-bold text-[#232321] ml-2">
                  {review.rating}
                </span>
              </div>
            </div>
            {/* Review Image Section */}
            <div className="relative w-full h-[160px] md:h-[240px] bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1517260911205-8eeaa2f841df?auto=format&fit=crop&w=600&q=80"
                alt="Review Image"
                className="w-full h-full object-cover rounded-b-[32px]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
