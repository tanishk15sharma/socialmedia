import React from "react";
import { BookmarksFeed } from "../components/BookmarksFeed";
import { Header } from "../components/Header";
import { SideNav } from "../components/SideNav";
import { Suggestions } from "../components/Suggestions";

const Bookmarks = () => {
  return (
    <div>
      <Header />
      <div className="flex gap-3">
        <SideNav />
        <BookmarksFeed />
        <Suggestions />
      </div>
    </div>
  );
};

export { Bookmarks };