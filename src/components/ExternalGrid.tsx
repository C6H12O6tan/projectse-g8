"use client";
import { useEffect, useState } from "react";
import ExternalCard, { Pub } from "./ExternalCard";

const MOCK: Pub[] = [
  { id: "1", title: "Smart Campus IoT", authors: ["Alice"], year: 2024, cover: null, category: "วิจัย" },
  { id: "2", title: "Deep Learning in Education", authors: ["John Doe","Jane Roe"], year: 2023, cover: null, category: "วิชาการ" },
  { id: "3", title: "Green Computing Initiative", authors: ["Bob"], year: 2022, cover: null, category: "วิจัย" },
  { id: "4", title: "AR for Classroom", authors: ["Mina"], year: 2024, cover: null, category: "นวัตกรรม" },
  { id: "5", title: "Data-Driven Advising", authors: ["P. Chan"], year: 2023, cover: null, category: "วิชาการ" },
  { id: "6", title: "Carbon Footprint Events", authors: ["Team CF"], year: 2024, cover: null, category: "บริการวิชาการ" },
];

export default function ExternalGrid() {
  const [items, setItems] = useState<Pub[]>([]);
  useEffect(() => { setItems(MOCK); }, []);
  return <div className="grid-cards">{items.map((p) => <ExternalCard key={p.id} p={p} />)}</div>;
}
