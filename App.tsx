import { useState, useEffect } from "react";
import axios from "axios";
import PhotosItem from "./components/PhotosItem";
import { IPhoto } from "./types/types";
import List from "./components/List";
import './components/styling.css';

const App = () =>{
    const [photos, setPhotos] = useState<IPhoto[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [fetching, setFetching] = useState(true);

    const scrollHandler = (): void => {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100){
            console.log('More data was added!')
            setFetching(true)
        }
    }
 
    useEffect( () => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [])

    useEffect( () => {
        fetchPhoto()
        async function fetchPhoto() {
            if(fetching) {
                await axios.get<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
                .then(response =>{
                    setPhotos([...photos, ...response.data]);
                    setCurrentPage(prevState => prevState + 1);
                })
                .finally( () => setFetching(false));
            }
        }
    })
    return(
        <List
            items={photos}
            renderItem={(photo: IPhoto) => <PhotosItem photo={photo} key={photo.id}/>}
        / >
    );
};

export default App;



