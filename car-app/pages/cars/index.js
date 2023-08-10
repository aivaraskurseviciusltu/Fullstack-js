
import Link from 'next/link'
import styles from '../../styles/Home.module.css'

export default function CarsList({cars}) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Cars list
        </h1>

        <ul>
          {cars ?  cars.map((car, i) => (
            <li key={car}>
            <Link href={`/cars/${i+1}`}><a>{car}</a></Link>
          </li>
          )) : <p>...Loading</p> }
        </ul>
        </main>
    </div>
  )
  }

  export async function getStaticProps() {

    const getCars = await fetch('http://localhost:3000/cars.json')
    const cars = await getCars.json()

    return {
        props: { cars },
    }
}