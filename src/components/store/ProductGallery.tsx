import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  mainImage: string;
  extraImages: string[];
  productName: string;
}

const ProductGallery = ({ mainImage, extraImages, productName }: ProductGalleryProps) => {
  const allImages = [mainImage, ...extraImages];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goTo = (index: number) => {
    setSelectedIndex((index + allImages.length) % allImages.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[500px] pb-1 md:pb-0 md:pr-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-16 h-16 md:w-[72px] md:h-[72px] rounded-md overflow-hidden border-2 transition-all ${
                i === selectedIndex
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
            >
              <img
                src={img}
                alt={`${productName} - ${i + 1}`}
                className="w-full h-full object-contain bg-secondary/30"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 rounded-lg p-4 md:p-8 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
        <img
          src={allImages[selectedIndex]}
          alt={productName}
          className="w-full max-w-md aspect-square object-contain"
        />

        {allImages.length > 1 && (
          <>
            <button
              onClick={() => goTo(selectedIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(selectedIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
