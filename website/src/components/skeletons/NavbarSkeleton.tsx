import { Bone } from "./Skeleton";

export default function NavbarSkeleton() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 border-b border-paper/5 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-6">
        <Bone className="h-6 w-20" />
        <div className="hidden items-center gap-8 md:flex">
          {[...Array(5)].map((_, i) => (
            <Bone key={i} className="h-4 w-16" />
          ))}
        </div>
        <Bone className="h-11 w-11 rounded-lg" />
      </div>
    </nav>
  );
}
