import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import homeSlider from "../../assets/imgs/home-slider-1.png";
import {Pagination,Navigation} from "swiper/modules"
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HomeSlider() {
  return (
    <>
      <Swiper modules={[Pagination,Navigation]} slidesPerView={1} loop={true}
       navigation
       pagination={{clickable:true}}
       >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${homeSlider})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white py-15 bg-gradient-to-r from-green-600/95 to-green-600/40">
              <div className="container space-y-2">
                <h2 className="text-2xl font-bold">
                  Fresh Products delieverd <br />
                  to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="mt-4 flex gap-4">
                  <button className="bg-white text-green-700 font-semibold py-1 px-4 rounded hover:bg-green-100 transition duration-300">
                    Shop Now
                  </button>
                  <button className="bg-transparent border border-white text-white font-semibold py-1 px-4 rounded hover:bg-white hover:text-green-700 transition duration-300">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
         <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${homeSlider})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white py-15 bg-gradient-to-r from-green-600/95 to-green-600/40">
              <div className="container space-y-2">
                <h2 className="text-2xl font-bold">
                  Fresh Products delieverd <br />
                  to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="mt-4 flex gap-4">
                  <button className="bg-white text-green-700 font-semibold py-1 px-4 rounded hover:bg-green-100 transition duration-300">
                    Shop Now
                  </button>
                  <button className="bg-transparent border border-white text-white font-semibold py-1 px-4 rounded hover:bg-white hover:text-green-700 transition duration-300">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide> <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${homeSlider})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="overlay text-white py-15 bg-gradient-to-r from-green-600/95 to-green-600/40">
              <div className="container space-y-2">
                <h2 className="text-2xl font-bold">
                  Fresh Products delieverd <br />
                  to your Door
                </h2>
                <p>Get 20% off for your first order</p>
                <div className="mt-4 flex gap-4">
                  <button className="bg-white text-green-700 font-semibold py-1 px-4 rounded hover:bg-green-100 transition duration-300">
                    Shop Now
                  </button>
                  <button className="bg-transparent border border-white text-white font-semibold py-1 px-4 rounded hover:bg-white hover:text-green-700 transition duration-300">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
