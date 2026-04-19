import heroBannerDesktop from "@/assets/banner-escada-extensiva.png";
import heroBannerMobile from "@/assets/banner-escada-extensiva-mobile.png";

const HeroBanner = () => {
  return (
    <div className="w-full overflow-hidden">
      <picture>
        <source media="(min-width: 768px)" srcSet={heroBannerDesktop} />
        <img
          src={heroBannerMobile}
          alt="Escada Extensiva de Alumínio - Leve, Prática e Segura"
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </picture>
    </div>
  );
};

export default HeroBanner;
