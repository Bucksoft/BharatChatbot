import { LuBadgeDollarSign } from "react-icons/lu";
import { IoKeyOutline } from "react-icons/io5";
import { VscFilePdf } from "react-icons/vsc";
import { FaLink } from "react-icons/fa6";
import { SlHandbag } from "react-icons/sl";

export const sidebarLinks = [
  {
    id: 1,
    icon: <LuBadgeDollarSign />,
    label: "Pricing",
    link: "pricing",
  },
  {
    id: 2,
    icon: <IoKeyOutline />,
    label: "API Keys",
    link: "api-keys",
  },
  {
    id: 3,
    icon: <VscFilePdf />,
    label: "Upload file",
    link: "upload-file",
  },
  {
    id: 4,
    icon: <FaLink />,
    label: "Upload link",
    link: "upload-link",
  },
  {
    id: 5,
    icon: <SlHandbag />,
    label: "My Plans",
    link: "plans",
  },
];
