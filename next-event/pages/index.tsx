import { getFeaturedEvents } from '@/dummy-data';
import EventList from '../components/events/event-list';
import { Inter } from 'next/font/google'
import EventsSearch from "@/components/events/events-search";

const inter = Inter({ subsets: ['latin'] })

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
      <div className={inter.className}>
          <EventList items={featuredEvents} />
      </div>
  );
}

export default HomePage;
