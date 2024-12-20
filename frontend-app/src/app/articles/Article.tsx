import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalCategories from "../(archives)/ModalCategories";
import ModalTags from "../(archives)/ModalTags";
import { fetchNews } from "../../reducers/newsReducer";
import { RootState, AppDispatch } from "../../store";
import Pagination from "components/Pagination/Pagination2";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "components/Card11Article/Card11A";
import Image from "components/Image";
import { DEMO_CATEGORIES, DEMO_TAGS } from "../../data/taxonomies";
import {ArticleDataType} from "../../data/types";

const ArticlePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { articles, loading, pagination } = useSelector((state: RootState) => state.news);

    const FILTERS = [
        { name: "Most Recent" },
        { name: "Curated by Admin" },
        { name: "Most Appreciated" },
        { name: "Most Discussed" },
        { name: "Most Viewed" },
    ];

    useEffect(() => {
        dispatch(fetchNews(1)); // Fetch the first page of articles
    }, [dispatch]);

    const handleShowMore = () => {
        if (pagination.current_page < pagination.last_page) {
            dispatch(fetchNews(pagination.current_page + 1));
        }
    };

    return (
        <div className={`nc-PageArchive`}>
            {/* HEADER */}
            <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
                <div className="relative aspect-w-16 aspect-h-13 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-5 rounded-3xl md:rounded-[40px] overflow-hidden z-0">
                    <Image
                        alt="archive"
                        fill
                        src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        className="object-cover w-full h-full rounded-3xl md:rounded-[40px]"
                        sizes="(max-width: 1280px) 100vw, 1536px"
                    />
                    <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                        <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
                            Garden
                        </h2>
                        <span className="block mt-4 text-neutral-300">{pagination.total} Articles</span>
                    </div>
                </div>
            </div>
            {/* ====================== END HEADER ====================== */}

            <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
                <div>
                    <div className="flex flex-col sm:justify-between sm:flex-row">
                        <div className="flex space-x-2.5">
                        </div>
                        <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
                        <div className="flex justify-end">
                            <ArchiveFilterListBox lists={FILTERS} />
                        </div>
                    </div>

                    {/* LOOP ITEMS */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            articles.map((article: ArticleDataType) => (
                                <Card11
                                    key={article.id}
                                    post={{
                                        title: article.title,
                                        href: "/articles/"+article.id,
                                        date_published: article.date_published,
                                        image: article.image,
                                        author: article.author,
                                    }}
                                />
                            ))
                        )}
                    </div>

                    {/* PAGINATIONS */}
                    <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                        <Pagination />
                    </div>
                </div>

                <SectionSubscribe2 />
            </div>
        </div>
    );
};

export default ArticlePage;