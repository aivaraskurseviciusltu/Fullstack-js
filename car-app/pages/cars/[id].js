import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Car({ car, info }) {
    const [isLoading, setIsLoading] = useState(true)
    const [img, setImg] = useState(null)

    const fetchImage = async () => {
        const res = await fetch(car.image)
        const imageBlob = await res.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        setImg(imageObjectURL)
    }

    useEffect(() => {
        img ? setIsLoading(false) : fetchImage()
    }, [img])

    return (
        <div className={styles.background}>
            <Head>
                <title>{car.color} {car.name} {car.model}</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {car.name} {car.model}
                </h1>
                {isLoading ? <div className={styles.ldsdualring}></div> : <div>
                    <img src={img} width="500px" />
                    <h1>Information</h1>
                    {info.length === 0 ?
                        <p>Sorry no data...</p>
                        :
                        (<><p>Year : {info[0].year}</p><p>City MPG : {info[0].city_mpg}</p><p>Cylinders : {info[0].cylinders}</p></>)
                    }
                </div>}
            </main>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    const getCar = await fetch(`http://localhost:3000/${params.id}.json`)
    const car = await getCar.json()
    const getInfo = await fetch(`https://api.api-ninjas.com/v1/cars?limit=2&model=${car.model}`, {
        headers: {
            'X-Api-Key': 'ymtnPWI4pJ85TwO1+rQ6ag==JRgakmHTPBnHalNs'
        }
    });
    const info = await getInfo.json()
    return {
        props: { car, info }
    }
}



