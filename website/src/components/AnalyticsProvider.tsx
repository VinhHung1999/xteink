"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackScrollDepth, trackTimeOnPage } from "@/utils/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const startTime = useRef(Date.now());
  const scrollMilestones = useRef(new Set<number>());

  // Track scroll depth
  useEffect(() => {
    scrollMilestones.current = new Set();

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of [25, 50, 75, 90]) {
        if (percent >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollDepth(milestone);
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Track time on page
  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds >= 5) {
        trackTimeOnPage(seconds, pathname);
      }
    };
  }, [pathname]);

  // Track GA4 page views on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && GA_ID) {
      window.gtag("config", GA_ID, { page_path: pathname });
    }
  }, [pathname]);

  return (
    <>
      {/* GA4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { send_page_view: false });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {FB_PIXEL_ID && (
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
            n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
            s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
