import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const News = () => {

    const [news, setNews] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const options = {
                method: 'GET',
                url: 'https://bing-news-search1.p.rapidapi.com/news',
                params: { q: `cryptocurrency`, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
                headers: {
                    'X-BingApis-SDK': 'true',
                    'X-RapidAPI-Key': 'db3e8ae18bmshd7bb610557d438fp1e9721jsneadf0cccb21c',
                    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }
        fetchNews()
    }, [])

    return (
        <div>

        </div>
    )
}

export default News