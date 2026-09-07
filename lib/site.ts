import { firestore } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

export const siteConfig = {
  name: "SpaceCode",
  tagline: "Web development agency",
  description:
    "SpaceCode designs and builds websites, storefronts and web apps for teams who want to launch fast and look sharp doing it.",
  email: "talk.spacecode@gmail.com",
  phone: "+381 61 192 64 74",
  location: "Nis/Lazarevac, Serbia",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
  },
};
export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD;
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/news", label: "News" },
  { href: "/review", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];
export async function getAvgRating(): Promise<number> {
  try {
    const snapshot = await getDocs(collection(firestore, "reviews"));

    if (snapshot.empty) {
      return 0;
    }

    const total = snapshot.docs.reduce((sum, doc) => {
      return sum + doc.data().rating;
    }, 0);

    return total / snapshot.size;
  } catch (err) {
    console.error(err);
    return 0;
  }
}
export async function getProjectsCount(): Promise<number> {
  try {
    const snapshot = await getDocs(collection(firestore, "projects"));

    return snapshot.size;
  } catch (err) {
    console.error(err);
    return 0;
  }
}
