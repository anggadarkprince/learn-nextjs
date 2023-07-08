import {Fragment} from "react";
import {getEventById} from "@/dummy-data";
import {Event} from "@/types/event";
import ErrorAlert from "@/components/ui/error-alert";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import {GetStaticProps} from "next";
import {getFeaturedEvents} from "@/helpers/api-util";
import {useRouter} from "next/router";
import Head from "next/head";

function EventDetailPage(props: {event: Event}) {
    const event = props.event;
    const router = useRouter()

    if (router.isFallback) {
        return (
            <div className="center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content="Find a lot of great events that allow to envolve"/>
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const eventId = context.params?.eventId as string;
    const event = await getEventById(eventId);
    if (!event) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            event: event,
        },
        revalidate: 60,
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({params: {eventId: event.id}}));

    return {
        paths: paths,
        //fallback: false, // only static featured event, otherwise return 404 immediately
        //fallback: true, // when user access other event return the page without data, waiting and update regenerated data
        fallback: 'blocking', // waiting to get the data in server (block, do not return page), after complete then return the static version
    }
}

export default EventDetailPage;
