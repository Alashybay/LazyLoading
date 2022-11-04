import { FC } from "react";
import { IPhoto } from "../types/types";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface PhotoItemProps{
    photo: IPhoto;
}

const PhotosItem: FC<PhotoItemProps> = ({photo}) =>{
    return(   
        <div className="card" data-aos="zoom-in-left">
            {photo.id}. {photo.title}. 
            <div>
                <LazyLoadImage src={photo.url} alt='' height="50px" effect="blur"></LazyLoadImage>
            </div>
        </div>
    )
}
    
export default PhotosItem;