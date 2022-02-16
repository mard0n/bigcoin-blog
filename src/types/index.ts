import { Asset, EntryFields, RichTextContent } from "contentful";

export type Blog = {
  title: string;
  description: string;
  thumbnail: Asset;
  slug: string;
  tags: string[];
  authorName?: string;
  authorImage?: Asset;
  editDate?: string;
  content: EntryFields.RichText
};
