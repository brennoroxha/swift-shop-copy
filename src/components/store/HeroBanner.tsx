import heroBanner from "@/assets/banner-escada-extensiva.png";

const HeroBanner = () => {
  return (
    <div className="w-full overflow-hidden">
      <img
        src={heroBanner}
        alt="Escada Extensiva de Alumínio - Leve, Prática e Segura"
        className="w-full h-auto object-cover"
        loading="eager"
      />
    </div>
  );
};

export default HeroBanner;
