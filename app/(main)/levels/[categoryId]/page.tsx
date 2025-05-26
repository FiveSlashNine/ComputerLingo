import { Sidebar } from "@/components/sidebar";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { CategoryLevels } from "@/components/category-levels";
import { CategoryProgress } from "@/components/category-progress";

export default function HomePage() {
  // In a real app, this would come from the route or state
  const currentCategory = 1;

  return (
    <div className="flex min-h-screen bg-[#f7f7f7]">
      <Sidebar />
      <main className="flex-1 p-4 md:p-6 lg:p-8 pt-[72px] overflow-auto">
        <div className="flex items-center h-14 md:hidden mb-4">
          <MobileSidebar />
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold">LearnQuest</h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <CategoryProgress />
          <CategoryLevels
            categoryId={currentCategory}
            categoryName={""}
            userId={""}
          />
        </div>
      </main>
    </div>
  );
}
