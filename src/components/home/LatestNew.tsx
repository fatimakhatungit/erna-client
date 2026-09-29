import Image from "next/image";
import Link from "next/link";

interface Blog {
  id: number;
  image: string;
  author: string;
  date: string;
  title: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    image: "https://i.ibb.co.com/67vFXvdx/blog-1-1.jpg",
    author: "Michel Smith",
    date: "24 Feb, 2025",
    title: "Top 20 Smartwatches Rated Rollable Just Tipped",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/zTy7fTBY/blog-1-2.jpg",
    author: "Michel Smith",
    date: "24 Feb, 2025",
    title:
      "The Ultimate Guide To Marketing Strategies to Improve Sales",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/6JJdBgvj/blog-1-3.jpg",
    author: "Michel Smith",
    date: "24 Feb, 2025",
    title:
      "50 Sales Questions to Determine Your Customer’s Needs",
  },
  {
    id: 4,
    image: "https://i.ibb.co.com/YFysBnJr/blog-1-4.jpg",
    author: "Michel Smith",
    date: "24 Feb, 2025",
    title:
      "10 Content Marketing Trends and Ideas to Increase Traffic",
  },
];

export default function LatestNews() {
  return (
    <section
      id="blog-sec"
      className="overflow-hidden bg-white py-16 dark:bg-black lg:py-20"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 lg:flex-row">
          {/* Title */}
          <div className="w-full lg:w-auto">
            <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl lg:text-left">
              Latest News & Updates
            </h2>

            {/* Accent Line */}
            <div className="mx-auto mt-3 h-[3px] w-[150px] rounded-full bg-[#FD5B44] lg:mx-0" />
          </div>

          {/* Explore All */}
          <div className="w-full text-center lg:w-auto lg:text-right">
            <Link
              href="/blog"
              className="inline-block border-b-2 border-[#FD5B44] pb-1 text-sm font-semibold text-[#FD5B44] transition-all duration-300 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
            >
              Explore All
            </Link>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mb-8 h-px w-full bg-gray-200 dark:bg-gray-800" />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FD5B44] hover:shadow-lg hover:shadow-black/10 dark:border-gray-800 dark:bg-[#0b0b0b]"
            >
              {/* Image */}
              <Link
                href={`/blog/${blog.id}`}
                className="relative block overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
              >
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={400}
                  className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-[280px] xl:h-[210px]"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />
              </Link>

              {/* Content */}
              <div className="flex flex-1 flex-col pt-5">
                {/* Meta */}
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium">
                  <Link
                    href="/blog"
                    className="text-gray-700 transition-colors hover:text-[#FD5B44] dark:text-gray-300 dark:hover:text-[#FD5B44]"
                  >
                    By {blog.author}
                  </Link>

                  <span className="h-1.5 w-1.5 rounded-full bg-[#FD5B44]" />

                  <span className="text-gray-500 dark:text-gray-400">
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-4 min-h-[56px] text-base font-semibold leading-snug text-black dark:text-white">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="transition-colors duration-300 hover:text-[#FD5B44]"
                  >
                    {blog.title}
                  </Link>
                </h3>

                {/* Read More */}
                <div className="mt-auto pt-2">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="inline-block border-b border-gray-400 pb-0.5 text-xs font-bold uppercase tracking-wider text-[#FD5B44] transition-all duration-300 hover:border-[#FD5B44] hover:text-black dark:hover:text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}