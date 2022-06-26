import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { axios } from "../utils/axios";
import styles from "../styles/Index.module.css";
import { PlaceDto } from "../utils/types/place.dto";
import { useDebounce } from "../utils/useDebounce";

const Home: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<PlaceDto[]>([]);
  const debounced = useDebounce(search);

  useEffect(() => {
    axios.get(`/?search=${debounced}`).then(({ data }) => setPlaces(data));
  }, [debounced]);

  return (
    <>
      <Head>
        <title>LocalSearch - Places</title>
      </Head>
      <div className="grid">
        <input
          className={styles.input}
          type="text"
          placeholder="Search business entries"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="grid">
        {places.map((place) => (
          <a
            key={place.id}
            href={`/${place.id}`}
            onClick={(e) => {
              e.preventDefault();
              router.push(`/${place.id}`);
            }}
            className={styles.card}
          >
            <h2>{place.name}</h2>
            <p>{place.address}</p>
          </a>
        ))}
      </div>
    </>
  );
};

export default Home;
