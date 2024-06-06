import { FaStar } from "react-icons/fa6";
import { useFetcher } from "react-router-dom";
import authProvider from "../utils/auth";
import { Review } from "../utils/definitions";
import { formatDate } from "../utils/format";

const Reviews = ({reviewsData}:{reviewsData: Review[]}) => {

    const fetcher = useFetcher()
   
    const renderStars = (score: number) => {
        const starArray = Array.from({ length: 5 });
        
        return starArray.map((_, index) => (
            <FaStar
            key={index}
            className={index < score ? "text-warning" : "text-gray-400"}
            size={20}
            />
        ));
        };

  return (
    <div className="flex flex-col justify-center mb-6"> 
        <h2 className="text-center text-3xl text-primary mb-4">Reviews</h2>
        <div className="carousel w-full lg:w-[85%] border rounded-lg shadow-lg mx-auto mb-8 max-h-60 align-middle">
            {reviewsData.map((slide, index) => (
            <div key={index} id={slide.id} className="carousel-item relative w-full flex-col items-center">
                <div className="rating pt-4">
                    {renderStars(slide.score)}
                   
                </div>
                <div className="w-full p-6 text-center">{slide.text}</div>
                <div className="text-sm opacity-50 pb-3">{slide?.user} on {formatDate(slide.created)}</div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#${reviewsData[index === 0 ? reviewsData.length - 1 : index - 1].id}`} className="btn btn-circle">❮</a>
                <a href={`#${reviewsData[index === reviewsData.length - 1 ? 0 : index + 1].id}`} className="btn btn-circle">❯</a>
                </div>
            </div>
            ))}
        </div>

       {authProvider.isAuthenticated ? (
       <>
        <div className="text-2xl text-center text-primary mb-6">Deja tu opinión</div>
        <div className="card w-96 mx-auto">
            <fetcher.Form method="post" className="text-center">
                <div className="rating mx-auto">
                    <input type="radio" name="score" defaultValue={1} className="mask mask-star-2 bg-warning" />
                    <input type="radio" name="score" defaultValue={2} className="mask mask-star-2 bg-warning" />
                    <input type="radio" name="score" defaultValue={3} className="mask mask-star-2 bg-warning" />
                    <input type="radio" name="score" defaultValue={4} className="mask mask-star-2 bg-warning" />
                    <input type="radio" name="score" defaultValue={5} defaultChecked className="mask mask-star-2 bg-warning" />
                </div>
                <label className="form-control mb-3">
                <textarea required name="text" className="textarea textarea-bordered h-24" placeholder="Review"></textarea>
                </label>
                <button className="btn btn-sm btn-primary">Confirmar</button>
            </fetcher.Form>
        </div>
       </>
    ):  <div className="text-2xl text-center text-primary">Inicia sesión para dar tu opinión</div> }

    </div>
  )
}

export default Reviews