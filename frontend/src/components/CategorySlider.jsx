const categories = [
  "Pizza",
  "Burger",
  "Biryani",
  "Dessert",
  "Chinese",
  "South Indian",
  "Rolls",
  "Drinks",
];

function CategorySlider() {
  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Categories
      </h2>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide">

        {categories.map((category, index) => (
          <div
            key={index}
            className="min-w-[180px] h-40 bg-white rounded-2xl shadow-sm flex items-center justify-center text-xl font-semibold text-gray-700 hover:bg-orange-500 hover:text-white transition cursor-pointer"
          >
            {category}
          </div>
        ))}

      </div>

    </div>
  );
}

export default CategorySlider;