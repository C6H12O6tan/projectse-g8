"use client";

import React, { useMemo, useState } from "react";

type Publication = {
  id: number;
  author: string;
  project: string;
  year: number;
  status: "approved" | "pending";
};

const initialRows: Publication[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  author: "Jane Cooper",
  project: "Project Name",
  year: 2568 - (i % 3),
  status: i % 3 === 0 ? "pending" : "approved",
}));

export default function Page() {
  const [rows, setRows] = useState<Publication[]>(initialRows);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");
  const [pendingDelete, setPendingDelete] = useState<Publication | null>(null);

  const filtered = useMemo(() => {
    const norm = (s: string) => s.toLowerCase();
    return rows
      .filter((r) =>
        filter === "all" ? true : filter === "approved" ? r.status === "approved" : r.status === "pending"
      )
      .filter((r) => `${r.author} ${r.project} ${r.year}`.toLowerCase().includes(norm(q)));
  }, [rows, q, filter]);

  const onApproveToggle = (id: number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: r.status === "approved" ? "pending" : "approved" } : r))
    );
  };

  const onConfirmDelete = () => {
    if (!pendingDelete) return;
    setRows((prev) => prev.filter((r) => r.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-sky-600" />
              <div className="text-sm font-semibold leading-tight">ระบบบริหารจัดการผลงานตีพิมพ์</div>
            </div>
            <nav className="hidden gap-6 md:flex">
              {[
                ["HOME", "/"],
                ["PROJECT", "/project"],
                ["PERSONNEL", "/personnel"],
                ["SETTING", "/setting"],
              ].map(([label]) => (
                <a key={label} className="text-sm font-medium text-slate-600 transition hover:text-slate-900" href="#">
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <IconButton ariaLabel="notifications"><BellIcon className="h-5 w-5" /></IconButton>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
              <UserIcon className="h-5 w-5 text-slate-600" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-4 text-xl font-bold text-slate-800">ผลงานตีพิมพ์ทั้งหมด</h1>

        <Card>
          <CardContent>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-72">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="ค้นหา"
                    className="pl-9"
                    value={q}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
                  />
                </div>
              </div>

              <Dropdown label="ตัวกรอง">
                <DropdownItem onClick={() => setFilter("all")}>ทั้งหมด</DropdownItem>
                <DropdownItem onClick={() => setFilter("approved")}>อนุมัติแล้ว</DropdownItem>
                <DropdownItem onClick={() => setFilter("pending")}>รอดำเนินการ</DropdownItem>
              </Dropdown>
            </div>

            <div className="overflow-hidden rounded-2xl border">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <Th>ชื่อ-สกุล</Th>
                    <Th>Project</Th>
                    <Th className="text-center">ปีที่ตีพิมพ์</Th>
                    <Th className="text-center">สถานะ</Th>
                    <Th className="text-right">การจัดการ</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/60">
                      <Td>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-sky-600" />
                          <div className="min-w-0">
                            <div className="truncate font-medium text-slate-800">{r.author}</div>
                            <div className="truncate text-xs text-slate-500">{`id: ${r.id}`}</div>
                          </div>
                        </div>
                      </Td>
                      <Td><div className="truncate text-slate-700">{r.project}</div></Td>
                      <Td className="text-center text-slate-700">{r.year}</Td>
                      <Td className="text-center">
                        {r.status === "approved" ? (
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <CheckIcon className="mr-1 h-4 w-4" /> อนุมัติแล้ว
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-700">รอดำเนินการ</Badge>
                        )}
                      </Td>
                      <Td className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            className={
                              r.status === "approved"
                                ? "rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                            }
                            onClick={() => onApproveToggle(r.id)}
                          >
                            <CheckIcon className="mr-1 h-4 w-4" />
                            {r.status === "approved" ? "ยกเลิกอนุมัติ" : "อนุมัติ"}
                          </Button>

                          <Dialog
                            open={!!pendingDelete && pendingDelete?.id === r.id}
                            onOpenChange={(open: boolean) => { if (!open) setPendingDelete(null); }}
                          >
                            <DialogTrigger>
                              <Button
                                size="sm"
                                className="rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200"
                                onClick={() => setPendingDelete(r)}
                              >
                                <TrashIcon className="mr-1 h-4 w-4" /> ลบ
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>ยืนยันลบข้อมูล</DialogHeader>
                              <div className="py-2 text-center text-sm text-slate-600">
                                คุณต้องการลบรายการของ <span className="font-medium text-slate-800">{r.author}</span> ใช่หรือไม่?
                              </div>
                              <DialogFooter>
                                <Button className="w-28 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700" onClick={onConfirmDelete}>
                                  <CheckIcon className="mr-1 h-4 w-4" /> ตกลง
                                </Button>
                                <Button variant="outline" className="w-28 rounded-xl" onClick={() => setPendingDelete(null)}>
                                  <XIcon className="mr-1 h-4 w-4" /> ยกเลิก
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
              <div>Showing data {Math.min(filtered.length, 8)} of {rows.length} entries</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <button
                    key={i}
                    className={`h-8 w-8 rounded-lg border text-sm transition ${
                      i === 1 ? "border-slate-900 bg-slate-900 font-medium text-white"
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/* Helpers */
function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

/* Minimal UI */
function Card({ children }: { children: React.ReactNode }) { return <div className="border-slate-200 shadow-sm rounded-2xl border bg-white">{children}</div>; }
function CardContent({ children }: { children: React.ReactNode }) { return <div className="p-6">{children}</div>; }
function Button({ children, className = "", size = "md", variant = "default", onClick }: { children: React.ReactNode; className?: string; size?: "sm" | "md"; variant?: "default" | "outline"; onClick?: () => void; }) {
  const base = "inline-flex items-center justify-center transition border rounded-xl px-4 py-2 text-sm";
  const sz = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2";
  const v  = variant === "outline" ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                   : "border-transparent bg-slate-900 text-white hover:bg-slate-800";
  return <button onClick={onClick} className={`${base} ${sz} ${v} ${className}`}>{children}</button>;
}
function IconButton({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) { return <button aria-label={ariaLabel} className="rounded-full p-2 hover:bg-slate-100">{children}</button>; }
function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return <input {...props} className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400 ${className}`} />;
}
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <span className={`inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium ${className}`}>{children}</span>; }
function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Button variant="outline" className="gap-2" onClick={() => setOpen(o => !o)}>
        {label}
        <ChevronDownIcon className="h-4 w-4" />
      </Button>
      {open && <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">{children}</div>}
    </div>
  );
}
function DropdownItem({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return <button onClick={onClick} className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50">{children}</button>;
}
function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl">{children}</div>
    </div>
  );
}
function DialogTrigger({ children }: { children: React.ReactNode }) { return <>{children}</>; }
function DialogContent({ children }: { children: React.ReactNode }) { return <>{children}</>; }
function DialogHeader({ children }: { children: React.ReactNode }) { return <h3 className="text-center text-base font-semibold">{children}</h3>; }
function DialogFooter({ children }: { children: React.ReactNode }) { return <div className="mt-3 flex items-center justify-center gap-3">{children}</div>; }

/* Inline SVG icons */
function BellIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>); }
function UserIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>); }
function SearchIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>); }
function ChevronDownIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>); }
function CheckIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m20 6-11 11-5-5"/></svg>); }
function XIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>); }
function TrashIcon({ className = "" }: { className?: string }) { return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>); }
