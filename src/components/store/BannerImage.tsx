interface BannerImageProps {
  src: string;
  alt: string;
}

const BannerImage = ({ src, alt }: BannerImageProps) => {
  return (
    <div className="w-full">
      <img
        src={src}
        alt={alt}
        className="w-full h-[200px] md:h-[350px] object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default BannerImage;
