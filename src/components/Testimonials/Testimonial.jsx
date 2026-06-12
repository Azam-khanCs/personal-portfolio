import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import profilePic1 from "../../img/profile1.jpg";
import profilePic2 from "../../img/profile2.jpg";
import profilePic3 from "../../img/profile3.jpg";
import profilePic4 from "../../img/profile4.jpg";
import { glassCard, eyebrow, sectionHeading, sectionShell, sectionTitle } from "../../styles";

const testimonials = [
  { img: profilePic1, name: "Product Manager", role: "Business Platform Team", review: "Azam communicates clearly, understands product goals quickly, and turns frontend requirements into clean, responsive interfaces." },
  { img: profilePic2, name: "Backend Lead", role: "API Integration Project", review: "He is comfortable connecting frontend flows with backend APIs, debugging issues, and keeping implementation practical." },
  { img: profilePic3, name: "Recruiter", role: "Hiring Community", review: "The community support is consistent and valuable for connecting developers with real hiring updates and recruiter posts." },
  { img: profilePic4, name: "Client", role: "Web Application Delivery", review: "Reliable delivery, responsive design, and strong ownership from development through deployment support." },
];

const Testimonial = () => {
  return (
    <section className={sectionShell} id="testimonial" aria-labelledby="testimonial-title">
      <div className={sectionHeading}>
        <span className={eyebrow}>Testimonials</span>
        <h2 className={sectionTitle} id="testimonial-title">Feedback from people I build and collaborate with.</h2>
      </div>
      <Swiper modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }}>
        {testimonials.map((client) => (
          <SwiperSlide key={client.name}>
            <article className={`${glassCard} mx-auto grid max-w-3xl justify-items-center gap-4 p-7 text-center`}>
              <img className="h-20 w-20 rounded-full object-cover ring-4 ring-orange-400/20" src={client.img} alt={`${client.name} avatar`} />
              <p className="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{client.review}</p>
              <div>
                <strong className="block text-lg text-[var(--heading)]">{client.name}</strong>
                <span className="text-sm font-bold text-[var(--accent)]">{client.role}</span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
