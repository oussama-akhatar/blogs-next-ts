import Image from "next/image"
import styles from "./page.module.scss";

async function getData(id: number) {
  const res = await fetch(`http://localhost:9000/posts/${id}`, { cache: "no-store" });
  if (!res.ok) { throw new Error('Failed to fetch data') }
  return res.json();
}

const BlogPost = async ({ params }: any) => {
  const data = await getData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>
            {data.body}
          </p>
          <div className={styles.author}>
            <Image
              src={data.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          {data.body}
        </p>
      </div>
    </div>
  )
}

export default BlogPost