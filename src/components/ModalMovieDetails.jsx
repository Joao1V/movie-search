import {Modal} from "react-bootstrap";
import BannerMovie from "./BannerMovie.jsx";

const ModalMovieDetails = (props) => {
    const { show, onHide, data } = props;

    return (
        <Modal show={show} onHide={onHide} centered size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Filmes relacionados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {data?.map((item, index) => (
                    <div className={"d-flex gap-3 mb-3 pb-3 border-bottom"} key={index}>
                        <BannerMovie image={item.image} />

                        {/*<img loading="lazy" className="poster w-full"*/}
                        {/*     src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item?.image}`}*/}
                        {/*     srcSet={`https://media.themoviedb.org/t/p/w220_and_h330_face/${item?.image} 1x, https://media.themoviedb.org/t/p/w440_and_h660_face/${item?.image} 2x`}*/}
                        {/*     onLoad={() => console.log("cargo")}*/}
                        {/*     alt="banner"*/}
                        {/*/>*/}
                        {/*<img className={"img-thumbnail object-fit-contain"}*/}
                        {/*     style={{width: "100px"}}*/}
                        {/*     src={item.image*/}
                        {/*         ? `http://image.tmdb.org/t/p/w185${item?.image}`*/}
                        {/*         : 'https://dummyimage.com/600x400/f5f5f5/fff&text=movie'*/}
                        {/*     }*/}
                        {/*     alt={"banner"}*/}
                        {/*/>*/}
                        <div>
                            <h3>{item.title}</h3>
                            <p>
                                Lançamento: {item.release_date}
                            </p>
                            <p>
                                {item.description}
                            </p>
                            <div>
                                <p className={"mb-1"}>Gênero:</p>
                                {item.genre.length === 0 ? "-" :
                                    <div className={"d-flex gap-2 mb-0"}>
                                        {item.genre.map(category => (
                                            <h5 className={"bg-light border rounded-2 bg-dark-subtle p-2"}>
                                                <strong>
                                                    {category.name}
                                                </strong>
                                            </h5>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    )
}

export default ModalMovieDetails