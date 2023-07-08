import { getFeaturedEvents } from '@/helpers/api-util';
import EventList from '../components/events/event-list';
import {Event} from '@/types/event';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function HomePage(props: {events: Event[]}) {
  return (
      <div className={inter.className}>
          <EventList items={props.events} />
      </div>
  );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800, // regenerated every 30 minutes
    }
}

export default HomePage;
