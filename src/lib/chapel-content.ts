import heroImage from "@/assets/chapel-hero.jpg";
import prayerImage from "@/assets/Screenshot 2026-09-07 123631.png";
import worshipImage from "@/assets/Screenshot 2026-09-07 123827.png";
import raisedHandsImage from "@/assets/Screenshot 2026-09-07 122204.png";
import fellowshipImage from "@/assets/Screenshot 2026-09-07 122438.png";
import bibleImage from "@/assets/Screenshot 2026-09-07 122703.png";
import choirImage from "@/assets/Screenshot 2026-09-07 123412.png";

export { heroImage };

export const galleryItems = [
  { title: "A people gathered", category: "Worship", image: raisedHandsImage },
  { title: "Finding fellowship", category: "Community", image: fellowshipImage },
  { title: "The Word in our midst", category: "Bible study", image: bibleImage },
  { title: "Serving with joy", category: "Worship", image: choirImage },
  { title: "A quiet place to pray", category: "Prayer", image: prayerImage },
  { title: "Music that gathers us", category: "Worship", image: worshipImage },
] as const;

export const purposeItems = [
  {
    number: "01",
    title: "Worship",
    description: "Coming together to honour God through praise, prayer, and thanksgiving.",
  },
  {
    number: "02",
    title: "Fellowship",
    description: "Building meaningful relationships where every student belongs.",
  },
  {
    number: "03",
    title: "Spiritual growth",
    description: "Deepening our knowledge of Scripture and growing in spiritual character.",
  },
  {
    number: "04",
    title: "Service",
    description: "Using our gifts to serve the Chapel and university community.",
  },
] as const;

export const activityItems = [
  { title: "Sunday worship", description: "A welcoming space to worship, listen, and begin the week with God.", image: raisedHandsImage },
  { title: "Bible study", description: "Honest conversations around Scripture, faith, and student life.", image: bibleImage },
  { title: "Prayer meetings", description: "Quiet and collective moments to seek God together.", image: prayerImage },
  { title: "Fellowship", description: "Building friendships that make campus feel more like home.", image: fellowshipImage },
] as const;