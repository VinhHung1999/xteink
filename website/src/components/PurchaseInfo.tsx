import { use } from "react";
import { Check } from "lucide-react";
import { getPurchaseInfoData } from "@/services/api";

export default function PurchaseInfo() {
  const data = use(getPurchaseInfoData());

  return (
    <section id="purchase-info" className="bg-mysterious-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1320px]">
        {/* Section Header */}
        <div className="text-center">
          <p className="scroll-reveal text-xs font-semibold uppercase tracking-[0.15em] text-gold md:text-sm">
            Mua hàng dễ dàng
          </p>
          <h2 className="scroll-reveal scroll-d1 mt-4 font-heading text-3xl font-bold tracking-[-0.01em] text-paper md:text-5xl md:leading-[1.1]">
            Thanh toán · Giao hàng · Bảo hành
          </h2>
          <p className="scroll-reveal scroll-d2 mt-5 text-base text-paper/70 md:text-lg">
            Mọi thứ bạn cần biết trước khi đặt hàng.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="mt-14">
          <h3 className="scroll-reveal text-sm font-semibold uppercase tracking-[0.12em] text-gold/80">
            Phương thức thanh toán
          </h3>
          <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
            {data.paymentMethods.map((method, i) => (
              <div
                key={method.name}
                className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card rounded-xl p-5 text-center`}
              >
                <div className="glass-icon mx-auto flex h-12 w-12 items-center justify-center rounded-xl">
                  <method.icon size={24} strokeWidth={1.6} className="text-gold" />
                </div>
                <p className="mt-3 text-sm font-semibold text-paper">
                  {method.name}
                </p>
                <p className="mt-1 text-xs text-paper/60">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping + Warranty Row */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Shipping Info */}
          <div>
            <h3 className="scroll-reveal text-sm font-semibold uppercase tracking-[0.12em] text-gold/80">
              Giao hàng
            </h3>
            <div className="mt-6 space-y-4">
              {data.shippingInfo.map((info, i) => (
                <div
                  key={info.region}
                  className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card flex items-start gap-4 rounded-xl p-5`}
                >
                  <div className="glass-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <info.icon size={20} strokeWidth={1.6} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-paper">{info.region}</p>
                    <p className="mt-0.5 text-sm text-paper/70">{info.time}</p>
                    {info.note && (
                      <p className="mt-1 text-xs text-sage">{info.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Warranty */}
          <div>
            <h3 className="scroll-reveal text-sm font-semibold uppercase tracking-[0.12em] text-gold/80">
              Bảo hành
            </h3>
            <div className="mt-6 space-y-4">
              {data.warranty.map((item, i) => (
                <div
                  key={item.title}
                  className={`scroll-reveal scroll-d${Math.min(i + 2, 7)} glass-card flex items-start gap-4 rounded-xl p-5`}
                >
                  <div className="glass-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <item.icon size={20} strokeWidth={1.6} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-paper">{item.title}</p>
                    <p className="mt-0.5 text-sm text-paper/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bundle Includes */}
        <div className="mt-14">
          <h3 className="scroll-reveal text-sm font-semibold uppercase tracking-[0.12em] text-gold/80">
            Trong hộp có gì?
          </h3>
          <div className="scroll-reveal scroll-d2 mt-6 glass-card rounded-2xl p-6 md:p-8">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {data.bundleItems.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <Check size={18} strokeWidth={2.5} className="shrink-0 text-sage" />
                  <span className="text-sm text-paper/80">{item.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gold/70 border-t border-gold/10 pt-4">
              {data.freeShippingNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
