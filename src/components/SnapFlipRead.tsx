import { use } from "react";
import { getSnapFlipReadSteps } from "@/services/api";

export default function SnapFlipRead() {
  const steps = use(getSnapFlipReadSteps());
  return (
    <section className="bg-mysterious-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            USP
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Snap. Flip. Read.
          </h2>
          <p className="scroll-reveal scroll-d2 mt-5 text-base text-paper/70 md:text-lg">
            Ba bước để bắt đầu đọc — đơn giản, nhanh chóng, mọi lúc mọi nơi.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className={`scroll-reveal scroll-d${i + 3} group text-center`}
            >
              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl glass-icon md:h-24 md:w-24">
                <step.icon size={40} strokeWidth={1.8} className="text-gold" />
              </div>

              {/* Step label */}
              <p className="mt-6 font-accent text-2xl text-gold-gradient md:text-3xl">
                {step.step}
              </p>

              {/* Title */}
              <h3 className="mt-3 font-heading text-xl font-bold text-paper md:text-2xl">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm text-paper/70 md:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
