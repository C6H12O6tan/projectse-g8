import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

type Ann = { title: string; desc?: string; date?: string };

export default function TeacherAnnouncements({ items }: { items: Ann[] }) {
  return (
    <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2 }}>
      <Typography variant="subtitle1" fontWeight={700} sx={{ p: 2, pb: 1 }}>
        ประกาศ / แจ้งเตือน
      </Typography>
      <List dense disablePadding>
        {items.map((a, i) => (
          <div key={i}>
            <ListItem sx={{ py: 1.25 }}>
              <ListItemText
                primary={a.title}
                secondary={a.desc ? `${a.desc}${a.date ? ` • ${a.date}` : ""}` : a.date}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            {i < items.length - 1 ? <Divider /> : null}
          </div>
        ))}
      </List>
    </Paper>
  );
}
