"use client"
import { getCharacter, getCharacterByGender, getCharacterByMultiFilter, getCharacterByPageNumber, getCharacterByStatus } from "@/component/actions/Actions";
import { useEffect, useState } from "react";
import './page.css';
import DropdownComponent from "@/component/dropdown/DropdownComponent";
import Image from "next/image";

interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  image: string;
  [key: string]: any; // Diğer tüm key-value'lar için serbest alan
}

interface Info {
  pages: number;
  count: number;
}

interface CharacterData {
  info: Info;
  results: Character[];
}


export default function Home() {
  const [characterData, setCharacterData] = useState<CharacterData | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('Yok');
  const [filterGender, setFilterGender] = useState<string>('Yok');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCharacter();
        setCharacterData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePageClick = async (page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
    try {
      const data = await getCharacterByPageNumber(page);
      setCharacterData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching page data:', error);
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      console.log("tıklandı2");

      console.log("filterStatus type:", filterStatus);
      console.log("filterGender type:", filterGender);

      let data;
      if (filterStatus === 'Yok' && filterGender === 'Yok') {
        console.log("Filtre yok, işlem yapılmadı");
      } else if (filterStatus === 'Yok' && (filterGender === 'Kadın' || filterGender === 'Erkek')) {
        console.log("Filtre: Gender aktif");
        data = await getCharacterByGender(filterGender);
      } else if ((filterStatus === 'Sağ' || filterStatus === 'Ölü') && filterGender === 'Yok') {
        console.log("Filtre: Status aktif");
        data = await getCharacterByStatus(filterStatus);
      } else if ((filterStatus === 'Sağ' || filterStatus === 'Ölü') && (filterGender === 'Kadın' || filterGender === 'Erkek')) {
        console.log("Filtre: Hem Gender Hem Status aktif");
        data = await getCharacterByMultiFilter(filterGender, filterStatus);
      } else {
        console.log("Hiçbir koşula girmedi");
      }

      if (data) {
        setCharacterData(data);
      }
    } catch (error) {
      console.error('Hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa butonları için gruplama ve '...' ekleme
  const renderPageButtons = () => {
    const totalPages = characterData?.info?.pages ?? 0; // Eğer undefined ise 0 olarak kabul edilir.
    const buttons = [];

    // Butonları göstermek için başlat ve bitiş sayfasını hesapla
    const start = Math.max(1, currentPage - 2); // Başlangıç sayfası
    const end = Math.min(totalPages, currentPage + 2); // Bitiş sayfası

    // Eğer mevcut sayfa başta veya sonunda ise, aradaki boşlukları kısaltmak için "..."
    if (start > 1) {
      buttons.push(1);
      if (start > 2) buttons.push("...");
    }
    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) buttons.push("...");
      buttons.push(totalPages);
    }

    // Sayfa butonları
    return buttons.map((page, index) => (
      <button
        key={index}
        onClick={() => handlePageClick(typeof page === "number" ? page : currentPage)}
        style={{
          margin: '5px',
          padding: '10px 15px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: currentPage === page ? '#0070f3' : '#eaeaea',
          color: currentPage === page ? 'white' : 'black',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
      >
        {page}
      </button>
    ));
  };

  return (
    <div>
      {isLoading ? (
        <p>Yükleniyor...</p>
      ) : characterData?.info?.pages ? (
        <>
          <h6
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80px',
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '25px',
              boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
            }}
          >
            Rick and Morty Karakter Sayfası
          </h6>

          <div style={{ display: 'flex', columnGap: '15px', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <DropdownComponent
                label="Durum'a göre filtrele"
                filterName={filterStatus}
                setFilterName={setFilterStatus}
                options={["Yok", "Sağ", "Ölü"]}
              />
            </div>
            <div>
              <DropdownComponent
                label="Cinsiyet'e göre filtrele"
                filterName={filterGender}
                setFilterName={setFilterGender}
                options={["Yok", "Kadın", "Erkek"]}
              />
            </div>
            <button onClick={handleSearch} className="searchButton">
              Filtreyi Uygula
            </button>
          </div>

          <div className="mainPageListItem">
            {characterData.results?.map((character: Character, index: number) => (
              <div key={index} className="characterContainer">
                <h2>İsim {character.name}</h2>
                <p>Cinsiyet {character.gender}</p>
                <p>Durum: {character.status}</p>
                <p>Id: {character.id}</p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Sayfalama Butonları */}
          <div style={{
            margin: '20px 0px',
            display: 'flex',
            width: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {renderPageButtons()}
          </div>
        </>
      ) : (
        <p>Veri alınamadı.</p>
      )}
    </div>
  );
}
