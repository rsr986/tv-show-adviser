import React from 'react'
import {SMALL_IMG_COVER_BASE_URL} from "./../config";
import s from "./style.module.css"

const MAX_TITLE_CHAE = 20;

export function TvShowListItem({tvShow, onClick}) {

    const onClick_ = () => {
        onClick(tvShow);
    }


  return (
    <div onClick={onClick_} className={s.container}>
        <img 
            alt={tvShow.name}
            src={SMALL_IMG_COVER_BASE_URL + tvShow.backdrop_path}
            className={s.img}
        />
        <div className={s.title}>
            {tvShow.name.length > MAX_TITLE_CHAE 
            ? tvShow.name.slice(0, MAX_TITLE_CHAE) + "..."
            : tvShow.name} 
        </div>
    </div>
  )
}
