import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getAllEvents } from '@/helpers/api-util';
import { Event } from '@/types/event';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import Head from "next/head";

function AllEventsPage(props: {events: Event[]}) {
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find a lot of great events that allow to envolve"/>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
    revalidate: 60
  };
}


export default AllEventsPage;
