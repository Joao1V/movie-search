import {useState} from "react";

const BannerMovie = (props) => {
    const [loading, setLoading] = useState(true);

    const { image } = props

    return (
        <>
            {loading && <div>
                <div className={"skeleton"} style={{width: 150, height: 220}}></div>
            </div>}

            <img loading="lazy"
                 className={"rounded-2"}
                 style={{height:220,maxHeight:220, width:150, maxWidth:150, objectFit:"contain"}}
                 src={`https://image.tmdb.org/t/p/w185${image}`}
                 // src={`https://media.themoviedb.org/t/p/w94_and_h141_bestv2${image}`}
                 // srcset={`https://media.themoviedb.org/t/p/w94_and_h141_bestv2/${image} 1x, https://media.themoviedb.org/t/p/w188_and_h282_bestv2/${image} 2x`}
                 alt="banner"
                 onLoad={() => {
                     setLoading(false);
                 }}
                 onError={() => {
                     setLoading(false);
                 }}
            />
                
            {/*<img loading="lazy"*/}
            {/*     className={loading ? "d-none" : "poster w-full"}*/}
            {/*     src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${image}`}*/}
            {/*     srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${image} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${image} 2x`}*/}
            {/*     onLoad={() => {*/}
            {/*         console.log("cargado")*/}
            {/*         // setLoading(false)*/}
            {/*     }}*/}
            {/*     onError={() => {*/}
            {/*         console.log("pau")*/}
            {/*     }}*/}
            {/*     alt="banner"*/}
            {/*/>*/}
        </>

    )
}

export default BannerMovie