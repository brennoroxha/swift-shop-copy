import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src={heroBanner}
        alt="La Roche-Posay - Cuidados dermatológicos"
        className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover object-top"
      />
    </div>
  );
};

export default HeroBanner;
