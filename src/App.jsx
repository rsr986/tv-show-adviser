import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv_show";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TvShowDetail } from "./TvShowDetail/TvShowDetail";
import { Logo } from "./Logo/Logo";
import logoImg from "./assets/images/logo.png";
import { TvShowListItem } from "./TvShowListItem/TvShowListItem";
import { TvShowList } from "./TvShowList/TvShowList";
import { SearchBar } from "./SearchBar/SearchBar";

export function App() {
  const [currentTvShow, setCurrentTvShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);

  async function fetchPoulars() {
    const popularTvShowList = await TVShowAPI.fetchPopulars();
    if (popularTvShowList.length > 0) {
      setCurrentTvShow(popularTvShowList[0]);
    }
  }

  async function fetchRecommendations(tvShowId) {
    const recommendationListResponse = await TVShowAPI.fetchRecommendations(
      tvShowId
    );
    if (recommendationListResponse.length > 0) {
      setRecommendationList(recommendationListResponse.slice(0, 10));
    }
  }

  useEffect(() => {
    fetchPoulars();
  }, []);

  useEffect(() => {
    if (currentTvShow) {
      fetchRecommendations(currentTvShow.id);
    }
  }, [currentTvShow]);

  function updateCurrentTvShow(tvShow) {
    setCurrentTvShow(tvShow);
  }

  async function fetechByTitle(title) {
    const searchResponse = await TVShowAPI.fetchByTitle(title);
    if (searchResponse.length > 0) {
      setCurrentTvShow(searchResponse[0]);
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTvShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}/${currentTvShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              img={logoImg}
              title="Watowatch"
              subtitle="Find a show you may like"
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetechByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTvShow && <TvShowDetail tvShow={currentTvShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTvShow && recommendationList && (
          <TvShowList
            onClickItem={updateCurrentTvShow}
            tvShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
