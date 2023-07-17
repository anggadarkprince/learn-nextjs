import {Event} from "@/types/event";

export async function getAllEvents(): Promise<Event[]> {
    const response = await fetch('https://sandbox-485f9-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
    const data = await response.json();
    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }
    return events;
}

export async function getFeaturedEvents(): Promise<Event[]> {
    const events = await getAllEvents();
    return events.filter((event) => event.isFeatured);
}

export async function getEventById(id: string): Promise<Event | undefined> {
    const events = await getAllEvents();
    return events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {year: number, month: number}) {
    const { year, month } = dateFilter;
    const events = await getAllEvents();

    return events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
}
