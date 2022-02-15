import { NextPage } from "next";
import React from "react";
interface TagsProps {
  tags: string[];
  selectedTag: string;
  handleOnSelect: (tag: string) => void;
}

const Tags: NextPage<TagsProps> = ({ tags, selectedTag, handleOnSelect }) => {
  return (
    <div
      className="container flex justify-center"
      style={{ borderBottom: "1px solid #E0E0E0" }}
    >
      {tags.map((tag) => (
        <div
          key={tag}
          className={`
            cursor-pointer px-3 py-2 mx-4 mt-1 hover:text-[color:#0D386B] text-base
            text-[color:${selectedTag === tag ? "#0D386B" : "#5F6771"}]
          `}
          style={{
            borderBottom: selectedTag === tag ? "2px solid #0D386B" : "none",
          }}
          onClick={() => handleOnSelect(tag)}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Tags;
