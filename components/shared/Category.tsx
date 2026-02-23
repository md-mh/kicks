import { CategoryType } from "@/types/Products";

// Display a product's category as a badge.
const Category = ({ category }: { category: CategoryType }) => {
  return (
    <span className="bg-[#4A69E2]/10 text-[#4A69E2] text-xs font-semibold px-3 py-1 rounded-md uppercase">
      {category.name}
    </span>
  );
};

export default Category;
