import { use } from "react";
import { Star, Play, Users, Quote } from "lucide-react";
import { getSocialProofData } from "@/services/api";

function StarRating({ rating, maxRating }: { rating: number; maxRating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <Star
            key={i}
            size={14}
            strokeWidth={1.5}
            className={
              filled
                ? "fill-gold text-gold"
                : half
                  ? "fill-gold/50 text-gold"
                  : "text-paper/20"
            }
          />
        );
      })}
      <span className="ml-1.5 text-xs font-semibold text-paper/70">
        {rating}/{maxRating}
      </span>
    </div>
  );
}

export default function SocialProof() {
  const data = use(getSocialProofData());

  return (
    <section id="social-proof" className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Được tin tưởng bởi
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Báo chí · Cộng đồng · Người dùng
          </h2>
        </div>

        {/* Press + YouTube + Community Stats Row */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {/* Press Reviews */}
          {data.pressReviews.map((press, i) => (
            <div
              key={press.name}
              className={`scroll-reveal scroll-d${i + 2} glass-card rounded-xl p-6`}
            >
              <p className="font-heading text-xl font-bold text-paper">
                {press.name}
              </p>
              <div className="mt-2">
                <StarRating rating={press.rating} maxRating={press.maxRating} />
              </div>
              {press.quote && (
                <p className="mt-3 text-sm italic text-paper/60">
                  &ldquo;{press.quote}&rdquo;
                </p>
              )}
            </div>
          ))}

          {/* YouTube Review */}
          <div className="scroll-reveal scroll-d4 glass-card glass-card-hover rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="glass-icon flex h-10 w-10 items-center justify-center rounded-lg">
                <Play size={18} strokeWidth={1.8} className="text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-paper">
                  {data.youtubeReview.channel}
                </p>
                <p className="text-xs text-paper/50">
                  {data.youtubeReview.subscribers} subscribers
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-paper/80">
              {data.youtubeReview.title}
            </p>
            <a
              href={data.youtubeReview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-deep-gold transition-colors"
            >
              <Play size={14} strokeWidth={2} />
              Xem review
            </a>
          </div>
        </div>

        {/* Community Stats */}
        <div className="scroll-reveal scroll-d5 mt-8 flex items-center justify-center gap-3 rounded-xl border border-gold/10 bg-gold/[0.03] py-4 px-6">
          <Users size={20} strokeWidth={1.6} className="text-gold" />
          <span className="text-sm font-semibold text-paper">
            {data.communityStat}
          </span>
        </div>

        {/* Facebook Testimonials */}
        <div className="mt-12">
          <h3 className="scroll-reveal text-sm font-semibold uppercase tracking-[0.12em] text-gold/80">
            Từ cộng đồng Facebook
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {data.testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card rounded-xl p-5`}
              >
                <Quote size={16} strokeWidth={1.5} className="text-gold/30" />
                <p className="mt-2 text-sm leading-relaxed text-paper/75">
                  {t.quote}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="glass-icon flex h-8 w-8 items-center justify-center rounded-full">
                    <span className="text-xs font-semibold text-gold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-paper">{t.name}</p>
                    <p className="text-[10px] text-paper/40">{t.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
