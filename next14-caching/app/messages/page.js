import Messages from '@/components/messages';
import {unstable_noStore} from 'next/cache'
import {getMessages} from "@/lib/messages";

//export const revalidate = 5; // cache 5 seconds
//export const dynamic = 'force-dynamic'; // same as cache: no-store

export default async function MessagesPage() {
  //unstable_noStore();
  //const response = await fetch('http://localhost:8080/messages', {
  //  next: {
  //    tags: ['msg']
  //  },
    //cache: 'no-store',
    //headers: {
    //  'X-ID': 'page',
    //},
  //});

  //const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
