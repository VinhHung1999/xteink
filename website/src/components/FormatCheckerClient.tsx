"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, CheckCircle, XCircle, FileText } from "lucide-react";

const SUPPORTED: Record<string, { name: string; note: string }> = {
  epub: { name: "EPUB", note: "Phổ biến nhất — reflow theo cỡ chữ" },
  pdf: { name: "PDF", note: "Giữ nguyên layout, hỗ trợ crop margin" },
  mobi: { name: "MOBI", note: "Kindle format — tương thích hoàn toàn" },
  txt: { name: "TXT", note: "Văn bản thuần — nhẹ và nhanh" },
  fb2: { name: "FB2", note: "Fiction Book format" },
  djvu: { name: "DJVU", note: "Tài liệu scan — hiển thị tốt" },
};

interface CheckResult {
  name: string;
  ext: string;
  size: string;
  supported: boolean;
  note: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FormatCheckerClient() {
  const [results, setResults] = useState<CheckResult[]>([]);
  const [dragging, setDragging] = useState(false);

  const checkFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newResults: CheckResult[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      const info = SUPPORTED[ext];
      newResults.push({
        name: file.name,
        ext,
        size: formatFileSize(file.size),
        supported: !!info,
        note: info ? info.note : `Định dạng .${ext} không được hỗ trợ`,
      });
    }
    setResults(newResults);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      checkFiles(e.dataTransfer.files);
    },
    [checkFiles]
  );

  return (
    <section className="px-6 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[640px]">
        <Link
          href="/guides"
          className="scroll-reveal inline-flex items-center gap-1.5 text-sm text-paper/50 transition-colors hover:text-gold"
        >
          <ArrowLeft size={14} />
          Hướng dẫn
        </Link>

        <div className="scroll-reveal scroll-d1 mt-6 text-center">
          <h1 className="font-heading text-3xl font-bold text-paper md:text-4xl">
            Kiểm tra định dạng sách
          </h1>
          <p className="mt-2 text-sm text-paper/60">
            Kéo thả file hoặc chọn file để kiểm tra tương thích với Xteink X4.
          </p>
        </div>

        {/* Drop zone */}
        <div className="mt-10 scroll-reveal scroll-d2">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`glass-card flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
              dragging
                ? "border-gold bg-gold/[0.06]"
                : "border-paper/10 hover:border-paper/20"
            }`}
          >
            <Upload size={32} className={dragging ? "text-gold" : "text-paper/30"} />
            <p className="text-sm text-paper/60">
              Kéo thả file sách vào đây
            </p>
            <span className="text-xs text-paper/30">hoặc</span>
            <span className="rounded-lg bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20">
              Chọn file
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => checkFiles(e.target.files)}
            />
          </label>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 space-y-3 scroll-reveal scroll-d3">
            <h2 className="font-heading text-lg font-semibold text-paper">
              Kết quả
            </h2>
            {results.map((r, i) => (
              <div
                key={`${r.name}-${i}`}
                className={`glass-card flex items-start gap-3 rounded-xl p-4 border ${
                  r.supported ? "border-green-500/20" : "border-red-500/20"
                }`}
              >
                {r.supported ? (
                  <CheckCircle size={20} className="mt-0.5 shrink-0 text-green-400" />
                ) : (
                  <XCircle size={20} className="mt-0.5 shrink-0 text-red-400" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-paper truncate">{r.name}</p>
                    <span className="shrink-0 text-xs text-paper/40">{r.size}</span>
                  </div>
                  <p
                    className={`mt-0.5 text-xs ${
                      r.supported ? "text-green-400/80" : "text-red-400/80"
                    }`}
                  >
                    {r.supported ? "Tương thích" : "Không tương thích"} — {r.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Supported formats reference */}
        <div className="mt-12 scroll-reveal scroll-d4">
          <h2 className="font-heading text-lg font-semibold text-paper mb-4">
            Định dạng hỗ trợ
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.entries(SUPPORTED).map(([ext, info]) => (
              <div
                key={ext}
                className="glass-card flex items-center gap-2 rounded-lg px-3 py-2.5"
              >
                <FileText size={14} className="shrink-0 text-gold" />
                <div>
                  <p className="text-xs font-bold text-paper">.{ext.toUpperCase()}</p>
                  <p className="text-[10px] text-paper/40">{info.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
