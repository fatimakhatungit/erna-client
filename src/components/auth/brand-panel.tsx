export default function BrandPanel({
  eyebrow,
  headline,
  body,
}: {
  eyebrow: string;
  headline: string;
  body: string;
}) {
  return (
    <div className="hidden lg:block lg:w-1/2 p-3 pl-0">
      <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] min-h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop"
          alt="Login banner"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
}