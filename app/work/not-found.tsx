import Link from "next/link";

export default function WorkNotFound() {
    return (
        <main className="flex min-h-screen flex-col justify-center bg-[#0b0a09] px-6 text-[#e8e2d7] sm:px-10 lg:px-16">
            <p className="mb-6 text-[10px] tracking-[0.24em] text-[#a8755f]">
                404 · NO SUCH FILM
            </p>

            <h1 className="font-['Playfair_Display',serif] text-[clamp(52px,11vw,170px)] font-normal leading-[0.8] tracking-[-0.075em] text-white">
                Nothing
                <br />
                <span className="italic">shoots here.</span>
            </h1>

            <p className="mt-10 max-w-md text-[13px] leading-7 text-white/50">
                This page is not in the cut. The film you are after may have
                been renamed, or it may not be published yet.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-8">
                <Link
                    href="/#work"
                    className="group inline-flex items-center gap-3 border-b border-white/50 pb-1 text-[10px] tracking-[0.2em] transition-colors hover:border-white"
                >
                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>
                    BACK TO SELECTED WORKS
                </Link>

                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/45 transition-colors hover:text-white"
                >
                    HOME
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                        ↗
                    </span>
                </Link>
            </div>
        </main>
    );
}
