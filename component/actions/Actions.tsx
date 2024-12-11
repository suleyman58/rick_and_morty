export const getCharacter = async () => {
    const url = `https://rickandmortyapi.com/api/character`;

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    try {
        const response = await fetch(url, options);

        // Yanıt başarısızsa hata fırlat
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Veriyi döndür
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Hata fırlatmaya devam et
    }
};
export const getCharacterByPageNumber = async (pageNumber: number) => {
    const url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    try {
        const response = await fetch(url, options);

        // Yanıt başarısızsa hata fırlat
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Veriyi döndür
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Hata fırlatmaya devam et
    }
};

export const getCharacterByStatus = async (value: string) => {
    const status = value === 'Sağ' ? 'Alive' : 'Dead'
    console.log("status", status)
    const url = `https://rickandmortyapi.com/api/character/?status=${status}`;

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    try {
        const response = await fetch(url, options);

        // Yanıt başarısızsa hata fırlat
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Veriyi döndür
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Hata fırlatmaya devam et
    }
};
export const getCharacterByGender = async (value: string) => {
    const gender = value === 'Kadın' ? 'Female' : 'Male'
    const url = `https://rickandmortyapi.com/api/character/?gender=${gender}`;

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    try {
        const response = await fetch(url, options);

        // Yanıt başarısızsa hata fırlat
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Veriyi döndür
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Hata fırlatmaya devam et
    }
};

export const getCharacterByMultiFilter = async (genderValue: string, statusValue: string) => {
    const gender = genderValue === 'Kadın' ? 'Female' : 'Male';
    const status = statusValue === 'Sağ' ? 'Alive' : 'Dead';

    const url = `https://rickandmortyapi.com/api/character/?gender=${gender}&status=${status}`;

    const options: RequestInit = {
        method: 'GET',
        mode: 'cors',
    };

    try {
        const response = await fetch(url, options);

        // Yanıt başarısızsa hata fırlat
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Veriyi döndür
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Hata fırlatmaya devam et
    }
};



