import {DUMMY_NEWS} from "@/dummy-news";
import {notFound} from "next/navigation";
import {ModalBackdrop} from "@/components/modal-backdrop";
import {getNewsItem} from "@/lib/news";

export default async function InterceptedImagePage({params}: {params: {slug: string}}) {
    const newsSlug = params.slug;
    //const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug);
    const newsItem = await getNewsItem(newsSlug);

    if (!newsItem) {
        notFound();
    }

    return (
        <>
            <ModalBackdrop/>
            <dialog className="modal" open>
                <div className="fullscreen-image">
                    <img src={`/images/news/${newsItem?.image}`} alt={newsItem.title} style={{ width: "100%" }} />
                </div>
            </dialog>
        </>
    )
}
