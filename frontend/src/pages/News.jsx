import React from 'react'
import { useEffect, useState } from 'react'
import img from '../images/1648551307854.jpg'
import css from '../index.css'

const News = () => {

    const [news, setNews] = useState([])

    // fetching news from my backend api
    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch('/api/news', {
                method: 'GET',
            })
            const json = await response.json()
            setNews(json)
        }
        fetchNews()
    }, [])
console.log(news)
    return (
        <div className='mt-10'>
            <h1 className='text-2xl'>Like crypto news? Here is the latest in crypto news</h1>
            {news.map((article, i) => (
                <a className='' href={article.url}>
                <div key={i} className="hoverBox card card-side h-40 bg-base-300 shadow-xl my-10">
                    <figure><img className='h-full w-36' src={article.image ? article.image.thumbnail.contentUrl : img} alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title ">{article.name}</h2>
                        <p>{article.description}</p>
                    </div>
                </div>
                </a>
            ))}
        </div>
    )
}

export default News