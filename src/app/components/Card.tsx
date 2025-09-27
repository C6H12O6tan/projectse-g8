"use client";
import React from "react";

interface CardProps {
  title: string;
  image: string;
  year: number;
}

export default function Card({ title, image, year }: CardProps) {
  return (
    <div className="bg-[#143C63] text-white rounded-lg overflow-hidden shadow hover:shadow-lg transition flex flex-col justify-between">
      {/* รูป */}
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      {/* เนื้อหา */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-bold text-sm uppercase">{title}</h2>
        {/* ถ้ามีเนื้อหาอื่นสามารถเพิ่มที่นี่ */}
      </div>

      {/* กล่องสีเหลือง ชิดมุมซ้ายล่างเสมอ */}
      <div className="p-4">
        <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-xl inline-block">
          UPDATE: {year}
        </span>
      </div>
    </div>
  );
}
