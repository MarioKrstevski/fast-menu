import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MenuItems(props) {
  const gs = useSelector((store) => store.globalSettings);
  const menu = useSelector((store) => store.menu);
  const dispatch = useDispatch();

  return (
    <div className="min-h-full max-w-full overflow-hidden">
      <div className="filters"></div>

      <div className="items">{JSON.stringify(menu)}</div>
    </div>
  );
}
