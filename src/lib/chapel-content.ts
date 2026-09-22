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

export type BibleStudySession = {
  id: string;
  day: string;
  time: string;
  title: string;
  scripture: string;
  summary: string;
  documentName?: string;
  documentDataUrl?: string;
};

export const bibleStudySessions = [
  {
    id: "bible-study-sunday",
    day: "Sunday",
    time: "4:00 PM",
    title: "The Word in our midst",
    scripture: "John 15:1-11",
    summary: "An open study for students who want to grow in Scripture, prayer, and practical faith.",
  },
  {
    id: "bible-study-tuesday",
    day: "Tuesday",
    time: "5:00 PM",
    title: "Faith for everyday life",
    scripture: "James 1:19-27",
    summary: "A thoughtful conversation about hearing God's Word and putting faith into action on campus.",
  },
  {
    id: "bible-study-thursday",
    day: "Thursday",
    time: "5:00 PM",
    title: "Growing together",
    scripture: "Colossians 3:12-17",
    summary: "A community study on spiritual maturity, encouragement, and life together in Christ.",
  },
] as const;

export type ProverbialDigest = {
  id: string;
  day: string;
  proverb: string;
  reflection: string;
  documentName?: string;
  documentDataUrl?: string;
};

export const proverbialDigests = [
  { id: "digest-monday", day: "Monday", proverb: "A wise heart is always ready to learn.", reflection: "Begin the week with humility. There is wisdom in listening before speaking." },
  { id: "digest-tuesday", day: "Tuesday", proverb: "Small acts of faithfulness shape a meaningful life.", reflection: "Give your best attention to the ordinary responsibilities in front of you today." },
  { id: "digest-wednesday", day: "Wednesday", proverb: "A gentle word can open a door that strength cannot.", reflection: "Let your conversations carry patience, grace, and the welcome of Christ." },
  { id: "digest-thursday", day: "Thursday", proverb: "The light we share becomes brighter in community.", reflection: "Encourage someone around you and make room for another person's story." },
  { id: "digest-friday", day: "Friday", proverb: "Wisdom grows when reflection becomes action.", reflection: "Carry one lesson from this week into the way you serve and lead." },
  { id: "digest-saturday", day: "Saturday", proverb: "A quiet spirit notices what hurry often misses.", reflection: "Make space to be still, give thanks, and notice God's work around you." },
  { id: "digest-sunday", day: "Sunday", proverb: "A grateful heart sees each new week as an invitation.", reflection: "Begin again with hope, trusting that God is present in every step ahead." },
] as const;