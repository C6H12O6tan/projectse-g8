import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import Stack from "@mui/material/Stack";

export type Pub = { id: string; title: string; authors: string[]; year?: number | null; cover?: string | null, category?: string };

export default function ExternalCard({ p }: { p: Pub }) {
    return (
        <Link href={`/publications/${p.id}`} style={{ textDecoration: "none" }}>
            <Card variant="outlined">
                <CardActionArea>
                    <div className="thumb" style={{ position: 'relative' }}>
                        {/* ป้ายปีตามแบบ */}
                        {p.year ? (
                            <div style={{
                                position: 'absolute', top: 12, left: 12, fontSize: 12, fontWeight: 700,
                                padding: '4px 8px', background: '#111', color: '#fff', borderRadius: 8, opacity: .9
                            }}>
                                UPDATE: {p.year}
                            </div>
                        ) : null}

                        {p.cover ? <img src={p.cover} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} /> : <span>ไม่มีภาพปก</span>}
                    </div>
                    <CardContent>
                        <Stack spacing={0.5}>
                            <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                                {p.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {p.authors?.[0] ?? ""}
                            </Typography>
                            {p.category ? (
                                <Chip label={p.category} size="small" variant="outlined" sx={{ mt: 0.5, alignSelf: 'start' }} />
                            ) : null}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}
