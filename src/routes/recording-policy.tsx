import { createFileRoute } from "@tanstack/react-router";
import { SiteEnd } from "../components/layout/SiteEnd";

export const Route = createFileRoute("/recording-policy")({
  component: RecordingPage,
  head: () => ({
    meta: [{ title: "Recording Policy - MAGEYE" }],
  }),
});

function RecordingPage() {
  return (
    <>
      <section className="page-hero">
        <h1>Recording Policy</h1>
      </section>
      <article className="page-copy">
        <p>Every online SAND event is recorded. The recordings are made available to all participants of the event. In addition, some of the talks are published on the SAND website, on YouTube, and on social media.</p>
        <p>
          By registering, you give us consent for us to fully use both the audio
          and video recordings of the sessions you take part in. If you ask a
          question, please keep in mind that it will be recorded, and perhaps
          posted.
        </p>
        <p>
          Please note that recording any part of an event by attendees, or
          sharing any part of an existing recording, is not allowed without
          written permission from MAGEYE.
        </p>
      </article>
      <SiteEnd />
    </>
  );
}
