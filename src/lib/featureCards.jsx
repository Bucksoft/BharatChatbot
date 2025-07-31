import { FaBrain, FaFilePdf } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";

export const featureCards = [
  {
    id: 1,
    title: "Conversational AI Powered by LLM",
    description:
      "Engage in human-like conversations with an intelligent assistant built on advanced language models (GPT-based). Ask questions, get explanations, brainstorm ideas, and more.",
    icon: <FaBrain size={20}/>,
  },
  {
    id: 2,
    title: "Talk to Your PDFs",
    description:
      "Upload any PDF and get instant answers. Your AI assistant can summarize, extract key data, and help you understand complex documents without reading them all.",
    icon: <FaFilePdf size={20}/>,
  },
  {
    id: 3,
    title: "Website Scraper Intelligence",
    description:
      "Just paste a URL — the chatbot will read and understand the content, then answer questions based on the webpage in real time.",
    icon: <IoGlobeOutline size={20}/>,
  },
];
