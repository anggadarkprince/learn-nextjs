import EventItem from './event-item';
import classes from './event-list.module.css';
import {Event} from '@/types/event';

function EventList(props: { items: Event[] }) {
    const { items } = props;

    return (
        <div className={classes.list}>
            {items.map((event: Event) => (
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                    isFeatured={event.isFeatured}
                />
            ))}
        </div>
    );
}

export default EventList;
