import styles from "./page.module.scss";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Item, items } from "./data";

const getData = (cat: string): Item[] => {
  const data: Item[] | undefined = items[cat];

  if (data) {
    return data;
  }

  return notFound();
};

const Category = ({ params }: { params: { category: string } }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>

      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="See More" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Category