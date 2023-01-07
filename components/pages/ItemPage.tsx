import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../../styles/ItemPage/index.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { Api } from "../../services/api";

type gift = {
  id: string;
  image: string;
  name: string;
  price: number;
};

type guest = {
  name: string;
  id: string;
  attendance: boolean;
};

type getGuestResponse = {
  name: string;
  id: string;
  attendance: boolean;
  gifts: gift[];
};

import React from "react";

function ItemPageComponent() {
  const { query } = useRouter();
  const [guest, setGuest] = useState<guest>({} as guest);
  const [gifts, setGifts] = useState<gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  const containerRef = useRef(null);

  const handleImageClick = (id: string) => {
    const selectedImage = document.querySelector(`[data-id="${id}"]`);

    console.log(selectedImage);
    if (!selectedImage) return;

    selectedImage.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setSelectedImage(id);
  };

  const getGuestAndGift = useCallback(async () => {
    const store_id = localStorage.getItem("id");
    let guest;
    if (store_id) {
      const { data } = await Api.get<getGuestResponse>(`/guest/${query._id}`);
      if (data) {
        guest = data;
      }
    }
    if (!guest) {
      const { data } = await Api.get<getGuestResponse>(`/guest/${query._id}`);
      guest = data;
    }
    if (!guest) return;
    setGuest({
      name: guest.name,
      id: guest.id,
      attendance: guest.attendance,
    });
    setGifts(guest?.gifts);
    setSelectedImage(guest.gifts[0].id);
    localStorage.setItem("id", guest.id);
  }, [query._id]);

  async function confirmAttendance() {
    const { data } = await Api.put(`/guest/confirme/${query._id}`, {
      attendance: true,
    });

    if (data) {
      setGuest(data);
    }
  }

  useEffect(() => {
    getGuestAndGift();
  }, [getGuestAndGift]);

  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <main className={styles.main_container}>
      <div className={styles.top_plant_icon}>
        <Image
          loader={myLoader}
          src="/svgs/plant_v2.svg"
          alt="background"
          width={225}
          height={225}
        />
      </div>
      <section className={styles.main_section}>
        <header className={styles.header_container}>
          <h1>
            Ola, <strong>{guest?.name}</strong>
          </h1>
        </header>
        <div className={styles.gifts_container} ref={containerRef}>
          {gifts.map((gift) => {
            return (
              <div
                className={`${styles.img_card} ${
                  selectedImage === gift.id ? styles.selected_image : ""
                }`}
                key={gift.id}
                data-id={gift.id}
                onClick={() => handleImageClick(gift.id)}
              >
                <div className={styles.image_section}>
                  <Image
                    loader={myLoader}
                    src={gift.image}
                    alt="background"
                    width={250}
                    height={250}
                  />
                </div>
                <p>{gift.name}</p>
              </div>
            );
          })}
        </div>
        <span className={styles.hearts_division}>
          <i></i>
          <div className={styles.hearts}>
            <Image alt="" src={"/svgs/heart.svg"} width={24} height={24} />
            <Image alt="" src={"/svgs/heart.svg"} width={32} height={32} />
            <Image alt="" src={"/svgs/heart.svg"} width={24} height={24} />
          </div>
          <i></i>
        </span>
        <div
          className={`${styles.button_container} ${
            guest.attendance ? styles.hasConfirmed : ""
          }`}
        >
          <button onClick={confirmAttendance} disabled={guest.attendance}>
            {guest.attendance ? "presença confirmada " : "confirmar presença"}
          </button>
        </div>
      </section>
      <footer></footer>
    </main>
  );
}

export { ItemPageComponent };
