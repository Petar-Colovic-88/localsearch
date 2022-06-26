import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Detail.module.css";
import { axios } from "../utils/axios";
import { PlaceDto } from "../utils/types/place.dto";

const Home: NextPage = () => {
  const router = useRouter();
  const [place, setPlace] = useState<PlaceDto>();

  useEffect(() => {
    router.query.id &&
      axios.get(`/${router.query.id}`).then(({ data }) => setPlace(data));
  }, [router.query.id]);

  if (!place) {
    return <h1 className={styles.title}>Loading...</h1>;
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="grid">
        <h1 className={styles.title}>{place.name}</h1>
      </div>

      <div className="grid">
        <div>
          <div className={styles.group}>
            <h3>Address</h3>
            <p className={styles.indent}>
              <i>{place.address}</i>
            </p>
          </div>

          {place.website && (
            <div className={styles.group}>
              <h3>Website</h3>
              <p className={styles.indent}>
                <i>{place.website}</i>
              </p>
            </div>
          )}

          {place.phoneNumber && (
            <div className={styles.group}>
              <h3>Phone</h3>
              <p className={styles.indent}>
                <i>{place.phoneNumber}</i>
              </p>
            </div>
          )}
        </div>

        <div>
          <h3>Opening hours</h3>
          {place.openingHours &&
            Object.entries(place.openingHours).map(([day, hours]) => (
              <div key={day} className="grid">
                <p className={styles.indent}>
                  <i className={styles.capitalize}>{day}</i>
                </p>
                {hours && (
                  <ul className={styles.list}>
                    {hours.split(",").map((hour) => (
                      <li key={hour}>
                        <i>{hour}</i>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
