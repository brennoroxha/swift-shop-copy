import { Link } from "react-router-dom";
import heroBannerDesktop from "@/assets/banner-escada-extensiva.png";
import heroBannerMobile from "@/assets/banner-escada-extensiva-mobile.png";

const HeroBanner = () => {
  return (
    <Link
      to="/produto/escada-extensivel-15x2-30-degraus-em-aluminio-7-66m-botafogo"
      className="block w-full overflow-hidden"
      aria-label="Ver produto: Escada Extensível 15x2 30 Degraus em Alumínio 7,66m Botafogo"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={heroBannerDesktop} />
        <img
          src={heroBannerMobile}
          alt="Escada Extensiva de Alumínio - Leve, Prática e Segura"
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </picture>
    </Link>
  );
};

export default HeroBanner;
