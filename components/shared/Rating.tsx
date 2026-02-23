import { FaStar } from "react-icons/fa";

// The Rating component that displays the rating of the product.
const Rating = ({ rate, count }: { rate: number; count: number }) => {
  return (
    <>
      <span className="text-(--star-color) flex items-center text-sm font-medium">
        <FaStar size={14} className="mr-1" /> {rate}
        <span className="ml-1 text-(--muted-foreground)">
          ({count} ratings)
        </span>
      </span>
    </>
  );
};

export default Rating;
