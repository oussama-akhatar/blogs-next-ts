import Link from 'next/link'
import styles from './page.module.scss'
import Image from 'next/image'

async function getData() {
  const res = await fetch('http://localhost:9000/posts', { cache: 'no-store' })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

interface IPost {
  id?: number,
  img: string,
  title: string,
  body: string
}

const Blog = async () => {
  const data = await getData()
  return (
    <div className={styles.mainContainer}>
      {data.map((item: IPost) => (
        <Link href={`/blog/${item.id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.body}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Blog