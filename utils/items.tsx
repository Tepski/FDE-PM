import { Wrench, Clock1, LayoutDashboard, CalendarDays, Squircle } from "lucide-react";

const items: Items[] = [
  {title: "Maintenance", active: true, selected: false, path: "/maintenance", icon: Wrench},
  {title: "Downtime", active: true, selected: true, path: "/downtime", icon: Clock1},
  {title: "Kanban", active: true, selected: false, path: "/kanban", icon: LayoutDashboard},
  {title: "Annual", active: true, selected: false, path: "/annual", icon: CalendarDays},
]

const utils: Items[] = [
  {title: "Spare Parts", active: true, selected: false, path: "http://192.168.3.12:8880", icon: Squircle},
  {title: "Soldering", active: true, selected: false, path: "http://192.168.1.253/apl/monitor?boardno=0&pageno=0", icon: Squircle},
  {title: "Electrical", active: true, selected: false, path: "http://192.168.1.252/apl/monitor?boardno=3&pageno=0", icon: Squircle},
  {title: "Laser Cutting", active: true, selected: false, path: "http://192.168.1.251/apl/monitor?boardno=0&pageno=14", icon: Squircle},
  {title: "Base Mold Priming", active: true, selected: false, path: "http://192.168.1.247/apl/monitor?boardno=1&pageno=0", icon: Squircle},
  {title: "Power B3", active: true, selected: false, path: "http://192.168.1.4/apl/monitor?boardno=0&pageno=0", icon: Squircle},
]

export {items, utils};
