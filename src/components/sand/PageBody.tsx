import { useContent } from "../../lib/admin-store";

type Props = { pageId: string; fallbackTitle?: string };

/** Renders admin-editable page copy. Blocks starting with "## " become headings. */
export function PageBody({ pageId, fallbackTitle }: Props) {
  const page = useContent().pages.find((item) => item.id === pageId);
  const title = page?.title ?? fallbackTitle ?? "";
  const blocks = (page?.body ?? "")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <article className="page-copy">
      {title ? <h1>{title}</h1> : null}
      {blocks.map((block, index) =>
        block.startsWith("## ") ? (
          <h2 key={index}>{block.slice(3)}</h2>
        ) : (
          <p key={index}>{block}</p>
        ),
      )}
    </article>
  );
}
