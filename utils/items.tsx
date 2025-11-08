import { Wrench, Clock1, LayoutDashboard, CalendarDays, Squircle } from "lucide-react";

const items: Items[] = [
  {title: "Maintenance", active: true, selected: false, path: "/maintenance", icon: Wrench},
  {title: "Downtime", active: true, selected: true, path: "/downtime", icon: Clock1},
  {title: "Kanban", active: true, selected: false, path: "/kanban", icon: LayoutDashboard},
  {title: "Annual", active: true, selected: false, path: "/annual", icon: CalendarDays},
]

const utils: Items[] = [
  {title: "Spare Parts", active: true, selected: false, path: "http://192.168.3.12:8880", icon: Squircle},
  {title: "Soldering", active: true, selected: false, path: "http://192.168.1.253", icon: Squircle},
  {title: "Electrical", active: true, selected: false, path: "http://192.168.1.252", icon: Squircle},
  {title: "Laser Cutting", active: true, selected: false, path: "http://192.168.1.251", icon: Squircle},
]

export {items, utils};
