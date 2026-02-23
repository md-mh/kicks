import { FaStar } from "react-icons/fa";

// Review data with unique avatars and shoe images.
const reviews = [
  {
    id: 1,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    image:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Good Quality",
    text: "I highly recommend shopping from kicks",
    rating: 5.0,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
  },
];

// Reviews section matching the KICKS design.
export default function Reviews() {
  return (
    <section className="my-20">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-[#232321]">
          Reviews
        </h2>
        <button className="bg-[#4A69E2] hover:bg-[#3B57C9] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-colors cursor-pointer">
          SEE ALL
        </button>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl md:rounded-3xl overflow-hidden flex flex-col"
            style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
          >
            {/* Review Content */}
            <div className="p-5 md:p-6 pb-4 md:pb-5 flex flex-col gap-3">
              {/* Header: Title + Avatar */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#232321] text-base md:text-lg leading-tight">
                    {review.title}
                  </h3>
                  <p className="text-[#70706E] text-sm md:text-[15px] leading-snug mt-1">
                    {review.text}
                  </p>
                </div>
                <img
                  src={review.avatar}
                  alt="Reviewer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="text-[#FFA52F] w-4 h-4 md:w-[18px] md:h-[18px]"
                  />
                ))}
                <span className="text-sm md:text-[15px] font-bold text-[#232321] ml-1.5">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Shoe Image */}
            <div className="w-full h-48 md:h-56 lg:h-64">
              <img
                src={review.image}
                alt="Review shoe"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
